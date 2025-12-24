import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Edge Cases Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('top frames remain visible after dragging in fixed height mode', async ({ page }) => {
    // This tests the fix for the bug where camera.y could become negative
    // when in fixed height mode but content fits in viewport (not scrollable),
    // causing top flamegraph bars to disappear.
    await utils.navigateToTest()

    const canvas = await utils.getCanvasElement()
    const box = await canvas.boundingBox()
    expect(box).not.toBeNull()

    // Take a screenshot before dragging to capture the initial state
    await expect(page).toHaveScreenshot('before-drag-fixed-height.png')

    // Perform a drag operation that would push content up (drag downward)
    // In the buggy version, this would set camera.y to a negative value
    const startX = box!.x + box!.width / 2
    const startY = box!.y + box!.height / 2
    const endY = box!.y + box!.height - 50 // Drag down significantly

    await page.mouse.move(startX, startY)
    await page.mouse.down()
    await page.mouse.move(startX, endY, { steps: 10 })
    await page.mouse.up()

    await page.waitForTimeout(500)

    // Take a screenshot after dragging - top frames should still be visible
    // The fix ensures camera.y stays at 0 when content fits in viewport
    await expect(page).toHaveScreenshot('after-drag-fixed-height.png')

    // Verify the canvas is still fully visible and functional
    await expect(canvas).toBeVisible()

    // Click on the root frame area to verify it's still interactive
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await page.waitForTimeout(500)

    // The flamegraph should still be functional
    await expect(canvas).toBeVisible()
  })

  test('top frames remain visible after fullscreen resize', async ({ page }) => {
    // Test that going fullscreen doesn't cause top frames to disappear
    await utils.navigateToTest()

    const canvas = await utils.getCanvasElement()

    // Initial state
    await expect(canvas).toBeVisible()
    await expect(page).toHaveScreenshot('before-fullscreen.png')

    // Simulate fullscreen by changing to a larger viewport
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.waitForTimeout(1000)

    // Top frames should still be visible at the top of the canvas
    await expect(canvas).toBeVisible()
    await expect(page).toHaveScreenshot('after-fullscreen.png')

    // Verify the root frame is still clickable at the top
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await page.waitForTimeout(500)

    await expect(canvas).toBeVisible()
  })

  test('handles extreme zoom levels', async ({ page }) => {
    await utils.navigateToTest()

    // Zoom in multiple times
    for (let i = 0; i < 5; i++) {
      await utils.clickFrame(200, 50 + i * 20)
      await page.waitForTimeout(500)
    }

    await expect(page).toHaveScreenshot('extreme-zoom-in.png')

    // Click on a higher level frame to zoom out partially
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await expect(page).toHaveScreenshot('extreme-zoom-out.png')
  })

  test('handles mouse leave during interactions', async ({ page }) => {
    await utils.navigateToTest()

    // Start hover
    await utils.hoverFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
    await utils.waitForTooltip()

    // Move mouse outside
    await page.mouse.move(50, 50)
    await page.waitForTimeout(1000)

    // Should still be functional
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)

    await expect(page).toHaveScreenshot('after-mouse-leave.png')
  })

  test('handles window focus changes', async ({ page }) => {
    await utils.navigateToTest()

    // Simulate focus loss and regain
    await page.evaluate(() => {
      window.dispatchEvent(new Event('blur'))
      setTimeout(() => window.dispatchEvent(new Event('focus')), 100)
    })

    await page.waitForTimeout(500)

    // Should still be functional
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)

    await expect(page).toHaveScreenshot('after-focus-change.png')
  })
})
