import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from './LanguageDropdown'; // Import the custom dropdown

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/InterWorld_name2.png`}
            alt="App Logo"
            style={{ height: '60px', width: 'auto' }}
          />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav flex-grow-1">
          <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">
                {i18n.t('navbar.home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`} to="/projects">
                {i18n.t('navbar.projects')}
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register">
                    {i18n.t('navbar.register')}
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">|</span>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login">
                    {i18n.t('navbar.login')}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === '/bookings' ? 'active' : ''}`} to="/bookings">
                    {i18n.t('navbar.bookings')}
                  </Link>
                </li>
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

          {/* Language Dropdown with Flags */}
          <LanguageDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
