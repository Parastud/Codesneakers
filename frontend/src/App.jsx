import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { BusSchedule, ETA, RouteDetails, SearchBusStop, TrackBus, TripPlanner } from './components';
import { AdminDashboard, AdminLogin, CrewLogin, ForgotPassword, Login } from './loginSystem';
import { About, Booking, BlogDetails, Blogs, Contact, Footer, Home, Layout, Navbar, Services } from './pages';
import { FAQ, PassengerFeedback } from './improvement';
import CrewDashboard from './loginSystem/CrewDashboard';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Login and Signup without Navbar and Footer */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/adminDashboard" element={<AdminDashboard />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/crew" element={<CrewLogin />} />
        <Route path="/crew/crewDashboard" element={<CrewDashboard />} />


        {/* Route for pages with Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />  
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/booking" element={<ProtectedRoute element={<Booking />} />} />
          <Route path="/passengerFeedback" element={<PassengerFeedback/>} />
          <Route path="/faq" element={<FAQ/>} />

        <Route path="/blog/:id" element={<BlogDetails />} />

        </Route>

        {/* Redirect to login initially */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
