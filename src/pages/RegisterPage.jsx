import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css';

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
    <div className="signup-container">
      <div className="signup-form">
        {/* Logo */}
        <div className="logo">
          <img src={`${process.env.PUBLIC_URL}/InterWorld_large_nobg.png`} alt="Logo" />
        </div>

        {/* Sign Up Form */}
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            className="form-control mt-3"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="form-control mt-3"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="form-control mt-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="comPref"
            className="form-select mt-3"
            value={formData.comPref}
            onChange={handleChange}
          >
            <option value="Email">Email</option>
            <option value="Mobile">Mobile</option>
          </select>
          {formData.comPref === "Mobile" && (
            <input
              type="text"
              name="mobilePhone"
              className="form-control mt-3"
              placeholder="Mobile Phone Number"
              value={formData.mobilePhone}
              onChange={handleChange}
            />
          )}

          {/* Language Selection */}
          <div className="mt-4">
  <label>Select Languages:</label>
  <div className="language-grid mt-2">
    {[
      { code: "en", label: "English" },
      { code: "zh", label: "中文" },
      { code: "fr", label: "Français" },
      { code: "hi", label: "हिन्दी" },
      { code: "ms", label: "Melayu" },
      { code: "ru", label: "Русский" },
      { code: "tr", label: "Türkçe" },
      { code: "ur", label: "اردو" },
    ].map((language) => (
      <div key={language.code} className="language-item">
        <input
          type="checkbox"
          id={language.code}
          name="languages"
          value={language.code}
          checked={formData.languages.includes(language.code)}
          onChange={handleChange}
          className="form-check-input"
        />
        <label
          htmlFor={language.code}
          className="form-check-label d-flex align-items-center"
        >
          <img
            src={`${process.env.PUBLIC_URL}/${language.code}.png`}
            alt={language.label}
            className="language-icon"
          />
          {language.label}
        </label>
      </div>
    ))}
  </div>
</div>


          {error && <div className="text-danger mt-3">{error}</div>}
          <button type="submit" className="btn btn-primary mt-4">
            Sign Up
          </button>
        </form>

        {/* Log In Redirect */}
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Log In Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
