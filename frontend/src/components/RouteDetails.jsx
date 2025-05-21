import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import axios from 'axios';

const RouteDetails = () => {
  const [routeNumber, setRouteNumber] = useState('');
  const [busDetails, setBusDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAllStops, setShowAllStops] = useState(false);
  const [showAllDirections, setShowAllDirections] = useState(false);

  const mapboxApiKey = 'pk.eyJ1IjoiYW1hbmd1cHRhMTIxIiwiYSI6ImNtMGUzNDEyMzBqc2oya3NjY3E3cWRyd3kifQ.77WQk0FBICCtjCWqF_GStA'; // Replace with your actual API key

  const getCoordinatesForStop = async (stopName) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: stopName,
          format: 'json',
          limit: 1,
        },
      });
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return [parseFloat(lat), parseFloat(lon)];
      } else {
        return [28.6139, 77.2090]; 
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return [28.6139, 77.2090]; 
    }
  };

  const getRouteBetweenStops = async (startCoords, endCoords) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?steps=true&geometries=geojson&access_token=${mapboxApiKey}`;

    try {
      const response = await axios.get(url);
      const route = response.data.routes[0].geometry.coordinates;
      const directions = response.data.routes[0].legs[0].steps.map(step => step.maneuver.instruction); 
      return { route: route.map(coord => [coord[1], coord[0]]), directions };
    } catch (error) {
      console.error('Error fetching route:', error);
      return { route: [], directions: [] };
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:9002/api/routes/${routeNumber}`);
      const data = response.data;

      const busStopsWithCoords = await Promise.all(data.bus_stops.map(async (stop) => {
        const position = await getCoordinatesForStop(stop);
        return { name: stop, position };
      }));

      const routePaths = [];
      const directionsList = [];
      for (let i = 0; i < busStopsWithCoords.length - 1; i++) {
        const startCoords = busStopsWithCoords[i].position;
        const endCoords = busStopsWithCoords[i + 1].position;
        const { route, directions } = await getRouteBetweenStops(startCoords, endCoords);
        routePaths.push(...route);
        directionsList.push(...directions);
      }

      const transformedData = {
        routeNumber: data.bus_id,
        serviceProvider: 'Delhi Transport Corporation',
        origin: data.route_name || 'Origin Placeholder',
        destination: data.bus_stops[data.bus_stops.length - 1] || 'Destination Placeholder',
        busStops: busStopsWithCoords,
        routePaths: routePaths,
        directions: directionsList,
      };
      setBusDetails(transformedData);
    } catch (err) {
      setError('No details found for this route.');
      setBusDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white p-8  h-auto flex flex-col gap-24 lg:flex-row mt-24 ">
      <div className="w-full h-auto lg:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-4 animate-fadeIn">Route Details</h2>
        <div className="mb-4">
          <input
            type="text"
            value={routeNumber}
            onChange={(e) => setRouteNumber(e.target.value)}
            placeholder="Enter Route Number"
            className="p-2 rounded bg-gray-800 text-white w-full"
          />
          <button
            onClick={handleSearch}
            className="mt-2 p-2 bg-blue-600 rounded text-white w-full transition-transform transform hover:scale-105"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}

        {busDetails && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold mb-2">Details for Route {busDetails.routeNumber}</h3>
            <p><strong>Service Provider:</strong> {busDetails.serviceProvider}</p>
            <p><strong>Route Name:</strong> {busDetails.origin}</p>
            <p><strong>Last Stop:</strong> {busDetails.destination}</p>
            <p><strong>Bus Stops:</strong></p>
            <ul className="list-disc ml-6">
              {busDetails.busStops.slice(0, showAllStops ? busDetails.busStops.length : 3).map((stop, index) => (
                <li key={index}>{stop.name}</li>
              ))}
            </ul>
            {busDetails.busStops.length > 3 && (
              <button
                className="mt-2 p-2 bg-blue-600 rounded text-white transition-transform transform hover:scale-105"
                onClick={() => setShowAllStops(!showAllStops)}
              >
                {showAllStops ? 'Show Less' : 'See More'}
              </button>
            )}
            <p><strong>Directions:</strong></p>
            <ol className="list-decimal ml-6">
              {busDetails.directions.slice(0, showAllDirections ? busDetails.directions.length : 5).map((direction, index) => (
                <li key={index}>{direction}</li>
              ))}
            </ol>
            {busDetails.directions.length > 5 && (
              <button
                className="mt-2 p-2 bg-blue-600 rounded text-white transition-transform transform hover:scale-105"
                onClick={() => setShowAllDirections(!showAllDirections)}
              >
                {showAllDirections ? 'Show Less' : 'See More'}
              </button>
            )}
          </motion.div>
        )}
      </div>

      {busDetails && (
        <div className="w-full lg:w-1/2 h-[400px] sm:h-[400px] md:h-[500px] lg:h-auto relative z-0">
          <div className="absolute inset-0">
            <MapContainer center={busDetails.routePaths.length > 0 ? busDetails.routePaths[0] : [28.6139, 77.2090]} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {busDetails.busStops.map((stop, index) => (
                <Marker key={index} position={stop.position}>
                  <Tooltip>
                    <div>
                      <h3 className="text-lg font-semibold">{stop.name}</h3>
                      <p><strong>Coordinates:</strong> {stop.position.join(', ')}</p>
                    </div>
                  </Tooltip>
                </Marker>
              ))}
              <Polyline positions={busDetails.routePaths} color="blue" />
            </MapContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteDetails;
