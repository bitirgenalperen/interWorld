function checkRole(roles) {
    return (req, res, next) => {
      if (!req.isAuthenticated()) {
        return res.status(401).send('You are not authenticated');
      }
  
      const userRole = req.user.role;
      
      // Check if the user's role is in the allowed roles array
      if (!roles.includes(userRole)) {
        return res.status(403).send('You do not have permission to access this resource');
      }
  
      next(); // Proceed to the next middleware or route handler
    };
  }
  
  export { checkRole };
  