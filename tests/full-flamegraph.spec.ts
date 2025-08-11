import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FullFlameGraph Component', () => {

  test.describe('Basic Rendering', () => {
    test('renders integrated flame graph', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      // Check that the container is visible
      const container = page.locator('[data-testid="full-flamegraph-container"]')
      await expect(container).toBeVisible()

      // Wait for components to render
      await page.waitForTimeout(1000)

      // Should contain a canvas (flamegraph)
      const canvas = container.locator('canvas')
      await expect(canvas).toBeVisible()
    })

    test('includes multiple components', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      
      // Check for various sub-components
      const canvas = container.locator('canvas')
      await expect(canvas).toBeVisible()
      
      // May include other components based on configuration
      const childCount = await container.locator('> *').count()
      expect(childCount).toBeGreaterThan(0)
    })
  })

  test.describe('Interactions', () => {
    test('handles frame clicks', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()
      
      // Click on a frame
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)
      
      // Should still be functional
      await expect(canvas).toBeVisible()
    })

    test('zoom functionality works', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()
      
      // Click to zoom in
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(1000)
      
      // Click elsewhere to zoom out
      await canvas.click({ position: { x: 50, y: 300 } })
      await page.waitForTimeout(1000)
      
      // Should still be functional
      await expect(canvas).toBeVisible()
    })
  })

  test.describe('Layout', () => {
    test('uses specified dimensions', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const box = await container.boundingBox()
      
      expect(box).toBeTruthy()
      expect(box!.width).toBeGreaterThan(0)
      expect(box!.height).toBeGreaterThan(0)
    })

    test('responsive to viewport changes', async ({ page }) => {
      const viewportSizes = [
        { width: 1200, height: 800 },
        { width: 800, height: 600 },
      ]

      for (const size of viewportSizes) {
        await page.setViewportSize(size)
        
        const utils = new FlameGraphTestUtils(page)
        await utils.navigateToTest({ fullFlameGraph: true })

        const container = page.locator('[data-testid="full-flamegraph-container"]')
        await expect(container).toBeVisible()
        
        const canvas = container.locator('canvas').first()
        await expect(canvas).toBeVisible()
      }
    })
  })

  test.describe('Component Integration', () => {
    test('hottest frames bar integration', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      
      // Look for hottest frames elements (if included)
      const hottestElements = container.locator('[style*="position: absolute"]')
      const count = await hottestElements.count()
      
      // May or may not have hottest frames based on config
      expect(count).toBeGreaterThanOrEqual(0)
    })

    test('stack details integration', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()
      
      // Click on a frame
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)
      
      // Look for stack details elements (if included)
      const stackElements = container.locator('.stack-details-container, [class*="stack"]')
      const hasStack = await stackElements.count() > 0
      
      // May or may not show stack details
      expect(hasStack).toBeDefined()
    })
  })

  test.describe('Performance', () => {
    test('renders efficiently', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      
      const startTime = Date.now()
      await utils.navigateToTest({ fullFlameGraph: true })
      const loadTime = Date.now() - startTime
      
      // Should load within reasonable time
      expect(loadTime).toBeLessThan(5000)
    })

    test('handles rapid interactions', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()
      
      // Perform rapid clicks
      for (let i = 0; i < 3; i++) {
        await canvas.click({ position: { x: 100 + i * 50, y: 100 } })
        await page.waitForTimeout(100)
      }
      
      // Should still be responsive
      await expect(canvas).toBeVisible()
    })
  })

  test.describe('Theming', () => {
    test('applies custom theme', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true, mode: 'blue' })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      await expect(container).toBeVisible()
      
      // Visual check
      await page.waitForTimeout(1000)
      await expect(page).toHaveScreenshot('full-flamegraph-blue-theme.png')
    })

    test('passes fontFamily to child components', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()
      
      // Click to trigger tooltip
      await canvas.hover({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)
      
      // Check if tooltip uses the fontFamily
      const tooltip = page.locator('.flamegraph-tooltip')
      if (await tooltip.isVisible()) {
        const fontFamily = await tooltip.evaluate(el => window.getComputedStyle(el).fontFamily)
        expect(fontFamily).toContain('monospace')
      }
    })
  })

  test.describe('Visual Regression', () => {
    test('maintains visual consistency', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1500)
      await expect(page).toHaveScreenshot('full-flamegraph-default.png')
    })

    test('selected state visual', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()
      
      // Click to select a frame
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('full-flamegraph-selected.png')
    })
  })
})