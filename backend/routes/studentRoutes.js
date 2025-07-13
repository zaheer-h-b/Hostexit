const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');
const {
  registerStudent,
  loginStudent,
} = require('../controllers/studentController');

router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post('/register', registerStudent);
router.post('/login', loginStudent); 

module.exports = router;
