import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';

const TrackBus = () => {
  const [busId, setBusId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrackBus = (e) => {
    e.preventDefault();
    if (!busId) {
      setErrorMessage('Please enter a valid Bus ID.');
    } else {
      setErrorMessage('');
      const mockResult = {
        id: busId,
        location: 'Connaught Place, New Delhi',
        status: 'On Time',
        estimatedArrival: '5:30 PM',
      };
      setTrackingResult(mockResult);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 px-4 py-8">
      <div className="bg-[#1F2937] shadow-2xl rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl text-green-500 font-semibold">Track Your Bus</h2>
          <p className="text-gray-400">Enter your Bus ID to get real-time updates</p>
        </div>
        <form className="space-y-4" onSubmit={handleTrackBus}>
          <div className="relative">
            {/* FontAwesome Bus Icon */}
            <i className="fas fa-bus absolute left-3 top-3 text-gray-400"></i>
            <input
              type="text"
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
              placeholder="Enter Bus ID"
              className="w-full pl-10 px-4 py-2 border border-gray-500 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Track Bus
          </button>
        </form>
        {trackingResult && (
          <div className="mt-6 bg-gray-700 p-4 rounded-md text-white">
            <h3 className="text-lg font-bold mb-2">Bus ID: {trackingResult.id}</h3>
            <p>
              <i className="fas fa-map-marker-alt text-blue-400 mr-2"></i>
              <span className="font-semibold">Location:</span> {trackingResult.location}
            </p>
            <p>
              <i className="fas fa-bus-alt text-green-400 mr-2"></i>
              <span className="font-semibold">Status:</span> {trackingResult.status}
            </p>
            <p>
              <i className="fas fa-clock text-yellow-400 mr-2"></i>
              <span className="font-semibold">Estimated Arrival:</span> {trackingResult.estimatedArrival}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};



