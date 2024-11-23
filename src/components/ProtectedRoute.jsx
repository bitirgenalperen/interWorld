import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated === false) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/" />;
  }

  // Otherwise, render the child components (protected page)
  return children;
};

export default ProtectedRoute;
