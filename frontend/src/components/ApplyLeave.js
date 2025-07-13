import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ApplyLeave = () => {
  const [form, setForm] = useState({
    reason: '',
    fromDate: '',
    toDate: '',
  });

  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem('student'));
    if (!storedStudent) {
      toast.error('Please login again');
      navigate('/student-login');
    } else {
      setStudent(storedStudent);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/leaves', {
        ...form,
        name: student.name,
        rollNo: student.rollNo,
      });
      toast.success('Leave request submitted successfully! 🎉');
      navigate('/student/dashboard');
    } catch (error) {
      toast.error('Error submitting leave request. ');
    }
  };

  if (!student) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-6">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Apply for Leave</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Reason</label>
            <input
              type="text"
              placeholder="Enter reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">From Date</label>
            <input
              type="date"
              value={form.fromDate}
              onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">To Date</label>
            <input
              type="date"
              value={form.toDate}
              onChange={(e) => setForm({ ...form, toDate: e.target.value })}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Leave
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/student/dashboard')}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
