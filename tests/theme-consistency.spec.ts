import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Theme Consistency Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('all themes render correctly', async ({ page }) => {
    const themes = ['default', 'blue', 'small']

    for (const theme of themes) {
      await utils.navigateToTest({ mode: theme })
      
      const canvas = await utils.getCanvasElement()
      await expect(canvas).toBeVisible()
      
      // Test interaction on each theme
      await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
      
      await expect(page).toHaveScreenshot(`theme-${theme}.png`)
    }
  })

  test('interactions work consistently across themes', async ({ page }) => {
    const themes = ['default', 'blue']

    for (const theme of themes) {
      await utils.navigateToTest({ mode: theme })
      
      // Test hover
      await utils.hoverFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
      await utils.waitForTooltip()
      
      // Test click
      await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)
      
      // Click another frame to change selection
      await utils.clickFrame(COMMON_POSITIONS.SECOND_CHILD.x, COMMON_POSITIONS.SECOND_CHILD.y)
      
      await expect(page).toHaveScreenshot(`interaction-${theme}.png`)
    }
  })
})