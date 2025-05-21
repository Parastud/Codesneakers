import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { id } = useParams();
  
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

  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="w-[400px] h-[300px] mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <p className="text-gray-600 mb-4">{post.content}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <AiOutlineUser className="mr-2" />
          <p>{post.author}</p>
          <AiOutlineClockCircle className="ml-4 mr-2" />
          <p>{post.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
