import { test, expect } from '@playwright/test'

test('capture console errors', async ({ page }) => {
  const consoleErrors: string[] = []
  const consoleLogs: string[] = []
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    } else {
      consoleLogs.push(`${msg.type()}: ${msg.text()}`)
    }
  })

  page.on('pageerror', error => {
    consoleErrors.push(`Page error: ${error.message}`)
  })

  await page.goto('http://localhost:3100', { waitUntil: 'networkidle' })
  
  // Wait a bit to catch any delayed errors
  await page.waitForTimeout(2000)
  
  // Log all console output
  console.log('=== Console Logs ===')
  consoleLogs.forEach(log => console.log(log))
  
  console.log('\n=== Console Errors ===')
  consoleErrors.forEach(err => console.log(err))
  
  // Also check if canvas exists
  const canvasExists = await page.locator('canvas').count()
  console.log(`\nCanvas elements found: ${canvasExists}`)
  
  // Check if the test app mounted
  const rootElement = await page.locator('#root').innerHTML()
  console.log(`\nRoot element content length: ${rootElement.length}`)
  
  // Force the test to fail so we see the output
  expect(consoleErrors.length).toBe(0)
})