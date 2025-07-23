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
console.log(`Process PID: ${process.pid}`);