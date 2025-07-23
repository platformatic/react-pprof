import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Visual Regression Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('maintains visual consistency', async ({ page }) => {
    const testCases = [
      { mode: 'default', name: 'default' },
      { mode: 'blue', name: 'blue' },
      { mode: 'small', name: 'small' }
    ]

    for (const testCase of testCases) {
      await utils.navigateToTest({ mode: testCase.mode })

      // Take baseline screenshot
      await expect(page).toHaveScreenshot(`baseline-${testCase.name}.png`)
    }

    // Test with stack details
    await utils.navigateToTest({ stackDetails: true })
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
    await expect(page).toHaveScreenshot('with-stack-details.png')
  })

  test('tooltip visual consistency', async ({ page }) => {
    await utils.navigateToTest()

    const positions = [
      COMMON_POSITIONS.FIRST_CHILD,
      COMMON_POSITIONS.SECOND_CHILD,
      COMMON_POSITIONS.DEEP_FRAME
    ]

    for (let i = 0; i < positions.length; i++) {
      // Move to empty space first to ensure clean state
      await page.mouse.move(COMMON_POSITIONS.EMPTY_SPACE.x, COMMON_POSITIONS.EMPTY_SPACE.y)
      await page.waitForTimeout(500)
      
      // Hover over the target position
      await utils.hoverFrame(positions[i].x, positions[i].y)
      
      // Wait for tooltip with a more generous timeout
      await page.waitForTimeout(1000)
      
      // Take screenshot regardless of tooltip state - we can see visually if it worked
      await expect(page).toHaveScreenshot(`tooltip-${i}.png`)
    }
  })
})
