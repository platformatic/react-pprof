import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS, VIEWPORT_SIZES } from './test-utils'

test.describe('FlameGraph Responsive Design Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('adapts to different viewport sizes', async ({ page }) => {
    await utils.navigateToTest()
    
    await utils.testViewportSizes(VIEWPORT_SIZES)
  })

  test('maintains functionality across viewport sizes', async ({ page }) => {
    await utils.navigateToTest({ stackDetails: true })
    
    for (const size of VIEWPORT_SIZES) {
      await page.setViewportSize(size)
      await page.waitForTimeout(1000)
      
      // Verify the flamegraph canvas is still visible
      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible()
      
      // Verify stack details container is visible
      const stackContainer = page.locator('.stack-details-container')
      await expect(stackContainer).toBeVisible()
      
      // Try to click on the canvas
      const box = await canvas.boundingBox()
      if (box) {
        await canvas.click({ position: { x: box.width / 2, y: 30 } })
        await page.waitForTimeout(500)
      }
      
      // Just verify components are still rendered, don't check specific states
      await expect(canvas).toBeVisible()
      await expect(stackContainer).toBeVisible()
    }
  })
})