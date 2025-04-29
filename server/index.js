const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/echoplay')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Test routes for performance testing
app.get('/api/songs', (req, res) => {
  console.log('GET /api/songs called');
  try {
    res.json({
      songs: [
        { id: 'test-song-id', title: 'Test Song', artist: 'Test Artist' },
      ],
    });
  } catch (error) {
    console.error('Error in /api/songs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/songs/:id', (req, res) => {
  console.log('GET /api/songs/:id called with id:', req.params.id);
  try {
    res.json({
      id: req.params.id,
      title: 'Test Song',
      artist: 'Test Artist',
      duration: 180,
    });
  } catch (error) {
    console.error('Error in /api/songs/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/audio/:id', (req, res) => {
  console.log('GET /api/audio/:id called with id:', req.params.id);
  try {
    res.send('Audio stream simulation');
  } catch (error) {
    console.error('Error in /api/audio/:id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
