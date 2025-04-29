const Song = require('../models/Song');

// Get all songs with pagination
exports.getSongs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const songs = await Song.find()
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Song.countDocuments();

    res.json({
      songs,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalSongs: total,
    });
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

// Get single song by ID
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findOne({ cloudinaryId: req.params.id });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }
    res.json(song);
  } catch (error) {
    console.error('Error fetching song:', error);
    res.status(500).json({ error: 'Failed to fetch song' });
  }
};

// Stream audio file
exports.streamAudio = async (req, res) => {
  try {
    const song = await Song.findOne({ cloudinaryId: req.params.id });
    if (!song) {
      return res.status(404).json({ error: 'Song not found' });
    }

    // Increment play count
    await Song.updateOne({ _id: song._id }, { $inc: { playCount: 1 } });

    // Redirect to Cloudinary URL for streaming
    res.redirect(song.cloudinaryUrl);
  } catch (error) {
    console.error('Error streaming audio:', error);
    res.status(500).json({ error: 'Failed to stream audio' });
  }
};
