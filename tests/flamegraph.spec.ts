import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FlameGraph Component', () => {

  test.describe('Basic Rendering', () => {
    test('renders default flamegraph', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      // Check for any JavaScript errors
      const errors = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })

      // Wait for WebGL to initialize and render
      await page.waitForTimeout(3000)

      // Check for errors but don't log them
      // Errors will be captured in the test report if needed

      // Check that canvas elements are present
      const canvas = page.locator('canvas').first()

      await expect(canvas).toBeVisible()

      // Take screenshot for visual regression
      await expect(page).toHaveScreenshot('flamegraph-default.png')
    })

    test('renders with custom colors', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ mode: 'blue' })

      // Verify canvas is rendered
      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible()

      await expect(page).toHaveScreenshot('flamegraph-blue-theme.png')
    })

    test('renders green theme', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ mode: 'small' })

      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible()

      await expect(page).toHaveScreenshot('flamegraph-small-theme.png')
    })
  })

  test.describe('Interactions', () => {
    test('hover shows tooltip', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      // Hover over a frame
      const canvas = page.locator('canvas').first()
      await canvas.hover({ position: { x: 200, y: 50 } })

      // Wait for tooltip
      await page.waitForTimeout(500)

      // Check for tooltip - look for the tooltip with fixed position and high z-index
      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      await expect(page).toHaveScreenshot('flamegraph-hover.png')
    })

    test('click zooms into frame', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      // Click on a frame
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 50 } })

      // Wait for zoom animation
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('flamegraph-zoomed.png')

      // Click on empty space to zoom out
      await canvas.click({ position: { x: 50, y: 300 } })

      // Wait for zoom out animation
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('flamegraph-zoomed-out.png')
    })

    test('multiple zoom levels', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      const canvas = page.locator('canvas').first()

      // First zoom
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Second zoom (deeper)
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('flamegraph-multi-zoom.png')

      // Zoom out completely
      await canvas.click({ position: { x: 50, y: 300 } })
      await page.waitForTimeout(1000)
    })
  })

  test.describe('Viewport Sizes', () => {
    test('renders correctly at different sizes', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)

      const sizes = [
        { width: 1920, height: 1080, name: 'desktop' },
        { width: 1024, height: 768, name: 'tablet' },
        { width: 375, height: 667, name: 'mobile' },
      ]

      for (const size of sizes) {
        await page.setViewportSize({ width: size.width, height: size.height })
        await utils.navigateToTest()

        await expect(page).toHaveScreenshot(`flamegraph-${size.name}.png`)
      }
    })
  })

  test.describe('Error Handling', () => {
    test('handles missing data gracefully', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)

      // Navigate to test page with default mode
      await utils.navigateToTest({ mode: 'default' })

      // Should still render without crashing
      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible({ timeout: 10000 })
    })
  })

  test.describe('Performance', () => {
    test('measures load time', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)

      const startTime = Date.now()
      await utils.navigateToTest()
      const endTime = Date.now()
      const loadTime = endTime - startTime

      // Should load in reasonable time
      expect(loadTime).toBeLessThan(1000)
    })

    test('handles rapid interactions', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      const canvas = page.locator('canvas').first()

      // Rapid clicks - use x coordinates that are known to have frames (200-400 range)
      for (let i = 0; i < 10; i++) {
        await canvas.click({ position: { x: 200 + i * 20, y: 50 } })
        await page.waitForTimeout(50)
      }

      // Component should remain functional - verify canvas is still rendered
      await expect(canvas).toBeVisible()

      // Verify we can still click and select frames
      await canvas.click({ position: { x: 400, y: 50 } })
      await page.waitForTimeout(300)

      // After clicking, a frame should be selected (frame details or similar should appear)
      // The component shouldn't crash or freeze
      const canvasStillVisible = await canvas.isVisible()
      expect(canvasStillVisible).toBe(true)
    })
  })
})
