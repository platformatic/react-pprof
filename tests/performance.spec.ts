import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Performance Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('handles rapid interactions smoothly', async ({ page }) => {
    await utils.navigateToTest()

    const positions = [
      COMMON_POSITIONS.FIRST_CHILD,
      COMMON_POSITIONS.SECOND_CHILD,
      COMMON_POSITIONS.DEEP_FRAME,
      COMMON_POSITIONS.DEEPER_FRAME,
      COMMON_POSITIONS.ROOT_FRAME
    ]

    // Perform rapid interactions
    await utils.rapidInteractions(positions, 50)

    // Should still be responsive - check that we can still click
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
    await page.waitForTimeout(500)

    // Verify the flamegraph is still functional
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()

    await expect(page).toHaveScreenshot('performance-after-rapid-interactions.png', {
      maxDiffPixels: 25000,
      threshold: 0.5
    })
  })

  test('maintains WebGL context health', async ({ page }) => {
    await utils.navigateToTest()

    // Perform stress test
    for (let i = 0; i < 20; i++) {
      await utils.clickFrame(100 + i * 10, 50)
      await page.waitForTimeout(50)
    }

    // Check WebGL health
    const webglHealth = await utils.checkWebGLHealth()
    expect(webglHealth).toBeDefined()
    expect(webglHealth?.contextLost).toBe(false)
  })

  test('measures render performance', async ({ page }) => {
    await utils.navigateToTest()

    const performance = await utils.measurePerformance()

    // Should render within reasonable time
    expect(performance.renderTime).toBeLessThan(5000)
  })
})
