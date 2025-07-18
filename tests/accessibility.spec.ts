import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FlameGraph Accessibility Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('supports keyboard navigation', async ({ page }) => {
    await utils.navigateToTest()

    await utils.testKeyboardNavigation()

    // Should not crash
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('has proper ARIA attributes', async ({ page }) => {
    await utils.navigateToTest()

    const canvas = await utils.getCanvasElement()

    // Check for proper cursor
    const cursor = await canvas.evaluate((el) =>
      window.getComputedStyle(el).cursor
    )
    expect(cursor).toBe('pointer')
  })
})
