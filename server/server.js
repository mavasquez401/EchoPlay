const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to EchoPlay API 🎧');
});
app.use('/api/tracks', require('./routes/trackRoutes'));

app.get('/test', (req, res) => {
  res.send('Hello from EchoPlay!');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
