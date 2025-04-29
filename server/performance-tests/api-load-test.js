import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const songIds = ['test_song_1', 'test_song_2', 'test_song_3'];

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users
    { duration: '1m', target: 50 }, // Stay at 50 users
    { duration: '30s', target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    errors: ['rate<0.1'], // Error rate should be below 10%
  },
};

// Test data
const API_BASE_URL = 'http://localhost:5001/api';

export default function () {
  // Test song listing with pagination
  const songsResponse = http.get(`${API_BASE_URL}/songs?page=1&limit=10`);
  check(songsResponse, {
    'songs list status is 200': (r) => r.status === 200,
    'songs list response time < 500ms': (r) => r.timings.duration < 500,
    'songs list has data': (r) => JSON.parse(r.body).songs.length > 0,
  });
  errorRate.add(songsResponse.status !== 200);

  // Test song details with a random song ID
  const randomSongId = songIds[Math.floor(Math.random() * songIds.length)];
  const songResponse = http.get(`${API_BASE_URL}/songs/${randomSongId}`);
  check(songResponse, {
    'song details status is 200': (r) => r.status === 200,
    'song details response time < 500ms': (r) => r.timings.duration < 500,
    'song details has data': (r) => JSON.parse(r.body).title !== undefined,
  });
  errorRate.add(songResponse.status !== 200);

  // Test audio streaming with a random song ID
  const audioResponse = http.get(`${API_BASE_URL}/audio/${randomSongId}`);
  check(audioResponse, {
    'audio stream status is 200': (r) => r.status === 200,
    'audio stream response time < 1000ms': (r) => r.timings.duration < 1000,
    'audio stream has content': (r) => r.body.length > 0,
  });
  errorRate.add(audioResponse.status !== 200);

  sleep(1);
}
