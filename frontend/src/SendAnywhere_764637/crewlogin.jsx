import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CrewAuth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage("");
      // Navigate to dashboard with username and password
      navigate('/crewdashboard', { state: { username, password } });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 px-4">
      <div className="bg-[#1F2937] shadow-2xl rounded-lg p-8 max-w-md w-full md:max-w-lg lg:w-[450px]">
        <div className="text-center mb-6">
          <h2 className="text-2xl text-white font-semibold">Login</h2>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative">
            <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CrewAuth;
