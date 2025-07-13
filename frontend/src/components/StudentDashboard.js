import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));
    if (!storedStudent) {
      alert('Please login again');
      navigate('/student-login');
    } else {
      setStudent(storedStudent);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get('https://hostexit.onrender.com/api/leaves');
        const studentLeaves = res.data.filter((l) => l.rollNo === student?.rollNo);
        setLeaves(studentLeaves);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };

    if (student) {
      fetchLeaves();
    }
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/');
  };

  if (!student) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">Welcome, {student.name}</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Logout
          </button>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/student/apply-leave')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Apply Leave
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">My Leave Requests</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border px-4 py-2">Reason</th>
                  <th className="border px-4 py-2">From</th>
                  <th className="border px-4 py-2">To</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length > 0 ? (
                  leaves.map((leave) => (
                    <tr key={leave._id} className="text-gray-700 hover:bg-gray-50 transition">
                      <td className="border px-4 py-2">{leave.reason}</td>
                      <td className="border px-4 py-2">{leave.fromDate.slice(0, 10)}</td>
                      <td className="border px-4 py-2">{leave.toDate.slice(0, 10)}</td>
                      <td className="border px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            leave.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : leave.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 py-6">
                      No leave requests yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
