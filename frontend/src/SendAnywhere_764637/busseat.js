import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

let root = ReactDOM.createRoot(document.querySelector("div.main"));

const validBusIds = ['BUS123', 'BUS456', 'BUS789'];

const seatsData = [
  // Representing a simple bus layout: 4 seats per row, 5 rows
  { id: 1, isReserved: false }, { id: 2, isReserved: false },
  { id: 3, isReserved: false }, { id: 4, isReserved: false },
  { id: 5, isReserved: false }, { id: 6, isReserved: false },
  { id: 7, isReserved: false }, { id: 8, isReserved: false },
  { id: 9, isReserved: false }, { id: 10, isReserved: false },
  { id: 11, isReserved: false }, { id: 12, isReserved: false },
  { id: 13, isReserved: false }, { id: 14, isReserved: false },
  { id: 15, isReserved: false }, { id: 16, isReserved: false },
  { id: 17, isReserved: false }, { id: 18, isReserved: false },
  { id: 19, isReserved: false }, { id: 20, isReserved: false },
];

const App = () => {
  const [busId, setBusId] = useState('');
  const [isValidBus, setIsValidBus] = useState(true);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  const handleBusIdSubmit = () => {
    if (validBusIds.includes(busId)) {
      setSeats(seatsData); // Load seats for a valid bus
      setIsValidBus(true);
    } else {
      setIsValidBus(false);
    }
  };

  const handleSeatClick = (seatId) => {
    const seat = seats.find(seat => seat.id === seatId);
    if (seat && !seat.isReserved) {
      if (selectedSeat === seatId) {
        // Deselect the currently selected seat
        setSelectedSeat(null);
      } else {
        // Select a new seat
        setSelectedSeat(seatId);
      }
    }
  };

  const handleConfirm = () => {
    if (selectedSeat !== null) {
      setIsConfirming(true);
      setTimeout(() => {
        // Simulate booking confirmation
        setSeats(seats.map(seat =>
          seat.id === selectedSeat
            ? { ...seat, isReserved: true }
            : seat
        ));
        setIsConfirming(false);
        setIsBookingSuccess(true);
        setSelectedSeat(null);
      }, 2000); // Simulate network delay
    }
  };

  const handleCancel = () => {
    setSelectedSeat(null);
  };

  const allSeatsReserved = seats.every(seat => seat.isReserved);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      {isConfirming && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex flex-col items-center justify-center z-50">
          <div className="loader w-12 h-12 relative">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-700 rounded-full animate-loader"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-red-400 rounded-full animate-loader-jump"></div>
          </div>
          <p className="text-white mt-4">Confirming your seat...</p>
        </div>
      )}
      {!isConfirming && !seats.length ? (
        <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Enter Bus ID</h1>
          <input
            type="text"
            value={busId}
            onChange={(e) => setBusId(e.target.value)}
            placeholder="Enter Bus ID"
            className="w-full p-3 rounded bg-gray-700 text-white mb-4"
          />
          <button
            onClick={handleBusIdSubmit}
            className="w-full bg-indigo-600 p-3 rounded text-white hover:bg-indigo-700"
          >
            Submit
          </button>
          {!isValidBus && (
            <p className="text-red-500 text-center mt-4">Invalid Bus ID</p>
          )}
        </div>
      ) : isBookingSuccess ? (
        <div className="max-w-md w-full bg-green-600 p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Booking Successful</h1>
          <p className="text-center">Your seat has been successfully booked.</p>
          <button
            onClick={() => {
              setSeats([]);
              setBusId('');
              setIsValidBus(true);
              setIsBookingSuccess(false);
            }}
            className="w-full bg-blue-500 p-3 rounded text-white hover:bg-blue-600 mt-4"
          >
            Back to Main Page
          </button>
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          {allSeatsReserved ? (
            <div className="text-2xl font-bold text-red-500 text-center mb-6">All seats are reserved</div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-4 mb-6">
                {seats.map(seat => (
                  <div
                    key={seat.id}
                    className={`w-16 h-16 flex items-center justify-center cursor-pointer rounded-full transition-transform transform ${
                      seat.isReserved
                        ? 'bg-red-600'
                        : seat.id === selectedSeat
                        ? 'bg-green-500'
                        : 'bg-gray-700'
                    } hover:scale-105`}
                    onClick={() => handleSeatClick(seat.id)}
                    style={{ cursor: seat.isReserved ? 'not-allowed' : 'pointer' }}
                  >
                    {seat.id}
                  </div>
                ))}
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">Selected Seat:</h2>
                <p className="text-lg">{selectedSeat ? `Seat ${selectedSeat}` : "None"}</p>
                {selectedSeat !== null && (
                  <div className="mt-4 flex justify-center space-x-4">
                    <button
                      onClick={handleConfirm}
                      className="bg-blue-500 p-3 rounded text-white hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-red-500 p-3 rounded text-white hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

root.render(<App />);
