const express = require('express');
const router = express.Router();
const Track = require('../models/Track');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// GET all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find().sort({ uploadedAt: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST track upload
router.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    const { title, artist } = req.body;
    const audioUrl = req.file.path;

    const newTrack = new Track({ title, artist, audioUrl });
    await newTrack.save();

    res.status(201).json(newTrack);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
