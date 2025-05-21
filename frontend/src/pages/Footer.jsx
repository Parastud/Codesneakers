import React from 'react';
import { NavLink } from 'react-router-dom';
import routelogo from '../assets/routePulseLogo.png';

function Footer() {
  return (
    <footer className="bg-[#001d3d] text-white py-10 px-20">
      <h2 className="text-3xl font-bold mb-4 text-center mb-8">Navigate Our Website Easily</h2>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        
        {}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <img src={routelogo} alt="Company Logo" className="w-14 h-12" />
            <h1 className="text-2xl font-bold">Route Pulse</h1>
          </div>
          <p>
            Molestie ad feugiat est facilisis faucibus magnis. Convallis magna
            pellentesque odio fusce turpis elit.
          </p>
          <a href="tel:888-7007-235" className="inline-block bg-yellow-500 text-black py-2 px-4 rounded-lg font-bold">
            <i className="fas fa-phone-alt"></i> 888-7007-235
          </a>
        </div>

        {}
        <div className="space-y-2">
          <h2 className="font-bold text-lg">Company</h2>
          <ul className="space-y-2">
            <li><NavLink to="/about" className="hover:underline">About Us</NavLink></li>
            <li><NavLink to="/careers" className="hover:underline">Careers</NavLink></li>
            <li><NavLink to="/blogs" className="hover:underline">Blogs</NavLink></li>
            <li><NavLink to="/passengerFeedback" className="hover:underline">Passenger Feedback</NavLink></li>
            <li><NavLink to="/contact" className="hover:underline">Contact Us</NavLink></li>
          </ul>
        </div>

        {}
        <div className="space-y-2">
          <h2 className="font-bold text-lg">Services</h2>
          <ul className="space-y-2">
            <li><NavLink to="/safety-guarantee" className="hover:underline">Safety Guarantee</NavLink></li>
            <li><NavLink to="/services" className="hover:underline">Schedule on Time</NavLink></li>
            <li><NavLink to="/booking" className="hover:underline">Online Booking</NavLink></li>
            <li><NavLink to="/professional-staff" className="hover:underline">Professional Staff</NavLink></li>
            <li><NavLink to="/faq" className="hover:underline">FAQ & Support</NavLink></li>
          </ul>
        </div>

        {}
        <div className="space-y-4">
          <h2 className="font-bold text-lg">Get In Touch</h2>
          <p>Chandani Chowk No 22 Jarkata - Delhi</p>
          <p>Email: <a href="mailto:support@yourmail.tld" className="hover:underline">support@yourmail.tld</a></p>
          <p>Phone: <a href="tel:+6221.2002.2012" className="hover:underline">+6221.2002.2012</a></p>
          <div className="flex space-x-4">
            <a href="#" className="text-yellow-500 hover:text-yellow-300"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-yellow-500 hover:text-yellow-300"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-yellow-500 hover:text-yellow-300"><i className="fab fa-tripadvisor"></i></a>
            <a href="#" className="text-yellow-500 hover:text-yellow-300"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-yellow-500 hover:text-yellow-300"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        <p>Copyright © {new Date().getFullYear()} Bigtranz. All rights reserved. Powered by MoxCreative.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <NavLink to="/terms-of-use" className="hover:underline">Terms of Use</NavLink>
          <NavLink to="/privacy-policy" className="hover:underline">Privacy Policy</NavLink>
          <NavLink to="/cookie-policy" className="hover:underline">Cookie Policy</NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
