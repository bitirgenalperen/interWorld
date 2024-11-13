import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import LoadingSpinner from '../components/LoadingSpinner';

const BookingsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [numSlots, setNumSlots] = useState(2); // Default to 2 slots
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects for booking
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/projects', { withCredentials: true });
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects', error);
      }
    };
    fetchProjects();
  }, []);

  // Fetch bookings for the user (based on role)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/bookings', { withCredentials: true });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Handle new booking creation
  const handleBooking = async () => {
    try {
      const userId = 1; // Replace with actual user ID from session or authentication
      await axios.post(
        'http://localhost:5001/api/bookings',
        {
          userId,
          projectId: selectedProject,
          timeSlot: { startTime: timeSlot, numSlots }
        },
        { withCredentials: true }
      );
      alert('Booking successful');
    } catch (error) {
      console.error('Booking failed', error);
      alert('Booking failed. Please try again.');
    }
  };

  // Determine the border color based on the booking status
  const getBorderClass = (startTime, numSlots) => {
    const currentTime = moment();
    const bookingStart = moment(startTime, 'YYYY-MM-DD-HH:mm');
    const bookingEnd = moment(startTime, 'YYYY-MM-DD-HH:mm').add(numSlots * 15, 'minutes');

    if (currentTime.isBetween(bookingStart, bookingEnd)) {
      return 'border border-warning'; // Orange border for ongoing bookings
    } else if (currentTime.isAfter(bookingEnd)) {
      return 'border border-danger'; // Red border for completed bookings
    } else if (currentTime.isBefore(bookingStart)) {
      return 'border border-primary'; // Blue border for upcoming bookings
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading bookings..."/>;
  }

  return (
    <div className="container mt-4">
      <h2>Book an Appointment</h2>
      <select
        className="form-select"
        value={selectedProject}
        onChange={e => setSelectedProject(e.target.value)}
      >
        <option value="">Select a project</option>
        {projects.map(project => (
          <option key={project._id} value={project._id}>
            {project.city} - {project.estType}
          </option>
        ))}
      </select>
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Preferred Start Time (YYYY-MM-DD-HH:mm)"
        value={timeSlot}
        onChange={e => setTimeSlot(e.target.value)}
      />
      <input
        type="number"
        className="form-control mt-2"
        placeholder="Number of 15-min slots"
        value={numSlots}
        onChange={e => setNumSlots(e.target.value)}
      />
      <button
        className="btn btn-primary mt-3"
        onClick={handleBooking}
        disabled={!selectedProject || !timeSlot || !numSlots}
      >
        Book
      </button>

      <h2 className="mt-5">Bookings</h2>
      <div className="row">
        {bookings.map(booking => {
          const { _id, timeSlot, projectId, agentId, userId } = booking;
          const borderClass = getBorderClass(timeSlot.startTime, timeSlot.numSlots);
          const bookingStartTime = moment(timeSlot.startTime, 'YYYY-MM-DD-HH:mm').format('MMMM Do YYYY, h:mm A');
          const bookingEndTime = moment(timeSlot.startTime, 'YYYY-MM-DD-HH:mm')
            .add(timeSlot.numSlots * 15, 'minutes')
            .format('h:mm A');

          return (
            <div key={_id} className={`col-md-4 mb-3`}>
              <div className={`card ${borderClass}`}>
                <div className="card-body">
                  <h5 className="card-title">
                    Project: {projectId.city} - {projectId.estType}
                  </h5>
                  <p className="card-text">
                    <strong>Start Time:</strong> {bookingStartTime} <br />
                    <strong>End Time:</strong> {bookingEndTime} <br />
                    <strong>Number of 15-min slots:</strong> {timeSlot.numSlots}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingsPage;
