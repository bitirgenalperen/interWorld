import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import LoadingSpinner from './components/LoadingSpinner';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    // Retrieve authentication state from localStorage
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/check-auth', { credentials: 'include' });
        const authStatus = response.ok;

        setIsAuthenticated(authStatus);
        localStorage.setItem('isAuthenticated', authStatus); // Store auth status in localStorage
      } catch (error) {
        console.error('Failed to check authentication status', error);
      } finally {
        setLoading(false); // Stop loading when done
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/api/logout', { method: 'POST', credentials: 'include' });
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false'); // Clear auth status on logout
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  if (loading) {
    // Show a loading indicator while checking authentication
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
