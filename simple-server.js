#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const { Profile } = require('pprof-format');

// Create a synthetic CPU profile that works with our CLI
function createSyntheticProfile() {
  const profile = new Profile();
  
  // Add string table entries
  const strings = [
    '',  // 0 - empty string (required)
    'samples',  // 1
    'count',    // 2 
    'cpu',      // 3
    'nanoseconds', // 4
    'main',     // 5
    'main.go',  // 6
    'app.Run',  // 7
    'app/server.go', // 8
    'http.ListenAndServe', // 9
    'net/http/server.go', // 10
    'handler.Process', // 11
    'handlers/process.go', // 12
    'db.Query', // 13
    'database/query.go', // 14
    'processData', // 15
    'handleRequest', // 16
    'businessLogic', // 17
  ];
  
  strings.forEach(str => profile.stringTable.dedup(str));
  
  // Add sample types
  profile.sampleType.push({
    type: profile.stringTable.dedup('samples'),
    unit: profile.stringTable.dedup('count')
  });
  
  profile.sampleType.push({
    type: profile.stringTable.dedup('cpu'), 
    unit: profile.stringTable.dedup('nanoseconds')
  });
  
  // Add functions
  const functions = [
    { id: 1, name: profile.stringTable.dedup('main'), filename: profile.stringTable.dedup('main.go') },
    { id: 2, name: profile.stringTable.dedup('app.Run'), filename: profile.stringTable.dedup('app/server.go') },
    { id: 3, name: profile.stringTable.dedup('http.ListenAndServe'), filename: profile.stringTable.dedup('net/http/server.go') },
    { id: 4, name: profile.stringTable.dedup('handler.Process'), filename: profile.stringTable.dedup('handlers/process.go') },
    { id: 5, name: profile.stringTable.dedup('db.Query'), filename: profile.stringTable.dedup('database/query.go') },
    { id: 6, name: profile.stringTable.dedup('processData'), filename: profile.stringTable.dedup('main.go') },
    { id: 7, name: profile.stringTable.dedup('handleRequest'), filename: profile.stringTable.dedup('main.go') },
    { id: 8, name: profile.stringTable.dedup('businessLogic'), filename: profile.stringTable.dedup('main.go') },
  ];
  
  functions.forEach(func => profile.function.push(func));
  
  // Add locations
  const locations = [
    { id: 1, line: [{ functionId: 1, line: 10 }] },
    { id: 2, line: [{ functionId: 2, line: 25 }] },
    { id: 3, line: [{ functionId: 3, line: 50 }] },
    { id: 4, line: [{ functionId: 4, line: 15 }] },
    { id: 5, line: [{ functionId: 5, line: 8 }] },
    { id: 6, line: [{ functionId: 6, line: 30 }] },
    { id: 7, line: [{ functionId: 7, line: 40 }] },
    { id: 8, line: [{ functionId: 8, line: 35 }] },
  ];
  
  locations.forEach(loc => profile.location.push(loc));
  
  // Add samples with realistic CPU distribution
  const samples = [
    // main -> app.Run -> http.ListenAndServe
    { locationId: [1, 2, 3], value: [5, 1000000] },
    // main -> processData
    { locationId: [1, 6], value: [15, 3000000] },
    // main -> handleRequest -> businessLogic
    { locationId: [1, 7, 8], value: [25, 5000000] },
    // handler.Process -> db.Query
    { locationId: [4, 5], value: [30, 6000000] },
    // More complex stack: main -> handleRequest -> businessLogic -> processData
    { locationId: [1, 7, 8, 6], value: [10, 2000000] },
    // Another path: app.Run -> handler.Process -> db.Query
    { locationId: [2, 4, 5], value: [20, 4000000] },
  ];
  
  samples.forEach(sample => profile.sample.push(sample));
  
  return profile;
}

// Some CPU-intensive functions to simulate real work
function processData() {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push(Math.random() * i);
  }
  return data.reduce((sum, val) => sum + val, 0);
}

function handleDatabase() {
  const queries = [];
  for (let i = 0; i < 500; i++) {
    queries.push(`SELECT * FROM table_${i % 10}`);
  }
  return queries.join('; ');
}

function businessLogic(request) {
  const data = processData();
  const dbResult = handleDatabase();
  
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
const server = http.createServer((req, res) => {
  if (req.url === '/profile') {
    try {
      // Generate synthetic profile
      const profile = createSyntheticProfile();
      const profileBuffer = profile.encode();
      
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="cpu-profile.pb"'
      });
      res.end(profileBuffer);
      
      console.log('Synthetic CPU profile generated and sent');
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
  <title>Simple PProf Server</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; }
    .endpoint { background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 5px; }
    code { background: #e8e8e8; padding: 2px 5px; border-radius: 3px; }
  </style>
</head>
<body>
  <h1>Simple PProf Server</h1>
  <p>This server generates synthetic pprof data that works with the CLI utility.</p>
  
  <div class="endpoint">
    <h3>Generate Load</h3>
    <p>Visit <a href="/load">/load</a> to generate some CPU-intensive work</p>
    <p>This runs <code>processData()</code>, <code>handleDatabase()</code>, and <code>businessLogic()</code></p>
  </div>
  
  <div class="endpoint">
    <h3>Download CPU Profile</h3>
    <p>Visit <a href="/profile">/profile</a> to download a synthetic CPU profile</p>
    <p>Use: <code>node cli.js cpu-profile.pb</code> to generate a flamegraph</p>
  </div>
  
  <h3>Example Usage:</h3>
  <ol>
    <li>Visit <a href="/load">/load</a> to see the functions in action</li>
    <li>Download the profile from <a href="/profile">/profile</a></li>
    <li>Run: <code>node cli.js cpu-profile.pb</code></li>
    <li>Open the generated HTML file to view the flamegraph</li>
  </ol>
  
  <p><strong>Note:</strong> This generates a synthetic profile that demonstrates the flamegraph functionality with realistic function hierarchies and CPU time distributions.</p>
</body>
</html>
  `);
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Simple PProf server running on http://localhost:${PORT}`);
  console.log('');
  console.log('Usage:');
  console.log(`1. Generate load: curl http://localhost:${PORT}/load`);
  console.log(`2. Get profile:   curl http://localhost:${PORT}/profile > cpu-profile.pb`);
  console.log('3. Generate HTML: node cli.js cpu-profile.pb');
  console.log('4. Open cpu-profile.html in browser');
  console.log('');
  console.log('This server generates synthetic pprof data that works with our CLI utility.');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nStopping server...');
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});