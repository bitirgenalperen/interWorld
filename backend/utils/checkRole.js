const checkRole = (allowedRoles) => (req, res, next) => {
    const user = req.user; // Assumes user info is attached to req (e.g., via JWT)
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
  
  module.exports = { checkRole };
  