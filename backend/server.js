const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const path = require('path'); // <-- Add this

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://frontend-8ys9.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
const leaveRoutes = require('./routes/leaveRoutes');
app.use('/api/leaves', leaveRoutes);

const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

// Health check route for DB connection
app.get('/ping', async (req, res) => {
  try {
    const count = await mongoose.connection.db.collection('students').countDocuments();
    res.json({ success: true, studentCount: count });
  } catch (error) {
    res.status(500).json({ success: false, error: 'DB connection failed', details: error.message });
  }
});

// Serve React frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build'))); // <-- path to your React build

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
