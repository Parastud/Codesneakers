import React from 'react';
import aman from '../assets/aman.jpg';
import satyam from '../assets/satyam.jpg';   
import krish from '../assets/krish.jpeg';   
import dhvani from '../assets/dhvani.jpg';   
import parth from '../assets/parth.jpg';   
import vikash from '../assets/vikash.jpg';   

const teamMembers = [
  {
    name: "Krish Bharadwaj",
    role: "Frontend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: krish, 
  },
  {
    name: "Vikas Shakya",
    role: "Frontend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: vikash, 
  },
  {
    name: "Aman Gupta",
    role: "Backend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: aman, 
  },
  {
    name: "Satyam Yadav",
    role: "Backend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: satyam, 
  },
  {
    name: "Parth Sharma",
    role: "Full Stack Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: parth, 
  },
  {
    name: "Dhvani Khandelwal",
    role: "Full Stack Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: dhvani, 
  },
];

const About = () => {
  return (
    <div className="bg-[#1F2937] py-8 sm:py-16 px-12 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="font-semibold text-[#FBBF24] tracking-wide uppercase text-2xl sm:text-4xl">
          Our Team
        </h2>
        <p className="mt-2 text-lg sm:text-xl leading-7 text-white">
          Meet the Developers
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div 
            key={member.name} 
            className="bg-[#374151] shadow-lg rounded-lg p-6 transition transform hover:-translate-y-2 hover:shadow-2xl hover:bg-[#4B5563] hover:cursor-pointer hover:shadow-[0_0_20px_10px_rgba(251,191,36,0.5)]"
          >
            <img
              className="h-32 w-32 rounded-full mx-auto border-2 border-[#FBBF24] object-cover"
              src={member.image}
              alt={member.name}
            />
            <div className="text-center mt-4">
              <h3 className="text-lg sm:text-xl leading-6 font-bold text-white">
                {member.name}
              </h3>
              <p className="mt-2 text-sm sm:text-md text-[#FBBF24] uppercase tracking-widest">
                {member.role}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-gray-300">
                {member.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
