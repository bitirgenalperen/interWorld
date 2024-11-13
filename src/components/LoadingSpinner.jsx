import React from 'react';
import './LoadingSpinner.css'; // Keep the styling

const LoadingSpinner = ({ message }) => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <div className="loading-text">
        {message || 'Loading, please wait...'} {/* Default message if none is provided */}
      </div>
    </div>
  );
};

export default LoadingSpinner;
