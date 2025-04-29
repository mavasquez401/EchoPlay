const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');

// Get all songs with pagination
router.get('/', songController.getSongs);

// Get single song by ID
router.get('/:id', songController.getSongById);

// Stream audio file
router.get('/audio/:id', songController.streamAudio);

module.exports = router;
