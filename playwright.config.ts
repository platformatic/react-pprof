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
      // All screenshots will be stored in tests/snapshots/{test-name}/
      mode: 'always',
      threshold: 0.2, // Allow small visual differences
    },
  },

  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
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
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Test server is now managed by Playwright's webServer
})
