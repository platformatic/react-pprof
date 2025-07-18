import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Edge Cases Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('handles extreme zoom levels', async ({ page }) => {
    await utils.navigateToTest()

    // Zoom in multiple times
    for (let i = 0; i < 5; i++) {
      await utils.clickFrame(200, 50 + i * 20)
      await page.waitForTimeout(500)
    }

    await expect(page).toHaveScreenshot('extreme-zoom-in.png', {
      maxDiffPixels: 1000,
      threshold: 0.3,
    })

    // Click on a higher level frame to zoom out partially
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await expect(page).toHaveScreenshot('extreme-zoom-out.png', {
      maxDiffPixels: 1000,
      threshold: 0.3,
    })
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

    await expect(page).toHaveScreenshot('after-mouse-leave.png', {
      maxDiffPixels: 1000,
      threshold: 0.3,
    })
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

    await expect(page).toHaveScreenshot('after-focus-change.png', {
      maxDiffPixels: 1000,
      threshold: 0.3,
    })
  })
})
