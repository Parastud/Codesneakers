import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { io } from 'socket.io-client';

const CrewDashboard = () => {
  const location = useLocation();
  const { username, password } = location.state || { username: 'Default User', password: '' };
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(13);
  const socket = io('http://localhost:5000');

  const icon = new L.Icon({
    iconUrl: require('../assets/bus_icon.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    console.log("Received Username:", username);
    console.log("Received Password:", password);

    const sendLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          socket.emit('locationUpdate', { busNumber: 'BUS123', latitude, longitude });
        });
      }
    };

    const locationInterval = setInterval(sendLocation, 2000);
    return () => clearInterval(locationInterval);
  }, [socket]);

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Welcome, {username}</h2>
      <div className="md:w-1/2 p-4">
        <h3 className="text-lg font-semibold mb-2">Live Location</h3>
        {latitude && longitude ? (
          <MapContainer
            center={[latitude, longitude]}
            zoom={zoomLevel}
            scrollWheelZoom={false}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={icon}>
              <Popup>Your current location.</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>No location available.</p>
        )}
      </div>
    </div>
  );
};

export default CrewDashboard;
