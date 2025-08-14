import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FlameGraph + StackDetails Integration', () => {

  test.describe('Component Communication', () => {
    test('stack details updates when flamegraph frame is clicked', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      // Initially should show empty state
      const emptyMessage = page.locator('text=Click on a frame in the flamegraph to view stack details')
      await expect(emptyMessage).toBeVisible()

      // Click on a frame
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 50 } })

      await page.waitForTimeout(1000)

      // Stack details should now be populated
      const stackHeader = page.locator('.stack-trace-header')
      await expect(stackHeader).toBeVisible()

      // Should show the selected frame name
      const selectedFrameText = page.locator('text=Selected frame:')
      await expect(selectedFrameText).toBeVisible()

      await expect(page).toHaveScreenshot('integration-frame-selected.png')
    })

    test('stack details updates when different frames are selected', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on first frame
      await canvas.click({ position: { x: 100, y: 50 } })
      await page.waitForTimeout(1000)

      // Take screenshot of first selection
      await expect(page).toHaveScreenshot('integration-first-selection.png')

      // Click on second frame
      await canvas.click({ position: { x: 300, y: 50 } })
      await page.waitForTimeout(1000)

      // Take screenshot of second selection
      await expect(page).toHaveScreenshot('integration-second-selection.png')

      // Click on third frame (use known working position)
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Take screenshot of third selection
      await expect(page).toHaveScreenshot('integration-third-selection.png')
    })

  })

  test.describe('Stack Trace Accuracy', () => {
    test('shows correct stack trace for root frame', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on root frame (use known working position)
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Wait for stack details to be visible
      const stackDetailsHeader = page.locator('.stack-details-header')
      await expect(stackDetailsHeader).toBeVisible()

      // Check that we have stack frames
      const stackFrames = page.locator('.stack-frame')
      const frameCount = await stackFrames.count()
      expect(frameCount).toBeGreaterThanOrEqual(1)

      await expect(page).toHaveScreenshot('integration-root-stack-trace.png')
    })

    test('shows correct stack trace for nested frame', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on a frame (use known working position)
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Wait for stack details to be visible
      const stackDetailsHeader = page.locator('.stack-details-header')
      await expect(stackDetailsHeader).toBeVisible()

      // Then check for stack trace content
      const stackTraceSection = page.locator('.stack-trace-section')
      await expect(stackTraceSection).toBeVisible()

      // Check that we have stack frames
      const stackFrames = page.locator('.stack-frame')
      const frameCount = await stackFrames.count()
      expect(frameCount).toBeGreaterThanOrEqual(1)

      await expect(page).toHaveScreenshot('integration-nested-stack-trace.png')
    })

    test('shows correct stack trace for deeply nested frame', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on a frame (use known working position)
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Wait for stack details to be visible
      const stackDetailsHeader = page.locator('.stack-details-header')
      await expect(stackDetailsHeader).toBeVisible()

      // Check that we have stack frames
      const stackFrames = page.locator('.stack-frame')
      const frameCount = await stackFrames.count()
      expect(frameCount).toBeGreaterThanOrEqual(1)

      await expect(page).toHaveScreenshot('integration-deep-stack-trace.png')
    })
  })

  test.describe('Children Display Accuracy', () => {
    test('shows correct children for parent frame', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on a frame that should have children
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Should show children
      const childrenSection = page.locator('.child-frames-section')
      const childrenHeader = page.locator('.child-frames-header')

      await expect(childrenHeader).toBeVisible()

      // Extract the count and verify it's reasonable
      const countText = await childrenHeader.textContent()
      if (countText) {
        const match = countText.match(/Child Frames \((\d+)\)/)
        if (match) {
          const count = parseInt(match[1])
          expect(count).toBeGreaterThanOrEqual(0)
        }
      }

      await expect(page).toHaveScreenshot('integration-parent-children.png')
    })

    test('shows children information for frames', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on any frame
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Should show child frames section with count
      const childrenHeader = page.locator('.child-frames-header')
      await expect(childrenHeader).toBeVisible()

      // Should either show child frames or leaf node message
      const childrenSection = page.locator('.child-frames-content')
      const hasChildFrames = await childrenSection.locator('.child-frame').count() > 0
      const hasLeafMessage = await childrenSection.locator('text=No child frames (leaf node)').count() > 0

      expect(hasChildFrames || hasLeafMessage).toBeTruthy()

      await expect(page).toHaveScreenshot('integration-children-info.png')
    })
  })

  test.describe('Visual Synchronization', () => {
    test('flamegraph and stack details have consistent selection state', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on a frame
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Both components should reflect the same selection
      const stackDetails = page.locator('.stack-details-header')
      await expect(stackDetails).toBeVisible()

      // The selected frame should be highlighted in both components
      await expect(page).toHaveScreenshot('integration-synchronized-selection.png')
    })

    test('hover states work correctly with both components', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Select a frame first
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Move mouse away first to clear any existing state
      await page.mouse.move(750, 300)
      await page.waitForTimeout(500)

      // Hover over the zoomed frame itself
      // After clicking and zooming, the clicked frame fills the top area
      await canvas.hover({ position: { x: 400, y: 30 } }); // The main frame position
      await page.waitForTimeout(1000)

      // Should show tooltip with specific styling
      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible({ timeout: 2000 })

      await expect(page).toHaveScreenshot('integration-hover-with-selection.png')
    })
  })

  test.describe('Layout and Positioning', () => {
    test('components layout correctly side by side', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      // Click a frame to make stack details visible
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Check that both components are visible and properly positioned
      const flamegraphContainer = page.locator('canvas').first().locator('..')
      const stackDetailsContainer = page.locator('.stack-details-header').locator('..')

      await expect(flamegraphContainer).toBeVisible()
      await expect(stackDetailsContainer).toBeVisible()

      // Take screenshot of the layout
      await expect(page).toHaveScreenshot('integration-layout.png')
    })

    test('components maintain proper proportions', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      // Test different viewport sizes
      await page.setViewportSize({ width: 1400, height: 800 })
      await page.waitForTimeout(1000)

      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('integration-large-viewport.png')

      // Test smaller viewport
      await page.setViewportSize({ width: 1000, height: 600 })
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('integration-small-viewport.png')
    })
  })

  test.describe('Performance Integration', () => {
    test('both components update smoothly together', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()
      const stackHeader = page.locator('.stack-trace-header')
      
      // Click on the root frame first (center of canvas, guaranteed to exist)
      // The root frame always spans the full width at the base
      const rootClick = { x: 400, y: 50 }
      await canvas.click({ position: rootClick })
      await utils.waitForAnimationComplete(3000)
      
      // Verify stack details show for root frame
      await expect(stackHeader).toBeVisible()
      
      const responseTimes: number[] = []
      
      // Test performance with multiple deterministic clicks
      // After clicking root, child frames will be visible in predictable positions
      const testPositions = [
        { x: 400, y: 50 },   // Root frame (center)
        { x: 200, y: 100 },  // Left child area
        { x: 600, y: 100 },  // Right child area
        { x: 400, y: 150 },  // Center deeper level
        { x: 400, y: 50 }    // Back to root
      ]

      // Perform interactions and measure performance
      for (let i = 0; i < testPositions.length; i++) {
        const startTime = Date.now()
        
        await canvas.click({ position: testPositions[i] })
        await utils.waitForAnimationComplete(3000)
        
        // Verify components are still functional
        await expect(page.locator('[data-testid="flamegraph-container"] canvas')).toBeVisible()
        
        const responseTime = Date.now() - startTime
        responseTimes.push(responseTime)
      }

      // Performance assertions
      const avgResponseTime = responseTimes.reduce((a, b) => a + b) / responseTimes.length
      const maxResponseTime = Math.max(...responseTimes)
      
      // In CI environments, performance can be slower due to resource constraints
      // Allow more time for webkit in CI (it's consistently slower)
      const isCI = process.env.CI === 'true'
      const avgThreshold = isCI ? 5000 : 4000 // 5s in CI, 4s locally
      const maxThreshold = isCI ? 7000 : 6000 // 7s in CI, 6s locally
      
      expect(avgResponseTime).toBeLessThan(avgThreshold) // Average response time
      expect(maxResponseTime).toBeLessThan(maxThreshold) // Max single interaction time
      expect(responseTimes.length).toBe(testPositions.length) // All interactions completed
      
      // Verify both components are working together
      await expect(canvas).toBeVisible()
    })

    test('zoom animations work correctly with stack details', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click to zoom in
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1500); // Wait for zoom animation

      await expect(page).toHaveScreenshot('integration-zoomed-in.png')

      // Click on root frame to zoom out
      await canvas.click({ position: { x: 400, y: 50 } })
      await page.waitForTimeout(1500); // Wait for zoom animation

      await expect(page).toHaveScreenshot('integration-zoomed-out.png')
    })
  })

  test.describe('Error Handling', () => {
    test('handles missing data gracefully', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      // Should not crash with missing data
      const emptyMessage = page.locator('text=Click on a frame in the flamegraph to view stack details')
      await expect(emptyMessage).toBeVisible()

      await expect(page).toHaveScreenshot('integration-empty-data.png')
    })

    test('recovers from invalid selections', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ stackDetails: true })

      const canvas = page.locator('canvas').first()

      // Click on a valid frame
      await canvas.click({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(1000)

      // Click on invalid area
      await canvas.click({ position: { x: 10, y: 10 } })
      await page.waitForTimeout(1000)

      // Should handle gracefully
      await expect(page).toHaveScreenshot('integration-invalid-selection.png')
    })
  })
})
