import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import ReactDOM from 'react-dom';


const CrewDashboard = () => {
  const [username, setUsername] = useState("John Doe");
  const [assignedBuses, setAssignedBuses] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [markers, setMarkers] = useState([]);
  
  const MAPBOX_API_KEY = 'pk.eyJ1IjoiYW1hbmd1cHRhMTIxIiwiYSI6ImNtMGUzNDEyMzBqc2oya3NjY3E3cWRyd3kifQ.77WQk0FBICCtjCWqF_GStA';
  useEffect(() => {
    // Fetch user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);

          // Add user's location as a marker
          setMarkers((prevMarkers) => [
            ...prevMarkers,
            { id: 'user', latitude, longitude, label: 'Your Location' },
          ]);
        },
        (error) => {
          console.error("Error obtaining location: ", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // Mock Data for Assigned Buses and Guidelines
    setAssignedBuses([
      { id: 1, busNumber: 'DL 5C 1234', route: 'New Delhi to Gurgaon', shift: 'Morning', departure: '6:00 AM', arrival: '8:00 AM' },
      { id: 2, busNumber: 'DL 9B 5678', route: 'Connaught Place to Noida', shift: 'Evening', departure: '5:00 PM', arrival: '7:00 PM' },
    ]);

    setGuidelines([
      "Ensure all safety checks are completed before starting the journey.",
      "Wear your ID badge at all times while on duty.",
      "Report any delays or issues to the dispatcher immediately.",
      "Keep the bus clean and maintain a professional attitude."
    ]);

    // Additional Markers Data
    const additionalMarkers = [
      { id: 2, latitude: 28.6139, longitude: 77.209, label: 'New Delhi' },
      { id: 3, latitude: 28.4595, longitude: 77.0266, label: 'Gurgaon' },
      { id: 4, latitude: 28.5355, longitude: 77.391, label: 'Noida' }
    ];
    setMarkers((prevMarkers) => [...prevMarkers, ...additionalMarkers]);
  }, []);

  // Define a custom icon if needed (otherwise, Leaflet's default icon will be used)
  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Default Leaflet marker icon
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Anchor point of the icon
    popupAnchor: [1, -34] // Point from which the popup should open relative to the icon
  });

  return (
    <div className="min-h-screen bg-[#1F2937] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Username Display */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">Welcome, {username}</h1>
        </div>

        {/* Display User's Location */}
        <div className="text-center mb-6">
          {latitude && longitude ? (
            <p className="text-lg">Your current location: <span className="font-bold text-yellow-400">Latitude:</span> {latitude.toFixed(4)}, <span className="font-bold text-yellow-400">Longitude:</span> {longitude.toFixed(4)}</p>
          ) : (
            <p className="text-lg">Fetching your location...</p>
          )}
        </div>

        {/* Map Section */}
        {latitude && longitude && (
          <div className="mb-8">
            <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`}
                attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
              />
              {/* Add markers dynamically */}
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.latitude, marker.longitude]}
                  icon={defaultIcon} // Use default or custom icon here
                >
                  <Popup>
                    <div className="text-sm">
                      <p><span className="font-semibold">{marker.label}</span></p>
                      <p><span className="font-semibold">Latitude:</span> {marker.latitude.toFixed(4)}</p>
                      <p><span className="font-semibold">Longitude:</span> {marker.longitude.toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}

        {/* Assigned Buses Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 border-b border-gray-600 pb-2">Assigned Buses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignedBuses.map((bus) => (
              <div key={bus.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition transform hover:scale-105 duration-300 ease-in-out">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">Bus Number: {bus.busNumber}</h3>
                <p className="mb-2"><span className="font-semibold text-green-400">Route:</span> {bus.route}</p>
                <p className="mb-2"><span className="font-semibold text-yellow-400">Shift:</span> {bus.shift}</p>
                <p className="mb-2"><span className="font-semibold text-red-400">Departure Time:</span> {bus.departure}</p>
                <p><span className="font-semibold text-purple-400">Arrival Time:</span> {bus.arrival}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 border-b border-gray-600 pb-2">Guidelines</h2>
          <ul className="list-disc list-inside space-y-2">
            {guidelines.map((guideline, index) => (
              <li key={index} className="text-lg">{guideline}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CrewDashboard;