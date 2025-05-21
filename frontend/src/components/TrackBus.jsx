import React, { useCallback, useState } from 'react';
import io from 'socket.io-client';

// Socket.io connection
const socket = io('http://localhost:9002');

const TrackBus = () => {
  const [routeNo, setRouteNo] = useState('');
  const [busNo, setBusNo] = useState('');

  // Fetch bus stops (simulated)
  const fetchBusStops = useCallback((routeNo, busNo) => {
    // Simulate fetching bus stops data based on route number or bus number
    // ... your logic here
  }, []);

  const handleSearch = () => {
    fetchBusStops(routeNo, busNo);
  };

  return (
    <div className="relative p-6  min-h-screen bg-gradient-to-r">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
        🚍 <span className="text-orange-400">Track Your Bus in Real-Time!</span>
      </h2>
      <p className="text-gray-300 mb-6 text-lg leading-relaxed">
        With our <strong className="text-red-600">TrackBus</strong> feature, effortlessly monitor the current location of your bus, view its live route, and get up-to-date information on all nearby bus stops. Whether you're heading to work, school, or just out and about, we make your commute easier and more reliable.
      </p>
      <div className="bg-slate-800 p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-300 mb-2">Key Features:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-400 text-lg ">
            <strong className="text-pink-400">Real-Time Bus Tracking:</strong> Watch the bus move along its route as it happens.
          </li>
          <li className="text-gray-400 text-lg">
            <strong className="text-pink-400">Detailed Route Maps:</strong> View the full route and all stops to plan your journey better.
          </li>
          <li className="text-gray-400 text-lg">
            <strong className="text-pink-400">Instant Stop Information:</strong> Click on any bus stop to see its name, distance from your location, and more.
          </li>
        </ul>
      </div>

      <div className="flex space-x-4 mt-12 mb-6 items-center">
        <div className="w-full max-w-xs p-4">
          <label className="block font-medium text-gray-400 text-2xl">Bus No.</label>
          <input
            type="text"
            value={busNo}
            onChange={(e) => setBusNo(e.target.value)}
            className="mt-1 block w-full p-4 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-white"
            placeholder="Enter bus number"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white mt-8 px-8 py-4 rounded-md shadow-lg hover:bg-blue-600 transition duration-150"
        >
          Search
        </button>
      </div>

      <div className="relative z-0" style={{ height: '500px', width: '100%' }}>
        <iframe
          src="https://realtime-tracker-main-muk0.onrender.com/"
          title="Real-time Tracker"
          style={{ 
            height: '100%', 
            width: '100%', 
            border: '0px solid #ddd', // Border styling
            borderRadius: '8px',
            scrollbar:'hidden', // Rounded corners
            overflow: 'hidden' // Hide scrollbars
          }}
          frameBorder="0"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-400 mb-2">Bus Stops</h3>
        <ul>
          {/* Render bus stops */}
        </ul>
      </div>

      {/* Additional content */}
    </div>
  );
};

export default TrackBus;