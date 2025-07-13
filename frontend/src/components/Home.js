import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 transition-all duration-700 ease-in-out">
      <h1 className="text-3xl font-bold mb-10">Leave Management System</h1>

      <div className="flex flex-col space-y-6 w-60">
        <button
          onClick={() => navigate('/admin')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transform transition duration-300 hover:scale-105"
        >
          Admin
        </button>

        <button
          onClick={() => navigate('/student-login')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transform transition duration-300 hover:scale-105"
        >
          Student
        </button>
      </div>
    </div>
  );
};

export default Home;
