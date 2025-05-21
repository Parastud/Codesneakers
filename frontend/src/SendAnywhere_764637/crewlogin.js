import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';

let root = ReactDOM.createRoot(document.querySelector("div.main"));

const CrewAuth = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [isOTPFieldVisible, setIsOTPFieldVisible] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMessage("Please fill in all fields.");
    } else {
      setErrorMessage("");
    }
  };
  

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email.");
    } else if (isValidEmail(email)) {
      setErrorMessage("");
      setIsOTPFieldVisible(true); 
    } else {
      setErrorMessage("Please enter a valid email address.");
    }
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    if (otp === "1234") {
      setErrorMessage("");
      setIsOTPFieldVisible(false); 
      setIsOTPValid(true); 
    } else {
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
      setIsPasswordReset(true); 
    }
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
    setIsLoginSuccess(false);
    setUsername("");
    setPassword("");
    setErrorMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 px-4">
      <div className="bg-[#1F2937] shadow-2xl rounded-lg p-8 max-w-md w-full md:max-w-lg lg:w-[450px]">
        <div className="text-center mb-6">
          <h2 className="text-2xl text-white font-semibold">
            {isForgotPassword ? 
              (isPasswordReset ? "Password Reset" : 
                isOTPValid ? "Reset Password" : 
                isOTPFieldVisible ? "Verify OTP" : 
                "Forgot Password") : 
              (isLoginSuccess ? "Login Successful!" : "Login")
            }
          </h2>
        </div>
        <div>
          {isLoginSuccess ? (
            <div className="space-y-4">
              <div className="text-center text-green-500">
                Login Successful!
              </div>
              <button 
                onClick={handleBackToLogin} 
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Back to Login
              </button>
            </div>
          ) : !isForgotPassword ? (
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
          ) : isPasswordReset ? (
            <div className="text-center text-green-500">
              Password Reset Successfully!
            </div>
          ) : isOTPValid ? (
            <form className="space-y-4" onSubmit={handlePasswordReset}>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Reset Password
              </button>
            </form>
          ) : isOTPFieldVisible ? (
            <form className="space-y-4" onSubmit={handleOTPSubmit}>
              <div className="relative">
                <i className="fas fa-key absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Verify OTP
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleForgotPassword}>
              <div className="relative">
                <i className="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Send OTP
              </button>
            </form>
          )}
        </div>
        <div className="mt-6 text-center">
          {!isForgotPassword ? (
            <button
              onClick={() => setIsForgotPassword(true)}
              className="text-blue-400 hover:underline"
            >
              Forgot Password?
            </button>
          ) : (
            <button
              onClick={() => setIsForgotPassword(false)}
              className="text-blue-400 hover:underline"
            >
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

root.render(<CrewAuth />);

//track bus by bus id, 