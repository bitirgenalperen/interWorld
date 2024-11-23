const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // User is authenticated
    return next();
  }
  // User is not authenticated
  return res.status(401).json({ message: 'Unauthorized: Please log in' });
};

module.exports = { isAuthenticated };