const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);
const writeFileAsync = promisify(fs.writeFile);

async function runTests() {
  const timestamp = new Date().toISOString();
  const reportDir = path.join(__dirname, 'reports', timestamp);

  // Create reports directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'reports'))) {
    fs.mkdirSync(path.join(__dirname, 'reports'));
  }
  fs.mkdirSync(reportDir);

  // Run API load tests
  console.log('Running API load tests...');
  const { stdout: apiResults } = await execAsync('k6 run api-load-test.js');
  await writeFileAsync(
    path.join(reportDir, 'api-load-test-results.txt'),
    apiResults
  );

  // Run frontend performance tests
  console.log('Running frontend performance tests...');
  const { stdout: frontendResults } = await execAsync(
    'node frontend-performance.js'
  );
  await writeFileAsync(
    path.join(reportDir, 'frontend-performance-results.json'),
    frontendResults
  );

  // Generate summary report
  const summary = {
    timestamp,
    apiLoadTest: {
      // Extract key metrics from apiResults
      averageResponseTime: extractMetric(apiResults, 'http_req_duration'),
      errorRate: extractMetric(apiResults, 'errors'),
      requestsPerSecond: extractMetric(apiResults, 'http_reqs'),
    },
    frontendPerformance: JSON.parse(frontendResults),
  };

  await writeFileAsync(
    path.join(reportDir, 'summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('Performance tests completed!');
  console.log(`Results saved to: ${reportDir}`);
}

function extractMetric(results, metricName) {
  const regex = new RegExp(`${metricName}[^\\n]*`, 'g');
  const matches = results.match(regex);
  return matches ? matches[0] : 'N/A';
}

runTests().catch(console.error);
