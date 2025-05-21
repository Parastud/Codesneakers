import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

let root = ReactDOM.createRoot(document.querySelector("div.main"));

const App = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Delhi Transport?",
      answer: "Delhi Transport is a comprehensive public transportation system serving the Delhi metropolitan area."
    },
    {
      question: "How can I find the nearest bus stop?",
      answer: "You can use our mobile app to find the nearest bus stop based on your location."
    },
    {
      question: "What are the operating hours?",
      answer: "Our buses operate from 5 AM to 11 PM daily."
    },
    {
      question: "How do I get a bus pass?",
      answer: "Bus passes can be purchased online or at any authorized bus pass center."
    },
    {
      question: "What should I do if I lose something on the bus?",
      answer: "Please contact our customer service for lost and found inquiries."
    },
    {
      question: "Are there any discounts available?",
      answer: "We offer discounts for senior citizens and students. Check our website for more details."
    }
  ];

  const toggleAnswer = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Delhi Transport - FAQ</h1>
        <p className="text-lg text-gray-400">Find answers to the most common questions about our services.</p>
      </header>
      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
          >
            <button
              className="w-full flex items-center justify-between p-4 text-left text-xl font-semibold bg-gray-700 rounded-t-lg focus:outline-none relative"
              onClick={() => toggleAnswer(index)}
            >
              <span>{faq.question}</span>
              <span className="ml-2 text-gray-300 transition-transform transform duration-300">
                {openIndex === index ? (
                  <i className="fas fa-chevron-up"></i>
                ) : (
                  <i className="fas fa-chevron-down"></i>
                )}
              </span>
              <span className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}>
                <i className={`fas ${openIndex === index ? 'fa-minus-circle' : 'fa-plus-circle'}`}></i>
              </span>
            </button>
            <div
              className={`p-4 text-gray-300 transition-max-height duration-500 ease-in-out overflow-hidden ${
                openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


root.render(<App />);
