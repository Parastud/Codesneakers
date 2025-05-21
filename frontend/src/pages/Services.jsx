import React from 'react';
import { FaClock, FaMap, FaStar, FaLightbulb, FaPhone, FaBus } from 'react-icons/fa';
import RouteDetails from '../components/RouteDetails';
import BusSchedule from '../components/BusSchedule';
import TrackBus from '../components/TrackBus';
import ETA from '../components/ETA';
import SearchBusStop from '../components/SearchBusStop';
import TripPlanner from '../components/TripPlanner';

const Services = () => {
  return (
    <div className="p-6 bg-gray-900 space-y-12">
      {/* Bus Schedule Component */}
      <RouteDetails />

      {/* Motivational Section with Images */}
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 relative overflow-hidden">
        <h2 className="text-3xl font-bold rounded-xl text-center w-1/3 m-auto p-4">
          Why Choose Our Services?
        </h2>

        <p className="text-lg mb-12 mt-4 text-center w-2/3 m-auto">
          Experience unparalleled convenience and efficiency with our bus services. Whether you're commuting daily or planning a special trip, our comprehensive tools and reliable schedules ensure a seamless journey.
        </p>

        <div className="flex flex-wrap justify-center gap-12">
          <div className="relative w-[400px] h-[300px] cursor-pointer hover:scale-105 transition-transform duration-500">
            <img
              src="https://transform.octanecdn.com/cdn/https://octanecdn.com/reidhealthorg/reidhealthorg_221694665.jpg"
              alt="Convenient Scheduling"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 p-2 text-2xl border-[1px] border-orange-400 rounded-lg">
              Convenient Scheduling
            </p>
          </div>

          <div className="relative w-[400px] h-[300px] cursor-pointer hover:scale-105 transition-transform duration-500">
            <img
              src="https://www.locate2u.com/wp-content/uploads/2023/05/A-1-29.webp"
              alt="Real-time Tracking"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 p-2 text-2xl border-[1px] border-orange-400 rounded-lg">
              Real-time Tracking
            </p>
          </div>

          <div className="relative w-[400px] h-[300px] cursor-pointer hover:scale-105 transition-transform duration-500">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRle_hvyIPc6AzlU7TCE5FKSJUcECaoChtfU0N4TwloRVtxrJt17ShI1W7EqsZ-42AgNDA&usqp=CAU"
              alt="Reliable Service"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 p-2 text-2xl border-[1px] border-orange-400 rounded-lg">
              Reliable Service
            </p>
          </div>

          <div className="relative w-[400px] h-[300px] cursor-pointer hover:scale-105 transition-transform duration-500">
            <img
              src="https://cdn-ecfmp.nitrocdn.com/eKSHMcFnhLzJYEGkCjZGYQYZkFApplfz/assets/images/optimized/rev-4adc157/www.smallbusinesscoach.org/wp-content/uploads/2022/06/1-1.png"
              alt="Easy Planning"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 p-2 text-2xl border-[1px] border-orange-400 rounded-lg">
              Easy Planning
            </p>
          </div>

          <div className="relative w-[400px] h-[300px] cursor-pointer hover:scale-105 transition-transform duration-500">
            <img
              src="https://www.bolton-menk.com/wp-content/uploads/2022/10/HowWe.jpg"
              alt="Comprehensive Routes"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
            <p className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 p-2 text-2xl border-[1px] border-orange-400 rounded-lg">
              Comprehensive Routes
            </p>
          </div>
        </div>
      </div>


      {/* Route Details Component */}
      <BusSchedule />

      {/* Additional Content Section */}
      <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <FaClock className="text-green-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Timely Updates</h3>
              <p className="text-lg">
                Stay informed with real-time updates on bus schedules and arrivals. We ensure you’re always on time.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaMap className="text-blue-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Interactive Maps</h3>
              <p className="text-lg">
                Easily navigate with our interactive maps that show bus routes, stops, and your current location.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaStar className="text-yellow-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Top-rated Service</h3>
              <p className="text-lg">
                Join thousands of satisfied customers who rate our service highly for reliability and convenience.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaLightbulb className="text-orange-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">Innovative Solutions</h3>
              <p className="text-lg">
                We continually innovate to improve your travel experience with cutting-edge technology.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhone className="text-red-500 text-4xl" />
            <div>
              <h3 className="text-xl font-semibold">24/7 Support</h3>
              <p className="text-lg">
                Our customer support is available around the clock to assist you with any questions or issues.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Track Bus Component */}
      <TrackBus />

      {/* ETA Component */}
      <ETA />

      {/* Search Bus Stop Component */}
      <SearchBusStop />

      {/* Trip Planner Component */}
      <TripPlanner />
    </div>
  );
};

export default Services;