const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    artist: {
      type: String,
      required: true,
      index: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
    playCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for common queries
songSchema.index({ title: 1, artist: 1 });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
