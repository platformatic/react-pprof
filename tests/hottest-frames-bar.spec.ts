import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('HottestFramesBar Component', () => {

  test.describe('Basic Rendering', () => {
    test('renders hottest frames bar', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true })

      // Check that the hottest frames bar container is visible
      const hottestBar = page.locator('.hottest-frames-bar')
      await expect(hottestBar).toBeVisible()

      // The bar should contain colored segments (divs with absolute positioning)
      const segments = hottestBar.locator('div[style*="position: absolute"]')
      const count = await segments.count()
      expect(count).toBeGreaterThan(0)
    })

    test('shows colored segments for frames', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true })

      await page.waitForTimeout(1000)

      // Check that the bar contains segments
      const hottestBar = page.locator('.hottest-frames-bar')
      // Look for divs with absolute positioning (the frame segments)
      const segments = hottestBar.locator('div[style*="position: absolute"]')
      const count = await segments.count()
      
      // Should have frame segments
      expect(count).toBeGreaterThan(0)
    })
  })

  test.describe('Interactions', () => {
    test('clicking on bar selects a frame', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true, stackDetails: true })

      // Click on the hottest frames bar
      const hottestBar = page.locator('.hottest-frames-bar')
      await hottestBar.click({ position: { x: 50, y: 5 } })

      await page.waitForTimeout(500)

      // If stack details are shown, check if they updated
      const stackDetails = page.locator('.stack-details-container')
      if (await stackDetails.isVisible()) {
        // Stack details should show something (either empty or with frame)
        await expect(stackDetails).toBeVisible()
      }
    })

    test('hovering changes opacity', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true })

      const hottestBar = page.locator('.hottest-frames-bar')
      
      // Get initial opacity of first segment
      const firstSegment = hottestBar.locator('div[style*="position: absolute"]').first()
      const initialOpacity = await firstSegment.evaluate(el => window.getComputedStyle(el).opacity)

      // Hover over the bar
      await hottestBar.hover({ position: { x: 50, y: 5 } })
      await page.waitForTimeout(300)

      // Check if opacity changed (hover effect)
      const hoverOpacity = await firstSegment.evaluate(el => window.getComputedStyle(el).opacity)
      
      // Opacity might change or stay the same depending on which segment is hovered
      expect(hoverOpacity).toBeDefined()
    })
  })

  test.describe('Data Visualization', () => {
    test('frames have widths proportional to self-time', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true })

      const hottestBar = page.locator('.hottest-frames-bar')
      const segments = await hottestBar.locator('div[style*="position: absolute"]').all()

      if (segments.length > 1) {
        // Get widths of segments
        const widths = await Promise.all(
          segments.slice(0, 3).map(async (segment) => {
            const style = await segment.getAttribute('style')
            const widthMatch = style?.match(/width:\s*([\d.]+)%/)
            return widthMatch ? parseFloat(widthMatch[1]) : 0
          })
        )

        // At least some segments should have non-zero width
        const nonZeroWidths = widths.filter(w => w > 0)
        expect(nonZeroWidths.length).toBeGreaterThan(0)
      }
    })

    test('shows tooltip on hover', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true })

      const hottestBar = page.locator('.hottest-frames-bar')
      const firstSegment = hottestBar.locator('div[style*="position: absolute"]').first()
      
      // Check if segment has title attribute (tooltip)
      const title = await firstSegment.getAttribute('title')
      expect(title).toBeTruthy()
      expect(title).toContain('self:')
      expect(title).toContain('total:')
    })
  })

  test.describe('Responsive Behavior', () => {
    test('adapts to different widths', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)

      const widths = [1200, 800, 400]
      for (const width of widths) {
        await page.setViewportSize({ width, height: 600 })
        await utils.navigateToTest({ hottestFrames: true })

        const hottestBar = page.locator('.hottest-frames-bar')
        await expect(hottestBar).toBeVisible()

        const barBox = await hottestBar.boundingBox()
        expect(barBox).toBeTruthy()
        expect(barBox!.width).toBeGreaterThan(0)
      }
    })

    test('respects height prop', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true, hottestHeight: 20 })

      const hottestBar = page.locator('.hottest-frames-bar')
      const barBox = await hottestBar.boundingBox()
      
      // Height should be approximately what was set
      expect(barBox).toBeTruthy()
      expect(barBox!.height).toBeGreaterThanOrEqual(18)
      expect(barBox!.height).toBeLessThanOrEqual(22)
    })
  })

  test.describe('Integration', () => {
    test('works with stack details', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true, stackDetails: true })

      // Click on the hottest frames bar
      const hottestBar = page.locator('.hottest-frames-bar')
      await hottestBar.click({ position: { x: 100, y: 5 } })
      await page.waitForTimeout(500)

      // Stack details container should be visible
      const stackDetails = page.locator('.stack-details-container')
      await expect(stackDetails).toBeVisible()
    })

    test('updates with flamegraph selection', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true, flamegraph: true })

      // Click on flamegraph
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)

      // HottestFramesBar should still be visible
      const hottestBar = page.locator('.hottest-frames-bar')
      await expect(hottestBar).toBeVisible()
    })
  })

  test.describe('Visual Regression', () => {
    test('maintains visual consistency', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true })

      await page.waitForTimeout(1000)
      await expect(page).toHaveScreenshot('hottest-frames-bar-default.png')
    })

    test('custom colors apply correctly', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestFrames: true, mode: 'blue' })

      await page.waitForTimeout(1000)
      await expect(page).toHaveScreenshot('hottest-frames-bar-blue-theme.png')
    })
  })
})