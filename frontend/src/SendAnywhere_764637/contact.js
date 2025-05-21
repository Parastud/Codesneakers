import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import Contact from '../pages/Contact';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous messages
    setError('');
    setSuccess('');

    // Check if all fields are filled
    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    // If all fields are filled, show success message
    setSuccess('Your response has been recorded.');
    // Optionally, you can also clear the form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1F2937] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-[#4338CA] mb-6 hover:text-indigo-500">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div> 
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Message
              </button>
            </div>
            {error && (
              <div className="text-red-600 mt-4">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in-down">
                <span className="block sm:inline"> {success}</span>
                <span
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setSuccess('')}
                >
                  <svg
                    className="fill-current h-6 w-6 text-green-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 00-.706 0L10 9.293 6.354 5.646a.5.5 0 10-.707.707L9.293 10l-3.646 3.646a.5.5 0 00.707.707L10 10.707l3.646 3.646a.5.5 0 00.707-.707L10.707 10l3.646-3.646a.5.5 0 000-.707z" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};


export default Contact