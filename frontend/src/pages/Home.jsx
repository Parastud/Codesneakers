import React, { useEffect } from 'react';
import { FaBus, FaCalendarAlt, FaCheckCircle, FaThumbsUp, FaMap, FaCalendarDay, FaUsers, FaClock, FaCity, FaMapMarkedAlt } from 'react-icons/fa';
import RouteDetails from '../components/RouteDetails'; // Ensure this import is correct
import TripPlanner from '../components/TripPlanner'; // Ensure this import is correct
import landingBus from '../assets/landingBus.png';
import { RiCompassDiscoverLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Set a timer to remove the token from localStorage after 30 seconds
        const timer = setTimeout(() => {
            localStorage.removeItem('token');
            navigate('/login'); // Redirect to the login page
        }, 3000000); // 30 seconds

        // Cleanup the timer if the component unmounts before the timer completes
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="h-auto bg-gray-900 text-white overflow-hidden flex flex-col gap-8">
            {}
            <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 p-4 lg:p-24 bg-gray-900 rounded-lg shadow-lg m-4 lg:m-10 h-auto mt-24 sm:p-8">
                <div className="w-full lg:w-4/6 text-center lg:text-left flex sm:flex-col max-sm:flex-col max-sm:p-4 justify-center items-center gap-8 ">
                    <h1 className="font-bold text-2xl max-sm:text-4xl sm:text-4xl sm:mt-12 max-sm:w-3/3 lg:text-4xl xl:text-5xl mb-4 max-sm:mt-8">
                        Your Satisfaction is Our Commitment to Excellence in Bus Services
                    </h1>
                    <p className="text-base sm:text-lg lg:text-[16px]xl:text-[18px] ">
                        Experience top-notch bus services designed for your convenience and reliability. Join us for a seamless travel experience with our advanced tools and support.
                    </p>
                </div>
                <div className="w-full lg:w-auto lg:mt-0">
                    <img
                        src={landingBus}
                        alt="Bus"
                        className="w-full max-w-xs sm:max-w-md h-auto rounded-lg shadow-md mx-auto lg:mx-0 mt-12"
                    />
                </div>
            </div>


            {}
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-10 m-4  w-3/4 mx-auto border-2 border-blue-400">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center">Ready to Experience Top-Quality Bus Services?</h2>
                <p className="text-base sm:text-lg mb-4 text-center">
                    Discover the convenience and reliability of our bus services today. Explore our routes, book your trip, and enjoy a smooth journey.
                </p>
                <div className="flex justify-center">
                    <a href="/services" className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md hover:bg-green-700 transition duration-150">
                        Explore Our Services
                    </a>
                </div>
            </div>

            {}
            <div className="p-6 sm:p-6 lg:p-10 space-y-8 sm:space-y-12">
                {}
                <div className="bg-gray-900 shadow-lg p-4  sm:p-6 relative border-b border-gray-600 ">
                    <div className='flex flex-wrap gap-4 items-center max-sm:flex-col max-sm:justify-center'>
                        <RiCompassDiscoverLine
                            className='text-orange-400 text-5xl sm:text-6xl'
                            style={{ textShadow: '0px 0px 10px rgba(223, 223, 223, 0.6)' }}
                        />
                        <h2
                            className="text-2xl sm:text-4xl font-bold"
                            style={{ textShadow: '0px 0px 4px rgba(252, 173, 3, 0.6)' }}
                        >
                            Discover Our Bus Routes
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-800 p-4 border-blue-900 border-2 rounded-lg">
                            <FaMapMarkedAlt className="text-blue-600 text-2xl mb-2" />
                            <p className="text-sm sm:text-base">
                                Extensive Network: Easy and efficient travel with comprehensive route information.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-4 border-blue-900 border-2 rounded-lg">
                            <FaCity className="text-green-600 text-2xl mb-2" />
                            <p className="text-sm sm:text-base">
                                City to Outskirts: Reach every corner, from bustling streets to serene outskirts.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-4 border-blue-900 border-2 rounded-lg">
                            <FaClock className="text-yellow-400 text-2xl mb-2" />
                            <p className="text-sm sm:text-base">
                                Real-Time Updates: Stay informed about changes and delays for confident planning.
                            </p>
                        </div>

                        <div className="bg-gray-800 p-4 border-blue-900 border-2 rounded-lg">
                            <FaUsers className="text-pink-400 text-2xl mb-2" />
                            <p className="text-sm sm:text-base">
                                Trusted by Thousands: Join passengers who enjoy seamless and enjoyable journeys.
                            </p>
                        </div>
                    </div>

                    <RouteDetails />
                </div>



                {}
                <div className="p-4 sm:p-6 lg:p-10 bg-gray-800  rounded-lg shadow-lg m-4 lg:m-10 bg-gradient-to-r from-slate-900 via-slate-800 to-gray-900">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="flex items-start space-x-4">
                            <FaBus className="text-green-500 text-3xl sm:text-4xl" />
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold">Reliable Transport</h3>
                                <p className="text-base sm:text-lg">Our buses are always on time, ensuring you reach your destination without delay.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <FaCalendarAlt className="text-blue-500 text-3xl sm:text-4xl" />
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold">Flexible Scheduling</h3>
                                <p className="text-base sm:text-lg">Choose from a variety of schedules that fit your needs, whether it's for daily commutes or special trips.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <FaCheckCircle className="text-yellow-500 text-3xl sm:text-4xl" />
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold">Easy Booking</h3>
                                <p className="text-base sm:text-lg">Book your rides quickly and easily through our user-friendly platform.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <FaThumbsUp className="text-red-500 text-3xl sm:text-4xl" />
                            <div>
                                <h3 className="text-lg sm:text-xl font-semibold">Customer Satisfaction</h3>
                                <p className="text-base sm:text-lg">We prioritize your satisfaction with excellent service and support.</p>
                            </div>
                        </div>
                    </div>
                </div>

            {}
        <div className="bg-gray-900 rounded-lg shadow-lg p-4 max-sm:p-4 sm:p-12 relative">
            <div className='flex gap-8 max-sm:justify-center items-center mb-8'>
            <FaCalendarDay className="text-blue-500 text-5xl sm:text-6xl" />
          <h2 className="text-2xl sm:text-3xl  font-bold mb-2 sm:mb-4">Plan Your Trip with Ease</h2>
          </div>
          <p className="text-base sm:text-lg mb-2 max-sm:text-center sm:mb-4">
            Use our TripPlanner component to customize your travel plans. Whether you're planning a daily commute or a special journey, our tool provides you with the best routes and schedules tailored to your needs.
          </p>
          <TripPlanner />
        </div>

                {}
            
            </div>
        </div>
    );
};

export default HomePage;