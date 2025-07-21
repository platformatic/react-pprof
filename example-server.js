#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const pprof = require('@datadog/pprof');

// Initialize CPU profiler (time profiler)
const profiler = pprof.time;

// Debug available methods
console.log('Available pprof methods:', Object.keys(pprof));
console.log('Available time profiler methods:', Object.keys(profiler));

// Some CPU-intensive functions to show in the profile
function processData() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push(Math.random() * i);
  }
  return data.reduce((sum, val) => sum + val, 0);
}

function handleDatabase() {
  // Simulate database work
  const queries = [];
  for (let i = 0; i < 500; i++) {
    queries.push(`SELECT * FROM table_${i % 10}`);
  }
  return queries.join('; ');
}

function businessLogic(request) {
  const data = processData();
  const dbResult = handleDatabase();
  
  // Some more CPU work
  const result = [];
  for (let i = 0; i < 100; i++) {
    result.push({
      id: i,
      data: data + i,
      query: dbResult.substring(0, 50)
    });
  }
  return result;
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
  if (req.url === '/profile') {
    try {
      // Generate and return CPU profile
      const profileData = profiler.stop();
      console.log('Profile data type:', typeof profileData);
      console.log('Profile data keys:', Object.keys(profileData || {}));
      
      // Try both sync and async encode methods
      let profile;
      if (pprof.encodeSync) {
        console.log('Using synchronous encode');
        profile = pprof.encodeSync(profileData);
      } else {
        console.log('Using async encode');
        profile = await pprof.encode(profileData);
      }
      
      console.log('Encoded profile type:', typeof profile);
      console.log('Encoded profile length:', profile?.length);
      console.log('First 20 bytes:', profile?.slice(0, 20));
      
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="cpu-profile.pb"'
      });
      res.end(profile);
      
      console.log('CPU profile generated and sent');
      
      // Restart profiling for next request
      profiler.start();
    } catch (error) {
      console.error('Error generating profile:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error generating profile');
    }
    return;
  }
  
  if (req.url === '/load') {
    // Generate some CPU load
    const startTime = Date.now();
    const result = businessLogic(req);
    const duration = Date.now() - startTime;
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Load generated',
      duration: `${duration}ms`,
      itemCount: result.length
    }));
    return;
  }
  
  // Default response with instructions
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
<!DOCTYPE html>
<html>
<head>
  <title>PProf Example Server</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; }
    .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
    code { background: #e8e8e8; padding: 2px 5px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>PProf Example Server</h1>
  <p>This server demonstrates CPU profiling with @datadog/pprof.</p>
  
  <div class="endpoint">
    <h3>Generate Load</h3>
    <p>Visit <a href="/load">/load</a> to generate some CPU-intensive work</p>
    <p>This will run functions like <code>processData()</code>, <code>handleDatabase()</code>, and <code>businessLogic()</code></p>
  </div>
  
  <div class="endpoint">
    <h3>Download CPU Profile</h3>
    <p>Visit <a href="/profile">/profile</a> to download the CPU profile as a .pb file</p>
    <p>You can then use: <code>node cli.js cpu-profile.pb</code> to generate a flamegraph</p>
  </div>
  
  <h3>Example Usage:</h3>
  <ol>
    <li>Visit <a href="/load">/load</a> several times to generate CPU activity</li>
    <li>Download the profile from <a href="/profile">/profile</a></li>
    <li>Run: <code>node cli.js cpu-profile.pb</code></li>
    <li>Open the generated HTML file to view the flamegraph</li>
  </ol>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3002;

server.listen(PORT, () => {
  console.log(`PProf example server running on http://localhost:${PORT}`);
  console.log('');
  console.log('Usage:');
  console.log(`1. Generate load: curl http://localhost:${PORT}/load`);
  console.log(`2. Get profile:   curl http://localhost:${PORT}/profile > cpu-profile.pb`);
  console.log('3. Generate HTML: node cli.js cpu-profile.pb');
  console.log('');
  
  // Start CPU profiling
  profiler.start();
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nStopping server...');
  profiler.stop();
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});
