const Leave = require('../models/Leave');


const applyLeave = async (req, res) => {
  try {
    const newLeave = new Leave(req.body);
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateLeaveStatus = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = req.body.status;
    const updatedLeave = await leave.save();

    res.json(updatedLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  applyLeave,
  getAllLeaves,
  updateLeaveStatus, 
};
