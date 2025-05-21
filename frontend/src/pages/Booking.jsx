import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const busRoutes = [
  { routeNumber: "DTC 101", station: "Hazrat Nizamuddin - Rajouri Garden", price: 20 },
  { routeNumber: "DTC 102", station: "Pitampura - Connaught Place", price: 28 },
];

function Booking() {
  const [view, setView] = useState('book');
  const [bookingDetails, setBookingDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedRoute, setSelectedRoute] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [manageErrorMessage, setManageErrorMessage] = useState('');
  const [routeOptions, setRouteOptions] = useState(busRoutes);
  const [bookingIDToSearch, setBookingIDToSearch] = useState('');

  const handleViewChange = (view) => {
    setView(view);
    setErrorMessage('');
    setAmount('');
    setPaymentProcessing(false);
    setManageErrorMessage('');
    setBookingIDToSearch('');
  };

  const handleBookTicket = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const date = form.date.value;
    const upi = form.upi.value;

    if (!name || !date || !upi) {
      setErrorMessage('All fields are required.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (date < today) {
      setErrorMessage('Cannot select a past date.');
      return;
    }

    if (!upi || upi.length > 20) {
      setErrorMessage('UPI is required and must be at most 20 characters.');
      return;
    }

    if (!selectedRoute) {
      setErrorMessage('Please select a route.');
      return;
    }

    setErrorMessage('');
    setPaymentProcessing(true);

    setTimeout(() => {
      const randomID = Math.floor(Math.random() * 100000);
      const arrivalTime = '12:00 PM';

      setBookingDetails({
        id: randomID,
        name,
        route: selectedRoute,
        date,
        arrivalTime
      });
      setAmount(calculateAmount(selectedRoute));
      setPaymentProcessing(false);
    }, 3000); 
  };

  const calculateAmount = (route) => {
    const routeData = routeOptions.find(r => r.routeNumber === route);
    return routeData ? routeData.price : 'Unknown';
  };

  const handleRouteChange = (e) => {
    const route = e.target.value;
    setSelectedRoute(route);

    if (route) {
      setAmount(calculateAmount(route));
    } else {
      setAmount('');
    }
  };

  const handleFindBooking = (e) => {
    e.preventDefault();
    if (!bookingIDToSearch) {
      setManageErrorMessage('Booking ID is required.');
      return;
    }

    if (bookingDetails && bookingDetails.id === parseInt(bookingIDToSearch)) {
      setManageErrorMessage('');
    } else {
      setManageErrorMessage('Booking not found.');
    }
  };

  const handleBookingIDChange = (e) => {
    setBookingIDToSearch(e.target.value);
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'booking-qr-code.png';
      link.click();
    }
  };

  const generateQRCodeContent = (details) => {
    return `Booking ID: ${details.id}\nName: ${details.name}\nRoute: ${details.route}\nDate: ${details.date}\nArrival Time: ${details.arrivalTime}`;
  };

  return (
    <div className="mt-32" style={{ backgroundColor: 'white', color: '#1F2937' }}>
      <header className="py-6 shadow-md text-center bg-green-500 text-white">
        <h1 className="text-4xl font-bold mb-4">Bus Ticket Booking</h1>
        <div className="mt-4">
          <button
            onClick={() => handleViewChange('book')}
            className={`px-4 py-2 rounded-full border border-green-500 ${view === 'book' ? 'bg-white text-green-500' : 'bg-green-500 text-white'}`}
          >
            Book Ticket
          </button>
          <button
            onClick={() => handleViewChange('manage')}
            className={`ml-4 px-4 py-2 rounded-full border border-green-500 ${view === 'manage' ? 'bg-white text-green-500' : 'bg-green-500 text-white'}`}
          >
            Manage Booking
          </button>
        </div>
      </header>
      <main className="p-6">
        {view === 'book' && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mb-8">
            {paymentProcessing ? (
              <div className="flex items-center justify-center h-32">
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center">
                  <svg className="animate-spin h-6 w-6 mr-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 118 8 8 8 0 01-8-8z"></path>
                  </svg>
                  <p className="text-xl">Processing Payment...</p>
                </div>
              </div>
            ) : (
              <>
                {bookingDetails ? (
                  <>
                    <p className="text-green-600 text-3xl font-bold mb-4 text-center">Payment Successful!</p>
                    <p className="text-xl mb-4 text-center">Booking ID: <span className="font-semibold">{bookingDetails.id}</span></p>
                    <div className="flex justify-center mb-4">
                      <QRCode
                        value={generateQRCodeContent(bookingDetails)}
                        size={128}
                        className="mx-auto"
                      />
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={downloadQRCode}
                        className="px-4 py-2 bg-green-500 text-white rounded-md"
                      >
                        Download QR Code
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-center">Book Your Ticket</h2>
                    <form onSubmit={handleBookTicket}>
                      <label className="block mb-4">
                        Name:
                        <input type="text" name="name" placeholder="Enter Name" className="w-full border border-gray-300 p-2 rounded mt-2" required />
                      </label>
                      <label className="block mb-4">
                        Travel Date:
                        <input type="date" name="date" className="w-full border border-gray-300 p-2 rounded mt-2" required />
                      </label>
                      <label className="block mb-4">
                        UPI ID:
                        <input type="text" name="upi" placeholder="Enter UPI ID" className="w-full border border-gray-300 p-2 rounded mt-2" maxLength="20" required />
                      </label>
                      <label className="block mb-4">
                        Select Route:
                        <select value={selectedRoute} onChange={handleRouteChange} className="w-full border border-gray-300 p-2 rounded mt-2" required>
                          <option value="" disabled>Select Route</option>
                          {routeOptions.map((route) => (
                            <option key={route.routeNumber} value={route.routeNumber}>
                              {route.routeNumber} - {route.station} ({route.price} INR)
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="block mb-4">
                        <p className="font-semibold">Price: {amount} INR</p>
                      </div>
                      {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                      )}
                      <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                        Pay and Book
                      </button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        )}
        {view === 'manage' && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Manage Your Booking</h2>
            <form onSubmit={handleFindBooking}>
              <label className="block mb-4">
                Booking ID:
                <input
                  type="text"
                  placeholder="Enter Booking ID"
                  value={bookingIDToSearch}
                  onChange={handleBookingIDChange}
                  className="w-full border border-gray-300 p-2 rounded mt-2"
                />
              </label>
              {manageErrorMessage && (
                <p className="text-red-500 mb-4">{manageErrorMessage}</p>
              )}
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
                Find Booking
              </button>
            </form>
            {bookingDetails && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold">Booking Details:</h3>
                <p className="mt-2"><strong>Booking ID:</strong> {bookingDetails.id}</p>
                <p><strong>Name:</strong> {bookingDetails.name}</p>
                <p><strong>Route:</strong> {bookingDetails.route}</p>
                <p><strong>Date:</strong> {bookingDetails.date}</p>
                <p><strong>Arrival Time:</strong> {bookingDetails.arrivalTime}</p>
                <div className="flex justify-center mt-4">
                  <QRCode
                    value={generateQRCodeContent(bookingDetails)}
                    size={128}
                    className="mx-auto"
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={downloadQRCode}
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Download QR Code
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Booking;
