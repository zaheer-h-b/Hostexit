import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelect = () => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(null);

  const handleClick = (role) => {
    setClicked(role);
    setTimeout(() => {
      navigate(role === 'admin' ? '/admin' : '/student-login');
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-100 to-blue-300">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-10">Leave Management System</h1>

      <div className="flex flex-col gap-6 w-48">
        <button
          onClick={() => handleClick('admin')}
          className={`bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition-all duration-300 transform ${
            clicked === 'admin' ? 'scale-90 translate-y-1' : 'hover:scale-105 hover:shadow-xl'
          }`}
        >
          Admin
        </button>

        <button
          onClick={() => handleClick('student')}
          className={`bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition-all duration-300 transform ${
            clicked === 'student' ? 'scale-90 translate-y-1' : 'hover:scale-105 hover:shadow-xl'
          }`}
        >
          Student
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
