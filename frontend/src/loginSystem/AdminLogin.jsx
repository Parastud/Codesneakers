import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call)
    // If login is successful:
    navigate('/admin/adminDashboard'); // Redirect to the admin dashboard
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="text-3xl font-semibold text-center mb-6">Admin Login</div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-12 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FontAwesomeIcon icon={faUser} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="relative w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold text-lg overflow-hidden focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg transition-transform duration-300 transform -translate-x-full hover:translate-x-0"></span>
            <span className="relative z-10">Login</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
