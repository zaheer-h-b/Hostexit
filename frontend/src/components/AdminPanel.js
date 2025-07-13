import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminPanel = () => {
  const [leaves, setLeaves] = useState([]);
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/leaves');
      setLeaves(res.data);
    } catch (err) {
      console.error('Error fetching leaves:', err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/${id}`, { status });
      fetchLeaves();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin'); 
    navigate('/');
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-8 transition-all duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Logout
        </button>
      </div>

     
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={() => navigate('/admin/register-student')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Register New Student
        </button>
        <button
          onClick={() => navigate('/admin/students')}
          className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Registered Students
        </button>
      </div>

   
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Leave Requests</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave._id} className="border-t hover:bg-gray-50 transition">
                    <td className="px-4 py-2">{leave.name}</td>
                    <td className="px-4 py-2">{leave.rollNo}</td>
                    <td className="px-4 py-2">{leave.reason}</td>
                    <td className="px-4 py-2">{leave.fromDate.slice(0, 10)}</td>
                    <td className="px-4 py-2">{leave.toDate.slice(0, 10)}</td>
                    <td className="px-4 py-2 font-medium text-blue-600">{leave.status}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleUpdateStatus(leave._id, 'Approved')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(leave._id, 'Rejected')}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
