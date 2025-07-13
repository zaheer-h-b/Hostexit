import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get('https://hostexit.onrender.com/api/leaves');
      setLeaves(res.data);
    } catch (err) {
      console.error('Failed to fetch leaves:', err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/leaves/${id}`, { status: newStatus });
      fetchLeaves(); 
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  return (
    <div>
      <h2>All Leave Requests</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Reason</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.name}</td>
              <td>{leave.rollNo}</td>
              <td>{leave.reason}</td>
              <td>{leave.fromDate?.slice(0, 10)}</td>
              <td>{leave.toDate?.slice(0, 10)}</td>
              <td>{leave.status}</td>
              <td>
                {leave.status === 'Pending' && (
                  <>
                    <button onClick={() => handleStatusChange(leave._id, 'Approved')}>Approve</button>
                    <button onClick={() => handleStatusChange(leave._id, 'Rejected')}>Reject</button>
                  </>
                )}
                {leave.status !== 'Pending' && <span>✔</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
