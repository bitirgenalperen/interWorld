const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { checkRole } = require('./utils/checkRole.js');
const User = require('./models/User');
const Project = require('./models/Project');
const Booking = require('./models/Booking');

const dotenv = require('dotenv');
dotenv.config();

// Initialize the app
const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // React server origin
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week session expiration
  }}));

app.use(passport.initialize());
app.use(passport.session());

// MongoDB Connection
mongoose.connect(process.env.URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Passport.js configuration
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Use email as the username field
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email.' });
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
      
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// API Routes
// Check if user is authenticated route
app.get('/api/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Register a new user
app.post('/api/register', async (req, res, next) => {
  const { fullName, email, password, comPref, mobilePhone, languages } = req.body; // Added languages
  console.log(req.body);

  if (!fullName || !email || !password) {
    return res.status(400).send('All required fields must be filled');
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      comPref,
      mobilePhone,
      languages,
      role: 'Client'
    });

    await newUser.save();

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(201).send('User registered and logged in');
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send('Server error');
  }
});

// Login user
app.post('/api/login', passport.authenticate('local', {
  successMessage: 'Logged in successfully',
  failureMessage: 'Invalid credentials'
}), (req, res) => {
  res.status(200).send('Logged in');
});

// Logout user
app.post('/api/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout failed');
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.status(200).send('Logged out');
    });
  });
});

// Get projects with filtering
app.get('/api/projects', async (req, res) => {
  const { city, district, minPrice, maxPrice } = req.query;

  try {
    const filter = {};

    if (city) {
      filter.city = city;
    }

    if (district) {
      filter.district = district;
    }

    if (minPrice) {
      filter.price = { ...filter.price, $gte: Number(minPrice) };
    }

    if (maxPrice) {
      filter.price = { ...filter.price, $lte: Number(maxPrice) };
    }

    const projects = await Project.find(filter);
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).send('Server error');
  }
});

// Get project details by ID
app.get('/api/projects/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.json(project);
  } catch (err) {
    console.error('Error fetching project details:', err);
    res.status(500).send('Server error');
  }
});

// Only Managers can manage projects
app.post('/api/projects', checkRole(['Manager']), async (req, res) => {
  const { city, district, estType, size, description } = req.body; // Changed zone to district
  const newProject = new Project({ city, district, estType, size, description });
  
  try {
    await newProject.save();
    res.status(201).send('Project created');
  } catch (err) {
    res.status(500).send('Error creating project');
  }
});

// Delete a project (only accessible to 'Manager' role)
app.delete('/api/projects/:id', checkRole(['Manager']), async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send('Project not found');
    }

    // Delete the project
    await project.remove();

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/bookings', checkRole(['Client', 'Agent', 'Manager']), async (req, res) => {
  try {
    const user = req.user; // Ensure the user object is available
    let bookings;

    // Debugging: log the user object to ensure it's correct
    console.log('User:', user);

    // Fetch bookings based on the role of the user
    if (user.role === 'Client') {
      // Fetch bookings where the user is the client
      bookings = await Booking.find({ userId: user._id })
        .populate({
          path: 'projectId',
          select: 'city estType', // Specify fields to select from the project
        })
        .populate({
          path: 'agentId',
          select: 'fullName', // Select the fullName field from the agent
        });
    } else if (user.role === 'Agent') {
      // Fetch bookings where the user is the agent
      bookings = await Booking.find({ agentId: user._id })
        .populate({
          path: 'projectId',
          select: 'city estType', // Specify fields to select from the project
        })
        .populate({
          path: 'userId',
          select: 'fullName', // Select the fullName field from the client
        });
    } else if (user.role === 'Manager') {
      // Fetch all bookings for managers
      bookings = await Booking.find()
        .populate({
          path: 'projectId',
          select: 'city estType', // Specify fields to select from the project
        })
        .populate({
          path: 'userId',
          select: 'fullName', // Select the fullName field from the client
        })
        .populate({
          path: 'agentId',
          select: 'fullName', // Select the fullName field from the agent
        });
    }

    // Debugging: log the bookings retrieved from the database
    console.log('Bookings before sorting:', bookings);

    // Return the bookings sorted by timeSlot.startTime in ascending order
    bookings = bookings.sort((a, b) => new Date(a.timeSlot.startTime) - new Date(b.timeSlot.startTime));

    // Debugging: log the bookings after sorting
    console.log('Bookings after sorting:', bookings);
    
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Server error');
  }
});


// Book a time slot
// Clients can book a time slot, but only if they are authenticated
// Agents can create the booking with a requested Client
app.post('/api/bookings', checkRole(['Client', 'Agent']), async (req, res) => {
  const { userId, projectId, timeSlot } = req.body;

  // Validate required fields
  if (!userId || !projectId || !timeSlot || !timeSlot.startTime || !timeSlot.numSlots) {
    return res.status(400).send('Missing required fields');
  }

  try {
    // Convert userId and projectId to ObjectId if they are not already
    const userObjectId = new ObjectId(userId);
    const projectObjectId = new ObjectId(projectId);

    // Find an available agent (assuming the agent is assigned automatically)
    const availableAgent = await User.findOne({ role: 'Agent' });

    if (!availableAgent) {
      return res.status(400).send('No agents available');
    }

    // Ensure the time slot is in the correct format (you could add additional validation here if needed)
    const { startTime, numSlots } = timeSlot;
    if (!/^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/.test(startTime)) {
      return res.status(400).send('Invalid time format. Use YYYY-MM-DD-HH:mm.');
    }

    // Create a new booking object
    const newBooking = new Booking({
      userId: userObjectId,
      agentId: availableAgent._id, // Already in ObjectId format
      projectId: projectObjectId,
      timeSlot: {
        startTime,
        numSlots: numSlots || 2, // Default to 2 slots (30 minutes) if not provided
      }
    });

    // Save the booking to the database
    await newBooking.save();

    // Respond with success and the booking details
    res.status(201).json({ message: 'Booking successful', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Server error');
  }
});


// Get user details
app.get('/api/user', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (err) {
      console.error('Error retrieving user details:', err);
      res.status(500).send('Server error');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Update user details
app.put('/api/user', async (req, res) => {
  if (req.isAuthenticated()) {
    const { fullName, email, comPref, mobilePhone } = req.body;
    try {
      await User.findByIdAndUpdate(req.user.id, {
        fullName,
        email,
        comPref,
        mobilePhone
      });
      res.status(200).send('User details updated');
    } catch (err) {
      console.error('Error updating user details:', err);
      res.status(500).send('Failed to update user details');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
