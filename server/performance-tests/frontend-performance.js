const { promisify } = require('util');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port,
  };

  try {
    const runnerResult = await lighthouse(url, options);
    return runnerResult.lhr;
  } finally {
    await chrome.kill();
  }
}

async function measurePerformance() {
  const urls = [
    'http://localhost:3000', // Home page
    'http://localhost:3000/player', // Player page
    'http://localhost:3000/playlist', // Playlist page
  ];

  const results = {};

  for (const url of urls) {
    console.log(`Testing ${url}...`);
    const lhr = await runLighthouse(url);

    results[url] = {
      firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue,
      largestContentfulPaint:
        lhr.audits['largest-contentful-paint'].numericValue,
      timeToInteractive: lhr.audits['interactive'].numericValue,
      totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
      cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue,
    };
  }

  return results;
}

// Run the tests
measurePerformance()
  .then((results) => {
    console.log('Performance Results:');
    console.log(JSON.stringify(results, null, 2));
  })
  .catch((err) => console.error('Error running tests:', err));
