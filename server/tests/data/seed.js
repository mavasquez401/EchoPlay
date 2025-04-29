const mongoose = require('mongoose');
const Song = require('../../src/models/Song');
const songs = require('../fixtures/songs');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/echoplay_test'
    );
    console.log('Connected to MongoDB');

    // Clear existing data
    await Song.deleteMany({});
    console.log('Cleared existing data');

    // Insert test data
    await Song.insertMany(songs);
    console.log('Inserted test data');

    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
