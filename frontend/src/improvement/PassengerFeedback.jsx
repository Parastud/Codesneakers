import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom/client";
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const stripePromise = loadStripe('your-publishable-key-here');

const PassengerFeedback = () => {
  const drivers = [
    {
      id: 1,
      name: "Ravi Sharma",
      image: "https://images.unsplash.com/photo-1697305590548-aed8694fc05b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZHJpdmVyfGVufDB8fDB8fHww",
      rating: 1,
      feedback: ""
    },
    {
      id: 2,
      name: "Arjun Patel",
      image: "https://images.unsplash.com/photo-1514715108901-799fba33c94e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fG9sZCUyMG1lUyI2E3Lg2bEX0w",
      rating: 1,
      feedback: ""
    },
    {
      id: 3,
      name: "Suresh Gupta",
      image: "https://images.unsplash.com/photo-1534419343464-f824f3ce74f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA5fHxpbmRpYW4lMjBkcml2ZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 1,
      feedback: ""
    },
    {
      id: 4,
      name: "Amit Singh",
      image: "https://images.unsplash.com/photo-1553527430-8635bd98656e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjI4fHxpbmRpYW4lMjBkcml2ZXJ8ZW58MHx8MHx8fDA%3D",
      rating: 1,
      feedback: ""
    },
    {
      id: 5,
      name: "Vikram Joshi",
      image: "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fG9sZCUyMG1lbiUyMGltYWdlcyUyMHZpbGFnZXxlbnwwfHwwfHx8MA%3D%3D",
      rating: 1,
      feedback: ""
    }
  ];

  const [feedbacks, setFeedbacks] = useState(drivers);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [upiNumber, setUpiNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // New state
  const navigate = useNavigate();

  useEffect(() => {
    if (paymentProcessing) {
      const timer = setTimeout(() => {
        setPaymentProcessing(false);
        setShowCheckmark(true);
        setShowSuccessMessage(true); 
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [paymentProcessing]);

  const handleRating = (id, newRating) => {
    setFeedbacks(
      feedbacks.map((driver) =>
        driver.id === id ? { ...driver, rating: newRating } : driver
      )
    );
    setSelectedDriverId(id); // Show textarea for this driver
  };

  const handleFeedbackChange = (id, feedback) => {
    setFeedbacks(
      feedbacks.map((driver) =>
        driver.id === id ? { ...driver, feedback } : driver
      )
    );
  };

  const handleBid = (driver) => {
    setSelectedDriver(driver);
    setShowPaymentModal(true);
  };

  const handlePaymentModalConfirm = () => {
    if (upiNumber.length > 20) {
      alert('UPI number cannot exceed 20 characters.');
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    setPaymentProcessing(true);
  };

  const handlePaymentModalCancel = () => {
    setShowPaymentModal(false);
    setUpiNumber('');
    setAmount('');
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false); // Hide the success message
    navigate('/passengerFeedback'); // Navigate to driving page
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#1F2937] flex items-center justify-center">
      <div className="container max-w-lg mx-auto p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Driver Rating</h1>
        <div className="grid grid-cols-1 gap-4">
          {feedbacks.map((driver) => (
            <div key={driver.id} className="bg-gray-700 rounded-lg p-4 shadow-md">
              <div className="flex items-center">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-[100px] h-[100px] rounded-full mr-3 object-cover bg-white-600"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-200">{driver.name}</h2>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        onClick={() => handleRating(driver.id, index + 1)}
                        className={`w-5 h-5 cursor-pointer transition-all duration-200 ${index < driver.rating ? "text-yellow-400" : "text-gray-500"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.914c.969 0 1.372 1.24.588 1.81l-3.973 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.539 1.118l-3.973-2.89a1 1 0 00-1.175 0l-3.973 2.89c-.784.57-1.839-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.978 10.1c-.784-.57-.381-1.81.588-1.81h4.914a1 1 0 00.95-.69l1.518-4.674z" />
                      </svg>
                    ))}
                  </div>
                  {selectedDriverId === driver.id && (
                    <textarea
                      className="w-full mt-4 p-2 border border-gray-300 rounded-lg"
                      rows="3"
                      placeholder="Leave your feedback here..."
                      value={driver.feedback}
                      onChange={(e) => handleFeedbackChange(driver.id, e.target.value)}
                    />
                  )}
                </div>
              </div>
              <button
                onClick={() => handleBid(driver)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Bid Now
              </button>
            </div>
          ))}
        </div>
        {showPaymentModal && selectedDriver && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              {paymentProcessing ? (
                <div className="text-center">
                  <h2 className="text-xl font-bold mb-4">Processing...</h2>
                  <p>Please wait while we process your payment.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4">Enter Payment Details</h2>
                  <input
                    type="text"
                    value={upiNumber}
                    onChange={(e) => setUpiNumber(e.target.value)}
                    placeholder="UPI Number"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    maxLength="20"
                  />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    min="1"
                  />
                  <div className="flex justify-between">
                    <button
                      onClick={handlePaymentModalConfirm}
                      className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={handlePaymentModalCancel}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
              {showCheckmark && (
                <div className="flex justify-center mt-4">
                  <svg
                    className="w-12 h-12 text-green-500 animate-checkmark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              {showSuccessMessage && !paymentProcessing && (
                <div className="text-center text-green-600 mt-4 relative">
                  <h2 className="text-xl font-bold">Transaction Successful!</h2>
                  <button
                    onClick={handleCloseSuccessMessage} // This function will navigate to the home page
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                  >
                    Back to Page
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default PassengerFeedback;





