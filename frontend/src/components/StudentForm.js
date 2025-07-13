import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    reason: '',
    fromDate: '',
    toDate: '',
  });

  const [myLeaves, setMyLeaves] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const fetchMyLeaves = async (rollNo) => {
    try {
      const res = await axios.get('http://localhost:5000/api/leaves');
      const filtered = res.data.filter(l => l.rollNo === rollNo);
      setMyLeaves(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/leaves', formData);
      alert('Leave Applied');
      fetchMyLeaves(formData.rollNo); // refresh
      setFormData({ name: '', rollNo: '', reason: '', fromDate: '', toDate: '' });
    } catch (err) {
      console.error(err);
      alert('Error submitting leave');
    }
  };

  useEffect(() => {
    if (formData.rollNo) fetchMyLeaves(formData.rollNo);
  }, [formData.rollNo]);

  return (
    <div>
      <h2>Apply for Leave (Student)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleChange} required />
        <input type="text" name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
        <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
        <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>

      <h3>My Leave Requests</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Reason</th><th>From</th><th>To</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {myLeaves.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.reason}</td>
              <td>{leave.fromDate?.slice(0, 10)}</td>
              <td>{leave.toDate?.slice(0, 10)}</td>
              <td>{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentForm;