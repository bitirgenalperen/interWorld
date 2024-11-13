import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import the context

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
    <div className="container">
      <h2>Log In</h2>
      <input
        type="email"
        className="form-control"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="form-control mt-2"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <div className="text-danger mt-2">{error}</div>}
      <button className="btn btn-primary mt-3" onClick={handleLoginSubmit}>Log In</button>
    </div>
  );
};

export default LoginPage;
