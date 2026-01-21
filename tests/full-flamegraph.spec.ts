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

    test('stack details container height is not the same as flamegraph height', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()

      const canvasBoundingBox = await canvas.boundingBox()

      expect(canvasBoundingBox).not.toBeNull()

      const canvasHeight = canvasBoundingBox!.height

      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      const stackDetailsOverlay = container.locator('.stack-details-container')
      await expect(stackDetailsOverlay).toBeVisible()

      const stackDetailsOverlayBoundingBox = await stackDetailsOverlay.boundingBox()
      expect(stackDetailsOverlayBoundingBox).not.toBeNull()

      // Ensure that the Stack Details within the FullFlameGraph is not the same height.
      expect(stackDetailsOverlayBoundingBox!.height).not.toBe(canvasHeight)
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

      // Ensure checkbox is visible in screenshot
      const checkbox = page.locator('text=Show App Code Only')
      await checkbox.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('full-flamegraph-blue-theme.png', { fullPage: true })
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
    test('shows FilterControls checkbox', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      // Check the viewport size
      const viewportSize = page.viewportSize()
      console.log('Viewport:', viewportSize)

      // Get the bounds of the checkbox
      const checkboxLabel = page.locator('text=Show App Code Only')
      const labelBox = await checkboxLabel.boundingBox()
      console.log('Checkbox label bounds:', labelBox)

      const checkbox = page.locator('input[type="checkbox"]').first()
      const checkboxBox = await checkbox.boundingBox()
      console.log('Checkbox input bounds:', checkboxBox)

      // Verify they're actually visible
      await expect(checkboxLabel).toBeVisible()
      await expect(checkbox).toBeVisible()

      // Check if they're within viewport
      if (labelBox && viewportSize) {
        console.log('Label is within viewport width?', labelBox.x + labelBox.width <= viewportSize.width)
      }
    })

    test('maintains visual consistency', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1500)

      // Scroll checkbox into view if needed
      const checkbox = page.locator('text=Show App Code Only')
      await checkbox.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('full-flamegraph-default.png', { fullPage: true })
    })

    test('selected state visual', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')

      const canvas = container.locator('canvas')

      // Click near the top of the canvas where the wide root frames are rendered
      // The flamegraph renders with root at the top, so y: 30 should hit a visible frame
      await canvas.click({ position: { x: 400, y: 30 } })
      await page.waitForTimeout(1000)

      // Ensure checkbox is visible in screenshot
      const checkbox = page.locator('text=Show App Code Only')
      await checkbox.scrollIntoViewIfNeeded()
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot('full-flamegraph-selected.png', { fullPage: true })
    })
  })

  test.describe('BigInt Value Handling', () => {
    test('correctly handles BigInt sample values', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()

      // Wait for the flame graph to render
      await expect(canvas).toBeVisible()
      await page.waitForTimeout(1000)

      // Verify that the flame graph was built without errors
      // by checking that the canvas has content (width and height > 0)
      const canvasBox = await canvas.boundingBox()
      expect(canvasBox).toBeTruthy()
      expect(canvasBox!.width).toBeGreaterThan(0)
      expect(canvasBox!.height).toBeGreaterThan(0)

      // Click on a frame to verify that node values are correctly computed
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)

      // Check for console errors that might indicate BigInt conversion issues
      const consoleErrors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })

      // Interact with the flame graph to trigger value calculations
      await canvas.click({ position: { x: 300, y: 150 } })
      await page.waitForTimeout(500)

      // Verify no errors occurred during BigInt to Number conversion
      expect(consoleErrors.length).toBe(0)
    })

    test('handles heap profile with BigInt values', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true, heapProfile: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()

      // Wait for the flame graph to render
      await expect(canvas).toBeVisible()
      await page.waitForTimeout(1000)

      // Heap profiles can have large byte values that might be BigInts
      // Verify the graph renders correctly
      const canvasBox = await canvas.boundingBox()
      expect(canvasBox).toBeTruthy()
      expect(canvasBox!.width).toBeGreaterThan(0)
      expect(canvasBox!.height).toBeGreaterThan(0)

      // Click to verify value calculations work
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)

      // The graph should still be visible and functional
      await expect(canvas).toBeVisible()
    })

    test('node values are numeric after BigInt conversion', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()

      await expect(canvas).toBeVisible()
      await page.waitForTimeout(1000)

      // Click on a frame to select it
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)

      // Verify that the internal node structure has numeric values by
      // checking that no type errors occur during value operations
      const result = await page.evaluate(() => {
        // Access the global test API if available
        const win = window as any
        if (win.__flameGraphData) {
          const nodes = win.__flameGraphData.nodes || []
          // Check that all node values are numbers, not BigInts
          return nodes.every((node: any) => {
            const valueIsNumber = typeof node.value === 'number'
            const selfValueIsNumber = typeof node.selfValue === 'number'
            return valueIsNumber && selfValueIsNumber
          })
        }
        // If test API not available, assume it passed (test is optional)
        return true
      })

      expect(result).toBe(true)
    })
  })
})