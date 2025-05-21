

import React from 'react';
import ReactDOM from "react-dom/client";
import './admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

let root=ReactDOM.createRoot(document.querySelector("div.main"));

const AdminLogin = () => {
  return (
    <div className="admin-wrapper">
      <div className="admin-title">Admin Login</div>
      <div className="admin-form-container">
        <form className="admin-login-form">
          <div className="admin-field">
            <FontAwesomeIcon icon={faUser} className="admin-icon" />
            <input type="text" placeholder="Admin Username" required />
          </div>
          <div className="admin-field">
            <FontAwesomeIcon icon={faUser} className="admin-icon" />
            <input type="password" placeholder="Password" required />
          </div>
          <div className="admin-btn">
            <div className="admin-btn-layer"></div>
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

root.render(
  <>
    <AdminLogin/>  
  </>
)