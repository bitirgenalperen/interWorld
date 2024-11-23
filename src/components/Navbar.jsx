import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown'; // Import the custom dropdown
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = async () => {
    try {
      await fetch('http://localhost:5001/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      handleLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent mt-1 mb-2">
  <div className="container d-flex align-items-center justify-content-between">
    {/* Left-aligned navigation links */}
    <div className="d-flex align-items-center">
      <ul className="navbar-nav d-flex flex-row">
        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
          >
            {i18n.t('navbar.home')}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
            to="/projects"
          >
            {i18n.t('navbar.projects')}
          </Link>
        </li>
        {isAuthenticated && (
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`}
              to="/bookings"
            >
              {i18n.t('navbar.bookings')}
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li className="nav-item">
            <Link
              className={`nav-link ${location.pathname === '/agents' ? 'active' : ''}`}
              to="/agents"
            >
              {i18n.t('navbar.agents')}
            </Link>
          </li>
        )}
      </ul>
    </div>

    {/* Centered Logo */}
    <Link className="navbar-brand mx-auto" to="/">
      <img
        src={`${process.env.PUBLIC_URL}/InterWorld_large_nobg.png`}
        alt="App Logo"
        style={{ height: '40px', width: 'auto' }}
      />
    </Link>

    {/* Right-aligned controls */}
    <div className="d-flex align-items-center">
      {/* Language Dropdown */}
      <LanguageDropdown />
        
      {/* Authentication Links */}
      <ul className="navbar-nav d-flex flex-row">
        {!isAuthenticated ? (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">
                {i18n.t('navbar.login')}
              </Link>
            </li>
            <li className="nav-item" style={{ color: '#50C878' }}>
              <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register">
                {i18n.t('navbar.register')}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">
                {i18n.t('navbar.profile')}
              </Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogoutClick}>
                {i18n.t('navbar.logout')}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
