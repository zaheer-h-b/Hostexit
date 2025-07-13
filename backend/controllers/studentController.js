const Student = require('../models/studentModel');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/SendEmail');

const registerStudent = async (req, res) => {
  try {
    const { name, rollNo, email, phone, password } = req.body;

    const exists = await Student.findOne({ $or: [{ email }, { rollNo }] });
    if (exists) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      rollNo,
      email,
      phone,
      password: hashedPassword,
    });

    await student.save();

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const student = await Student.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    const match = await bcrypt.compare(password, student.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      student,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


module.exports = {
  registerStudent,
  loginStudent,
};
