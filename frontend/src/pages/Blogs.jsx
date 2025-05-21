import React, { useState } from 'react';
import { AiOutlineClockCircle, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom'; 

const Blogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: 'Efficient Route Planning',
      content: 'Bus route management software plays a crucial role in optimizing routes to ensure minimal fuel consumption and reduced travel time. This blog explores strategies to achieve efficient route planning, including data analysis, real-time traffic monitoring, and the use of AI algorithms.',
      author: 'Vikas Sharma',
      date: 'August 27, 2024',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fG1lbiUyMHRha2luZyUyMHNlbGZpZXxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 2,
      title: 'Real-time Tracking',
      content: 'Real-time tracking is an essential feature of modern bus route management systems. This post discusses the importance of GPS tracking, how it improves passenger experience, and the technology behind real-time bus tracking.',
      author: 'Vikas Sharma',
      date: 'August 26, 2024',
      image: 'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbiUyMHRha2luZyUyMHNlbGZpZXxlbnwwfHwwfHx8MA%3D%3D',
    },
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <header className="mb-8">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Bus Route Management Blogs</h1>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      <main className="container mx-auto grid gap-8">
        {filteredPosts.slice(0, 5).map(post => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-[160px] h-[160px] mb-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <AiOutlineUser className="mr-2" />
              <p>{post.author}</p>
              <AiOutlineClockCircle className="ml-4 mr-2" />
              <p>{post.date}</p>
            </div>
            <Link to={`/blog/${post.id}`} className="text-blue-600 hover:underline">Read More</Link>
          </article>
        ))}
        {filteredPosts.length === 0 && <p className="text-xl text-gray-500">No posts found.</p>}
      </main>

      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2024 Bus Route Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Blogs;
