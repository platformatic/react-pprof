import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  snapshotPathTemplate: '{testDir}/snapshots/{testFilePath}/{projectName}-{arg}-{ext}',

  // Centralize all snapshots in one directory
  expect: {
    toHaveScreenshot: {
      // Ratio of total pixels which may be different
      maxDiffPixelRatio: 0.15,
      // Ratio by which a given pixel may be different
      threshold: 0.05,
    },
  },

  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
    screenshot: process.env.CI ? 'on' : 'only-on-failure', // Always capture in CI
    video: process.env.CI ? 'on' : 'off', // Record video in CI for debugging
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  webServer: {
    command: 'node tests/fixtures/test-server/server.js',
    port: 3100,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: process.env.CI ? {
          args: [
            '--use-gl=swiftshader', // Use software WebGL implementation
            '--disable-gpu-sandbox',
            '--enable-webgl',
            '--enable-accelerated-2d-canvas',
            '--disable-dev-shm-usage', // Overcome limited resource problems
            '--no-sandbox' // Required for Docker
          ]
        } : {}
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        launchOptions: process.env.CI ? {
          firefoxUserPrefs: {
            'webgl.force-enabled': true,
            'webgl.disable-angle': false,
            'layers.acceleration.force-enabled': true
          }
        } : {}
      },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Test server is now managed by Playwright's webServer
})
