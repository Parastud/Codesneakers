import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    
    setSuccess('Your response has been recorded.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {}
      <header className="bg-gray-900 py-32 mt-12 text-center">
        <h1 className="text-4xl font-bold">Get in Touch</h1>
        <p className="mt-2 text-lg">We'd love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>
      </header>
      
      <main className="flex flex-col items-center  px-4">
        <div className="max-w-xl w-full bg-white bg-opacity-10 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-center text-white mb-6 hover:text-indigo-300">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-100">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md bg-transparent text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-100">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md bg-transparent text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-100">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-md bg-transparent text-white"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Message
                  </button>
                </div>
                {error && (
                  <div className="text-red-600 mt-4">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in-down">
                    <span className="block sm:inline"> {success}</span>
                    <span
                      className="absolute top-0 bottom-0 right-0 px-4 py-3"
                      onClick={() => setSuccess('')}
                    >
                      <svg
                        className="fill-current h-6 w-6 text-green-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <title>Close</title>
                        <path d="M14.348 5.652a.5.5 0 00-.706 0L10 9.293 6.354 5.646a.5.5 0 10-.707.707L9.293 10l-3.646 3.646a.5.5 0 00.707.707L10 10.707l3.646 3.646a.5.5 0 00.707-.707L10.707 10l3.646-3.646a.5.5 0 000-.707z" />
                      </svg>
                    </span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        
        {}
        <section className="mt-12 max-w-4xl w-full px-4">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Our Address</h3>
            <p>1234 Elm Street, Suite 567, Cityville, ST 12345</p>
            <p className="mt-2">Phone: (123) 456-7890</p>
            <p>Email: <a href="mailto:info@example.com" className="text-indigo-300">info@example.com</a></p>
          </div>

          {}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Find Us On The Map</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13938738.470443238!2d77.06153890602743!3d28.613939676911415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f1f11d41c29%3A0x84ae8a825d8b5299!2sDelhi%2C%20India!5e0!3m2!1sen!2sus!4v1634072632621!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
        
        {}
        <section className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Connect With Us</h3>
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800" aria-label="Facebook">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3v2H9c-1.1 0-2 .9-2 2v2H4v4h3v10h4V9h3.7l.3-4H11z"/>
              </svg>
            </a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.2.9 4.6 4.6 0 002-2.5c-1.8 1.1-3.8 1.9-5.9 2.3-1.7-1.8-4.3-1.8-6-1-1.7 1.7-1.9 4.3-1.2 6.4-5.2-.3-9.7-2.7-12.8-6.4-1.7 2.8-.9 6.3 1.8 8.2a4.5 4.5 0 01-2.1-.6v.1a4.7 4.7 0 003.7 4.7c-1 .3-2.1.3-3.1.1a4.7 4.7 0 004.4 3.3c-2.5 2-5.5 3.2-8.9 3.2-.6 0-1.2 0-1.8-.1 3.4 2.2 7.4 3.5 11.5 3.5 13.8 0 21.3-11.4 21.3-21.3v-.9a15.1 15.1 0 003.8-3.8z"/>
              </svg>
            </a>
            <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800" aria-label="Instagram">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2a9.8 9.8 0 110 19.6 9.8 9.8 0 010-19.6zm0-1.2c5.9 0 10.7 4.8 10.7 10.7S17.9 22.4 12 22.4 1.3 17.6 1.3 11.7 6.1 1 12 1zm0 4.6c-1.8 0-3.2 1.5-3.2 3.3s1.5 3.2 3.2 3.2 3.3-1.5 3.3-3.2S13.8 5.8 12 5.8zm6.2 1.2a1.2 1.2 0 01-1.2-1.2 1.2 1.2 0 011.2-1.2 1.2 1.2 0 011.2 1.2 1.2 1.2 0 01-1.2 1.2z"/>
              </svg>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
