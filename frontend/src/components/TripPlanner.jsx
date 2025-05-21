import React, { useState } from 'react';
import { FaBus, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Marquee from 'react-marquee-slider';

const TripPlanner = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [onwardDate, setOnwardDate] = useState('');
  const [busOptions, setBusOptions] = useState([]);
  const [popularRoutes] = useState([
    { route: 'Mathura to Dehradun', buses: 17, firstBus: '00:59', lastBus: '23:55', price: 750 },
    { route: 'Mathura to Ujjain', buses: 9, firstBus: '17:00', lastBus: '23:00', price: 1100 },

  ]);

  const busImageURL = 'https://solguruz.com/_next/image/?url=https%3A%2F%2Fblog.solguruz.com%2Fwp-content%2Fuploads%2F2024%2F05%2FHow-to-Build-an-AI-powered-Trip-Planner-App.png&w=1080&q=75';

  const searchBuses = () => {

    const filteredBuses = [
      { route: `${from} to ${to}`, buses: 8, firstBus: '06:00', lastBus: '22:00', price: 500 },

    ];
    setBusOptions(filteredBuses);
  };

  return (
    <div className="p-4 pt-12">
      <h2 className="text-2xl font-bold mb-8 flex text-white items-center">
        <FaBus className="mr-2 text-red-700" />
        Trip Planner
      </h2>
      <div className="bg-gray-800 p-8 rounded-xl shadow-md max-sm:p-4">
        <div className="flex flex-wrap gap-0 space-y-4 md:space-y-0 md:space-x-4 mb-4">
          <div className="w-full md:w-1/3  p-4">
            <label className="block text-sm font-medium text-gray-400 flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2 text-blue-700" size={24} />
              From
            </label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="text-black text-xl mt-1 p-4 block w-full border-gray-300 rounded-md border-2 border-solid shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
              placeholder="Enter departure city"
            />
          </div>
          <div className="w-full md:w-1/3 p-4">
            <label className="block text-sm font-medium text-gray-400 flex items-center mb-4">
              <FaMapMarkerAlt className="mr-2 text-green-700" size={24} /> To
            </label>
            <input
  type="text"
  value={to}
  onChange={(e) => setTo(e.target.value)}
  className="text-black text-xl mt-1 p-4 block w-full border-gray-300 rounded-md border-2 border-solid shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
  placeholder="Enter destination city"
/>
          </div>
          <div className="w-full md:w-1/4 p-4">
            <label className="block text-sm font-medium text-gray-400 flex items-center mb-4">
              <FaCalendarAlt className="mr-2 text-purple-800" size={24}/> Onward Date
            </label>
            <input
              type="date"
              value={onwardDate}
              onChange={(e) => setOnwardDate(e.target.value)}
              className="text-black text-xl mt-1 p-4 block w-full border-gray-300 rounded-md border-2 border-solid shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-xl"
            />
          </div>
        </div>
        <button
          onClick={searchBuses}
          className="bg-red-500 max-sm:text-xl max-sm:p-4 text-white px-12 max-sm:px-4 py-2 m-auto rounded-md shadow-md hover:bg-red-600 transition duration-150 flex items-center"
        >
          <FaBus className="mr-2" /> Search Buses
        </button>
      </div>

      <h3 className="text-xl font-semibold mt-12 flex text-orange-400 items-center">
        <FaBus className="mr-2 text-indigo-600" />
        Available Buses
      </h3>
      <div className="space-y-4 mt-6">
        {busOptions.length ? (
          busOptions.map((bus, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-center">
              <img src={busImageURL} alt="Bus" className="w-16 h-16 rounded-md mr-4" />
              <div>
                <p className="font-semibold">{bus.route}</p>
                <p className="text-sm text-gray-600">First Bus: {bus.firstBus} | Last Bus: {bus.lastBus}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-indigo-600 flex items-center">
                  <FaRupeeSign className="mr-1" /> {bus.price}
                </p>
                <NavLink to={`/booking/${bus.route}`} className="text-blue-500 hover:underline">
                  Book Now
                </NavLink>
              </div>
            </div>
          ))
        ) : (
          <p className='text-[18px] text-white'>No buses found. Please try a different search.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold mt-8 flex  text-white items-center">
        <FaMapMarkerAlt className="mr-2 text-indigo-600 " />
        Top Bus Routes
      </h3>
      <div className="mt-6">
        <Marquee velocity={80} minScale={0.7} resetAfterTries={200}>
          {popularRoutes.map((route, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col justify-between items-center mx-8"
              style={{ minWidth: '300px' }}
            >
              <div className=''>
                <p className="text-sm text-gray-600 text-lg">First Bus: {route.firstBus} | Last Bus: {route.lastBus}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-indigo-600 flex items-center">
                  <FaRupeeSign className="mr-1" /> {route.price}
                </p>
                <NavLink to={`/booking`} className="text-blue-500 hover:underline">
                  Book Now
                </NavLink>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TripPlanner;
