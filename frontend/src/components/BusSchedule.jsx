import React, { useState } from 'react';
import axios from 'axios';

const BusSchedule = () => {
  const [busId, setBusId] = useState('');
  const [routeDetails, setRouteDetails] = useState({
    routeName: '',
    routeShortName: '',
    ticketFee: '',
    conductor: '',
    driver: '',
    routeType: '',
    routeDescription: '',
    busStops: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBusIdChange = async (e) => {
    const busId = e.target.value;
    setBusId(busId);
    setRouteDetails({
      routeName: '',
      routeShortName: '',
      ticketFee: '',
      conductor: '',
      driver: '',
      routeType: '',
      routeDescription: '',
      busStops: [],
    });
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`http://localhost:9002/api/routes/${busId}`);
      const data = response.data;

      if (data) {
        
        const transformedData = {
          routeName: data.route_name || 'No Route Name',
          routeShortName: data.route_short_name || 'No Short Name',
          ticketFee: data['Ticket fee'] || 'No Fee Information',
          conductor: data.Conductor || 'No Conductor Information',
          driver: data.Driver || 'No Driver Information',
          routeType: data.route_type || 'No Route Type',
          routeDescription: data.route_description || 'No Description',
          busStops: data.bus_stops || [],
        };

        setRouteDetails(transformedData);
      } else {
        setError('No details found for this bus ID.');
      }
    } catch (err) {
      setError('Error fetching data from the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 w-2/3 m-auto  bg-gray-800 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out transform">
      <h2 className="text-2xl font-bold mb-4 animate-bounce">Bus Details</h2>
      <p className="mb-4">Enter the bus ID to view the details:</p>
      <input
        type="text"
        value={busId}
        onChange={handleBusIdChange}
        className="w-full p-2 mb-4 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        placeholder="Enter Bus ID"
      />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {routeDetails.routeName && (
        <div className="mt-4 p-4 bg-gray-700 rounded-md transition-opacity duration-500 ease-in-out opacity-100">
          <h3 className="text-xl font-semibold mb-2">Bus Details:</h3>
          <p><strong>Route Name:</strong> {routeDetails.routeName}</p>
          <p><strong>Route Short Name:</strong> {routeDetails.routeShortName}</p>
          <p><strong>Ticket Fee:</strong> {routeDetails.ticketFee}</p>
          <p><strong>Conductor:</strong> {routeDetails.conductor}</p>
          <p><strong>Driver:</strong> {routeDetails.driver}</p>
          <p><strong>Route Type:</strong> {routeDetails.routeType}</p>
          <p><strong>Route Description:</strong> {routeDetails.routeDescription}</p>
          <p><strong>Bus Stops:</strong></p>
          <ul className="list-disc ml-6">
            {routeDetails.busStops.map((stop, index) => (
              <li key={index}>{stop}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusSchedule;
