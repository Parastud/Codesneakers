import React, { useEffect } from 'react';
import L from 'leaflet';
import io from 'socket.io-client';
import './style.css';

const MapView = () => {
    useEffect(() => {
        const socket = io('http://52.66.45.131:9002');

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    socket.emit("send-location", { latitude, longitude });
                },
                (error) => {
                    console.log('Error retrieving location:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        const map = L.map("map").setView([51.505, -0.09], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Automatic Bus Scheduler"
        }).addTo(map);

        const markers = {};

        socket.on("receive-location", (data) => {
            const { id, latitude, longitude } = data;
            if (markers[id]) {
                markers[id].setLatLng([latitude, longitude]);
            } else {
                markers[id] = L.marker([latitude, longitude]).addTo(map);
            }
            map.setView([latitude, longitude], 16);
        });

        socket.on("user-disconnected", (id) => {
            if (markers[id]) {
                map.removeLayer(markers[id]);
                delete markers[id];
            }
        });

        return () => {
            socket.off("receive-location");
            socket.off("user-disconnected");
        };
    }, []);

    return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
};

export default MapView;
