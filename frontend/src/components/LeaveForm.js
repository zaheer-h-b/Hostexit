import React, { useState } from 'react';
import axios from 'axios';

const LeaveForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    reason: '',
    fromDate: '',
    toDate: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/leaves', formData);
      alert('Leave Applied!');
      setFormData({ name: '', rollNo: '', reason: '', fromDate: '', toDate: '' });
    } catch (err) {
      alert('Error applying leave');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Apply for Leave</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input type="text" name="rollNo" placeholder="Roll Number" value={formData.rollNo} onChange={handleChange} required />
      <input type="text" name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
      <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
      <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LeaveForm;
