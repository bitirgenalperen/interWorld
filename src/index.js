import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/AuthContext'; // Import the context
import './i18n'; // Ensure i18n is imported before using it in your app
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);