import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user details on component mount
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/user', { withCredentials: true });
        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch user details');
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    console.log(formData);  // Check if comPref is present and correct here
    try {
      await axios.put('http://localhost:5001/api/user', formData, { withCredentials: true });
      setUser(formData);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Failed to update user details');
    }
  };

  return (
    <div className="container">
      <h2>User Details</h2>
      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control"
          value={formData.fullName || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={formData.email || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="comPref">Communication Preference</label>
        <select
          id="comPref"
          name="comPref"
          className="form-control"
          value={formData.comPref || ''}
          onChange={handleChange}
        >
          <option value="Email">Email</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>
      {formData.comPref === 'Mobile' && (
        <div className="form-group">
          <label htmlFor="mobilePhone">Mobile Phone</label>
          <input
            type="text"
            id="mobilePhone"
            name="mobilePhone"
            className="form-control"
            value={formData.mobilePhone || ''}
            onChange={handleChange}
          />
        </div>
      )}
      {error && <div className="text-danger">{error}</div>}
      <button className="btn btn-primary mt-3" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default ProfilePage;
