const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Song = require('../src/models/Song');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Sample song data
const sampleSongs = [
  {
    title: 'Summer Vibes',
    artist: 'DJ Cool',
    cloudinaryId: 'summer_vibes_123',
    cloudinaryUrl:
      'https://res.cloudinary.com/your-cloud/video/upload/summer_vibes_123.mp3',
    duration: 180,
    playCount: 0,
  },
  {
    title: 'Midnight Dreams',
    artist: 'Night Owl',
    cloudinaryId: 'midnight_dreams_456',
    cloudinaryUrl:
      'https://res.cloudinary.com/your-cloud/video/upload/midnight_dreams_456.mp3',
    duration: 240,
    playCount: 0,
  },
  {
    title: 'Morning Sun',
    artist: 'Early Bird',
    cloudinaryId: 'morning_sun_789',
    cloudinaryUrl:
      'https://res.cloudinary.com/your-cloud/video/upload/morning_sun_789.mp3',
    duration: 210,
    playCount: 0,
  },
];

// Generate test data
async function generateTestData() {
  try {
    // Clear existing data
    await Song.deleteMany({});
    console.log('Cleared existing data');

    // Insert new test data
    const songs = await Song.insertMany(sampleSongs);
    console.log(`Inserted ${songs.length} songs`);

    // Save test data to JSON file for k6
    const fs = require('fs');
    fs.writeFileSync(
      './performance-tests/test-data.json',
      JSON.stringify(songs, null, 2)
    );
    console.log('Saved test data to JSON file');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error generating test data:', error);
    process.exit(1);
  }
}

generateTestData();
