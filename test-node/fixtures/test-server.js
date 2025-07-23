const http = require('http');

function cpuIntensiveWork() {
  const data = [];
  for (let i = 0; i < 10000; i++) {
    data.push(Math.random() * i);
  }
  return data.reduce((sum, val) => sum + val, 0);
}

const server = http.createServer((req, res) => {
  if (req.url === '/work') {
    const result = cpuIntensiveWork();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result, message: 'Work completed' }));
    return;
  }
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Test server running. Visit /work for CPU load.');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Server shutting down...');
  server.close(() => process.exit(0));
});