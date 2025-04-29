import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Load test data from a JSON file
const testData = new SharedArray('test data', function () {
  return JSON.parse(open('./test-data.json'));
});

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 20 }, // Stay at 20 users
    { duration: '30s', target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'], // Less than 1% of requests should fail
  },
};

// Base URL for the API
const BASE_URL = 'http://localhost:5001/api/songs';

export default function () {
  // Test GET all songs endpoint
  const getAllResponse = http.get(`${BASE_URL}?page=1&limit=10`);
  check(getAllResponse, {
    'GET /songs status is 200': (r) => r.status === 200,
    'GET /songs response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Get a random song ID from test data
  const randomSong = testData[Math.floor(Math.random() * testData.length)];

  // Test GET single song endpoint
  const getSingleResponse = http.get(`${BASE_URL}/${randomSong.cloudinaryId}`);
  check(getSingleResponse, {
    'GET /songs/:id status is 200': (r) => r.status === 200,
    'GET /songs/:id response time < 300ms': (r) => r.timings.duration < 300,
  });

  // Test audio streaming endpoint
  const streamResponse = http.get(
    `${BASE_URL}/audio/${randomSong.cloudinaryId}`
  );
  check(streamResponse, {
    'GET /songs/audio/:id status is 200': (r) => r.status === 200,
    'GET /songs/audio/:id response time < 1000ms': (r) =>
      r.timings.duration < 1000,
  });

  // Add a small delay between iterations
  sleep(1);
}
