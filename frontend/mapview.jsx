import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

import './style.css';

const socket = io('http://52.66.45.131:9002');

const MapView = () => {
    useEffect(() => {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        socket.on('receive-location', (data) => {
            L.marker([data.latitude, data.longitude]).addTo(map)
                .bindPopup(`<b>User ID:</b> ${data.id}`)
                .openPopup();
        });

        return () => {
            socket.off('receive-location');
        };
    }, []);

    return (
        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
    );
};

export default MapView;
