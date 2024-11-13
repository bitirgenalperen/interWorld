import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    comPref: 'Email',
    mobilePhone: '',
    languages: [] // Initialize languages as an array
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'languages') {
      const selectedLanguages = [...formData.languages];
      if (selectedLanguages.includes(value)) {
        // If the language is already selected, remove it
        const index = selectedLanguages.indexOf(value);
        selectedLanguages.splice(index, 1);
      } else {
        // Otherwise, add it to the selected languages
        selectedLanguages.push(value);
      }
      setFormData({ ...formData, languages: selectedLanguages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if at least one language is selected
    if (formData.languages.length === 0) {
      setError('Please select at least one language');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/register', formData, { withCredentials: true });

      if (response.status === 201) {
        // Automatically log in the user after successful registration
        const loginResponse = await axios.post('http://localhost:5001/api/login', {
          email: formData.email,
          password: formData.password
        }, { withCredentials: true });

        if (loginResponse.status === 200) {
          // Redirect to the projects page
          navigate('/projects');
        }
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          className="form-control"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="form-control mt-2"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mt-2"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="comPref"
          className="form-select mt-2"
          value={formData.comPref}
          onChange={handleChange}
        >
          <option value="Email">Email</option>
          <option value="Mobile">Mobile</option>
        </select>
        {formData.comPref === 'Mobile' && (
          <input
            type="text"
            name="mobilePhone"
            className="form-control mt-2"
            placeholder="Mobile Phone Number"
            value={formData.mobilePhone}
            onChange={handleChange}
          />
        )}
        
        {/* Language Selection */}
        <div className="mt-2">
          <label>Select Languages:</label>
          <div>
            {['en', 'tr', 'ms', 'zh', 'hi', 'ur', 'fr', 'ru'].map((lang) => (
              <div key={lang}>
                <input
                  type="checkbox"
                  id={lang}
                  name="languages"
                  value={lang}
                  checked={formData.languages.includes(lang)}
                  onChange={handleChange}
                />
                <label htmlFor={lang}>{lang}</label>
              </div>
            ))}
          </div>
        </div>

        {error && <div className="text-danger mt-2">{error}</div>}
        <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
      </form>
    </div>
  );
};

export default RegisterPage;
