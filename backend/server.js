const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "https://frontend-bb.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
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

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));