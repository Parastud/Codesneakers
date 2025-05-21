import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const CrewDashboard = () => {
  const [username, setUsername] = useState("Satyam Yadav");
  const [assignedBuses, setAssignedBuses] = useState([]);
  const [guidelines, setGuidelines] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [qrCodeData, setQrCodeData] = useState('');
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const qrScannerRef = useRef(null); 

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error obtaining location: ", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

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

    return () => {
      stopQrScanner();
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error obtaining location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const startQrScanner = () => {
    setShowQrScanner(true);
    setIsScanning(true);

    setTimeout(() => {
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      qrScannerRef.current = new Html5QrcodeScanner("qr-reader", config, false);
      qrScannerRef.current.render(
        (decodedText, decodedResult) => {
          console.log(`QR Code detected: ${decodedText}`);
          setQrCodeData(decodedText);
          setIsScanning(false);
          qrScannerRef.current.clear();
        },
        (error) => {
          console.error(`QR Code scan error: ${error}`);
        }
      );
    }, 100);
  };

  const stopQrScanner = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.clear();
      qrScannerRef.current = null;
    }
    setShowQrScanner(false);
    setIsScanning(false);
  };

  const isValidURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i');
    return !!pattern.test(str);
  };

  const renderQrCodeData = (data) => {
    if (isValidURL(data)) {
      return (
        <a 
          href={data} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-400 underline hover:text-blue-600"
        >
          {data}
        </a>
      );
    }
    return <p className="text-white">{data}</p>;
  };

  return (
    <div className="min-h-screen bg-[#1F2937] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2">Welcome, {username}</h1>
        </div>

        <div className="text-center mb-6">
          {latitude && longitude ? (
            <p className="text-lg">Your current location: <span className="font-bold text-yellow-400">Latitude:</span> {latitude.toFixed(4)}, <span className="font-bold text-yellow-400">Longitude:</span> {longitude.toFixed(4)}</p>
          ) : (
            <p className="text-lg">Fetching your location...</p>
          )}
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Scan QR Code</h2>
          {!isScanning && (
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={startQrScanner}
            >
              Start QR Scanner
            </button>
          )}
          {isScanning && (
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={stopQrScanner}
            >
              Stop QR Scanner
            </button>
          )}
          {showQrScanner && (
            <div id="qr-reader" className="mt-4"></div>
          )}
          {qrCodeData && (
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold mb-2">QR Code Data</h3>
              {renderQrCodeData(qrCodeData)}
            </div>
          )}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Assigned Buses</h2>
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-700">Bus Number</th>
                <th className="py-2 px-4 border-b border-gray-700">Route</th>
                <th className="py-2 px-4 border-b border-gray-700">Shift</th>
                <th className="py-2 px-4 border-b border-gray-700">Departure</th>
                <th className="py-2 px-4 border-b border-gray-700">Arrival</th>
              </tr>
            </thead>
            <tbody>
              {assignedBuses.map(bus => (
                <tr key={bus.id}>
                  <td className="py-2 px-4 border-b border-gray-700">{bus.busNumber}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{bus.route}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{bus.shift}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{bus.departure}</td>
                  <td className="py-2 px-4 border-b border-gray-700">{bus.arrival}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Guidelines</h2>
          <ul className="list-disc list-inside space-y-2">
            {guidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="iframe-container mt-8">
        <iframe
          src="https://realtime-tracker-main-muk0.onrender.com/"
          title="Location Permission Iframe"
          width="100%"
          height="500px"
          style={{ border: '0' }}
          allow="geolocation" // Allow iframe to access geolocation
          sandbox="allow-scripts allow-same-origin allow-forms"
        ></iframe>
      </div>
    </div>
  );
};

export default CrewDashboard;
