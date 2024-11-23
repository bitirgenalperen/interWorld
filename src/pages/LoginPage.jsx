import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import the context
import './LoginPage.css';

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext); // Get the login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email,
        password
      }, { withCredentials: true });

      if (response.status === 200) {
        // Update the global auth state
        handleLogin();
        // Redirect to the bookings page after login
        navigate('/bookings');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        {/* Logo */}
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/InterWorld_large_nobg.png`} alt="Logo" />
        </div>

        {/* Log In Form */}
        <h2 className="text-center">Log In</h2>
        <input
          type="email"
          className="form-control mt-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mt-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-danger mt-2">{error}</div>}

        {/* Buttons */}
        <button className="btn btn-primary mt-4" onClick={handleLoginSubmit}>
          Log In
        </button>
        <button className="btn btn-link mt-2">Forgot Password?</button>

        {/* Register Section */}
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-primary">
            Register Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
