import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';

const teamMembers = [
  {
    name: "Krish Bharadwaj",
    role: "Frontend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1702733757515-24c762dc02aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1hbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D", 
  },
  {
    name: "Vikas Shakya",
    role: "Frontend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://i.im.ge/2024/08/27/ftf7bh.vikas.jpeg", 
  },
  {
    name: "Aman Gupta",
    role: "Backend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://i.im.ge/2024/08/27/ftfSmK.aman.jpeg", 
  },
  {
    name: "Satyam Yadav",
    role: "Backend Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1587837073080-448bc6a2329b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fG1hbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D", 
  },
  {
    name: "Parth Sharma",
    role: "Full Stack Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1694556957940-b92587150db7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTR8fG1hbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D", 
  },
  {
    name: "Dhavni Khandeal",
    role: "Full Stack Developer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://images.unsplash.com/photo-1668570000995-41591a9ecbfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fG1hbiUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D", 
  },
];

const About = () => {
  return (
    <div className="bg-[#1F2937] py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
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
