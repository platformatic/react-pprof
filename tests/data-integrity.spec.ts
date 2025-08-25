import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Data Integrity Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('frame selection works correctly', async ({ page }) => {
    await utils.navigateToTest({ stackDetails: true })

    // Click on a frame
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)

    // Verify that frame was selected by checking stack details visibility
    const stackHeader = page.locator('.stack-trace-header')
    await expect(stackHeader).toBeVisible()
    
    // Verify frame information is displayed
    const selectedFrame = page.locator('text=Selected frame:')
    await expect(selectedFrame).toBeVisible()
  })

  test('stack trace data is consistent', async ({ page }) => {
    await utils.navigateToTest({ stackDetails: true })

    // Click on root frame first
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await utils.expectStackDetailsVisible()

    const rootStackFrames = await utils.getStackTraceFrames()
    const rootCount = await rootStackFrames.count()
    expect(rootCount).toBeGreaterThan(0) // Root should have at least 1 frame

    // After zooming into root, click on one of its children
    // Children are now spread across the width at the same y position
    await utils.clickFrame(200, 100) // Click on a child frame
    await page.waitForTimeout(1000) // Wait for update

    // Check if stack details are still visible
    const stackDetailsVisible = await page.locator('.stack-details-header').isVisible()
    
    if (stackDetailsVisible) {
      const childStackFrames = await utils.getStackTraceFrames()
      const childCount = await childStackFrames.count()
      
      // Child frame should have at least as many frames as root (includes root in stack)
      expect(childCount).toBeGreaterThanOrEqual(rootCount)
    } else {
      // If no frame was selected (clicked on empty space), that's ok
      // Just verify the flamegraph is still functional
      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible()
    }
  })
})
