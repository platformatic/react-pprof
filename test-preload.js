#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testPreloadScript() {
  console.log('Testing preload.js script...\n');
  
  // Clean up any existing profile files
  const profileFiles = fs.readdirSync('.').filter(f => f.startsWith('cpu-profile-') && f.endsWith('.pb'));
  profileFiles.forEach(f => {
    console.log(`Cleaning up existing profile: ${f}`);
    fs.unlinkSync(f);
  });
  
  console.log('1. Starting test server with preload.js...');
  const server = spawn('node', ['--require', './preload.js', './test-server.js'], {
    stdio: ['inherit', 'pipe', 'pipe'],
    env: { ...process.env, PORT: '3001' }
  });
  
  let serverOutput = '';
  server.stdout.on('data', (data) => {
    const output = data.toString();
    serverOutput += output;
    console.log(`SERVER: ${output.trim()}`);
  });
  
  server.stderr.on('data', (data) => {
    console.log(`SERVER ERROR: ${data.toString().trim()}`);
  });
  
  // Wait for server to start
  await sleep(1000);
  
  console.log('\n2. Generating some CPU load...');
  for (let i = 0; i < 3; i++) {
    const response = await fetch('http://localhost:3001/work').catch(() => null);
    if (response) {
      console.log(`Load request ${i + 1} completed`);
    }
    await sleep(200);
  }
  
  console.log('\n3. Sending SIGUSR2 to start profiling...');
  process.kill(server.pid, 'SIGUSR2');
  await sleep(500);
  
  console.log('\n4. Generating more CPU load while profiling...');
  for (let i = 0; i < 5; i++) {
    const response = await fetch('http://localhost:3001/work').catch(() => null);
    if (response) {
      console.log(`Profiled load request ${i + 1} completed`);
    }
    await sleep(300);
  }
  
  console.log('\n5. Sending SIGUSR2 to stop profiling and generate profile...');
  process.kill(server.pid, 'SIGUSR2');
  await sleep(1000);
  
  console.log('\n6. Checking for generated profile files...');
  const newProfileFiles = fs.readdirSync('.').filter(f => f.startsWith('cpu-profile-') && f.endsWith('.pb'));
  
  if (newProfileFiles.length > 0) {
    console.log(`✓ SUCCESS: Profile file generated: ${newProfileFiles[0]}`);
    const stats = fs.statSync(newProfileFiles[0]);
    console.log(`  File size: ${stats.size} bytes`);
    console.log(`  Created: ${stats.birthtime}`);
  } else {
    console.log('✗ FAIL: No profile file was generated');
  }
  
  console.log('\n7. Shutting down server...');
  server.kill('SIGTERM');
  
  return new Promise((resolve) => {
    server.on('close', (code) => {
      console.log(`\nTest completed. Server exited with code ${code}`);
      resolve(newProfileFiles.length > 0);
    });
  });
}

// Run the test
testPreloadScript()
  .then(success => {
    console.log(success ? '\n✓ All tests passed!' : '\n✗ Test failed!');
    process.exit(success ? 0 : 1);
  })
  .catch(error => {
    console.error('\nTest error:', error);
    process.exit(1);
  });