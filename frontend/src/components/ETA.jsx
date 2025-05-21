import React, { useState } from 'react';
import { FaBus, FaSearch, FaArrowDown } from 'react-icons/fa'; // Importing arrow icon
import axios from 'axios';

const ETA = () => {
  const [busStop, setBusStop] = useState('');
  const [etaDetails, setEtaDetails] = useState([]);
  const [visibleStops, setVisibleStops] = useState(5); // Number of stops to show initially
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEtaDetails = async () => {
    setLoading(true);
    setError(''); // Clear previous errors
    try {
      const response = await axios.get('http://localhost:9002/api/eta', {
        params: { stop_name: busStop },
      });

      setEtaDetails(response.data);
      setVisibleStops(5); // Reset to show first 5 stops when new data is fetched
    } catch (error) {
      console.error('Error fetching ETA details:', error.response ? error.response.data : error.message);
      setError('Failed to fetch ETA details. Please try again.');
      setEtaDetails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (busStop.trim()) {
      fetchEtaDetails();
    } else {
      alert('Please enter a bus stop name.');
    }
  };

  const handleSeeMore = () => {
    setVisibleStops((prev) => prev + 5); // Show 5 more stops when "See More" is clicked
  };

  return (
    <div id="eta" className="p-6 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-white" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
        Estimated Time of Arrival (ETA)
      </h2>

      <div className="mb-6">
        <label className="block text-2xl flex items-center font-medium text-white mb-8">
          <FaBus className="inline mr-2 text-green-700" />
          Bus Stop
        </label>
        <input
          type="text"
          value={busStop}
          onChange={(e) => setBusStop(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 bg-white text-gray-900"
          placeholder="Enter bus stop name"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition duration-150 block mx-auto"
      >
        <FaSearch className="inline mr-2" />
        Search
      </button>

      {loading && <p className="mt-4 text-gray-100 text-center">Loading...</p>}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      <h3 className="text-xl mt-8 font-semibold text-gray-400 mb-4">ETA Details</h3>
      {etaDetails.length > 0 && (
        <div className="mt-6">
          <ul className="ml-6 text-gray-100 space-y-4 ">
            {etaDetails.slice(0, visibleStops).map((stop, index) => (
              <React.Fragment key={index}>
                <li className="mb-4 border-[1px] border-orange-400 p-4 bg-gray-800 rounded-md shadow-md">
                  <div className="text-lg font-bold text-yellow-400">
                    <FaBus className="inline mr-2" />
                    Stop Details: {stop.stop_name}
                  </div>
                  <div className="text-gray-300">Stop Name: <span className="text-white">{busStop}</span></div>
                  <div className="text-gray-300">Arrival: <span className="text-white">{stop.arrival_time}</span></div>
                  <div className="text-gray-300">Departure: <span className="text-white">{stop.departure_time}</span></div>
                  <div className="text-gray-300">Trip ID: <span className="text-white">{stop.trip_id}</span></div>
                  <div className="text-gray-300">Stop ID: <span className="text-white">{stop.stop_id}</span></div>
                  <div className="text-gray-300">Stop Sequence: <span className="text-white">{stop.stop_sequence}</span></div>
                </li>
                {index < visibleStops - 1 && index < etaDetails.length - 1 && (
                  <div className="flex justify-center text-yellow-500">
                    {/* <FaArrowDown size={40} className='text-red-700' /> */}
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
          {visibleStops < etaDetails.length && (
            <button
              onClick={handleSeeMore}
              className="mt-4 bg-green-700 text-white px-8 py-4 rounded-md shadow-md hover:bg-gray-800 transition duration-150 block mx-auto"
            >
              See More
            </button>
          )}
        </div>
      )}

      {etaDetails.length === 0 && !loading && !error && (
        <p className="text-white text-center">No ETA data available for this stop.</p>
      )}
    </div>
  );
};

export default ETA;