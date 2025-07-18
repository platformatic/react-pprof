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
      
      // Test that interactions still work
      await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
      await utils.expectStackDetailsVisible()
      
      // Switch to a different frame instead of trying to clear
      await utils.clickFrame(COMMON_POSITIONS.SECOND_CHILD.x, COMMON_POSITIONS.SECOND_CHILD.y)
      await utils.expectStackDetailsVisible()
    }
  })
})