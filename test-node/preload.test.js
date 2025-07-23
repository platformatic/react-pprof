const { test, describe, before, after } = require('node:test');
const { strict: assert } = require('node:assert');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

describe('preload.js', () => {
  let testProcess;
  const testServerPath = path.join(__dirname, 'fixtures', 'test-server.js');
  const preloadPath = path.join(__dirname, '..', 'preload.js');
  
  before(() => {
    // Clean up any existing profile files
    const profileFiles = fs.readdirSync('.').filter(f => 
      f.startsWith('cpu-profile-') && f.endsWith('.pb')
    );
    profileFiles.forEach(f => fs.unlinkSync(f));
  });

  after(() => {
    if (testProcess && !testProcess.killed) {
      testProcess.kill('SIGTERM');
    }
  });

  test('should load preload script without errors', async () => {
    return new Promise((resolve, reject) => {
      testProcess = spawn('node', ['--require', preloadPath, testServerPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PORT: '3003' }
      });

      let output = '';
      testProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      testProcess.stderr.on('data', (data) => {
        reject(new Error(`Process error: ${data.toString()}`));
      });

      // Wait for server to start
      setTimeout(() => {
        assert(output.includes('PProf preload script loaded'), 'Preload script should load');
        assert(output.includes('Test server running on port 3003'), 'Server should start');
        assert(/Process PID: \d+/.test(output), 'Should display PID');
        
        testProcess.kill('SIGTERM');
        resolve();
      }, 1000);
    });
  });

  test('should handle SIGUSR2 signal to start profiling', async () => {
    return new Promise((resolve, reject) => {
      testProcess = spawn('node', ['--require', preloadPath, testServerPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PORT: '3004' }
      });

      let output = '';
      testProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      testProcess.stderr.on('data', (data) => {
        reject(new Error(`Process error: ${data.toString()}`));
      });

      // Wait for server to start, then send SIGUSR2
      setTimeout(() => {
        process.kill(testProcess.pid, 'SIGUSR2');
        
        // Check output after signal
        setTimeout(() => {
          assert(output.includes('Starting CPU profiler'), 'Should start profiler on SIGUSR2');
          
          testProcess.kill('SIGTERM');
          resolve();
        }, 500);
      }, 1000);
    });
  });

  test('should create profile file on second SIGUSR2 signal', async () => {
    return new Promise((resolve, reject) => {
      testProcess = spawn('node', ['--require', preloadPath, testServerPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PORT: '3005' }
      });

      let output = '';
      testProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      testProcess.stderr.on('data', (data) => {
        reject(new Error(`Process error: ${data.toString()}`));
      });

      // Wait for server to start
      setTimeout(() => {
        // Start profiling
        process.kill(testProcess.pid, 'SIGUSR2');
        
        setTimeout(() => {
          // Generate some CPU load
          fetch('http://localhost:3005/work').catch(() => {});
          
          setTimeout(() => {
            // Stop profiling and generate file
            process.kill(testProcess.pid, 'SIGUSR2');
            
            setTimeout(() => {
              assert(output.includes('Stopping CPU profiler'), 'Should stop profiler');
              assert(/CPU profile written to cpu-profile-.*\.pb/.test(output), 'Should write profile file');
              
              // Check that file was actually created
              const profileFiles = fs.readdirSync('.').filter(f => 
                f.startsWith('cpu-profile-') && f.endsWith('.pb')
              );
              assert(profileFiles.length > 0, 'Profile file should be created on disk');
              
              // Clean up
              profileFiles.forEach(f => fs.unlinkSync(f));
              testProcess.kill('SIGTERM');
              resolve();
            }, 1000);
          }, 500);
        }, 300);
      }, 1000);
    });
  });

  test('should handle profiler errors gracefully', async () => {
    return new Promise((resolve, reject) => {
      // Mock a scenario where profiler might fail
      const mockPreloadPath = path.join(__dirname, 'mock-preload.js');
      
      // Create a mock preload that simulates an error
      fs.writeFileSync(mockPreloadPath, `
        let isProfilerRunning = false;
        
        function toggleProfiler() {
          if (!isProfilerRunning) {
            console.log('Starting CPU profiler...');
            isProfilerRunning = true;
          } else {
            console.log('Stopping CPU profiler and writing profile to disk...');
            try {
              throw new Error('Mock profiler error');
            } catch (error) {
              console.error('Error generating profile:', error.message);
              isProfilerRunning = false;
            }
          }
        }
        
        process.on('SIGUSR2', toggleProfiler);
        console.log('Mock preload script loaded. Send SIGUSR2 to toggle profiling.');
        console.log(\`Process PID: \${process.pid}\`);
      `);

      testProcess = spawn('node', ['--require', mockPreloadPath, testServerPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, PORT: '3006' }
      });

      let output = '';
      testProcess.stdout.on('data', (data) => {
        output += data.toString();
      });

      let errorOutput = '';
      testProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      setTimeout(() => {
        // Start profiling
        process.kill(testProcess.pid, 'SIGUSR2');
        
        setTimeout(() => {
          // Try to stop profiling (should error)
          process.kill(testProcess.pid, 'SIGUSR2');
          
          setTimeout(() => {
            try {
              assert(output.includes('Starting CPU profiler'), 'Should start profiler');
              // Check both stdout and stderr for error message
              const hasError = output.includes('Error generating profile: Mock profiler error') ||
                              errorOutput.includes('Error generating profile: Mock profiler error');
              assert(hasError, 'Should handle errors gracefully');
              
              // Clean up mock file
              fs.unlinkSync(mockPreloadPath);
              testProcess.kill('SIGTERM');
              resolve();
            } catch (error) {
              console.log('Test output:', output);
              console.log('Error output:', errorOutput);
              if (fs.existsSync(mockPreloadPath)) {
                fs.unlinkSync(mockPreloadPath);
              }
              testProcess.kill('SIGTERM');
              reject(error);
            }
          }, 500);
        }, 300);
      }, 1000);
    });
  });
});