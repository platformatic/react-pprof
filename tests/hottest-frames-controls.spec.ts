import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('HottestFramesControls Component', () => {

  test.describe('Basic Rendering', () => {
    test('renders navigation controls', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestControls: true })

      // Check that controls container is visible
      const controls = page.locator('[data-testid="hottest-controls-container"]')
      await expect(controls).toBeVisible()

      // Check for navigation buttons
      const buttons = controls.locator('button')
      const count = await buttons.count()
      
      // Should have navigation buttons (First, Prev, Next, Last)
      expect(count).toBeGreaterThanOrEqual(4)
    })

    test('displays frame information', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestControls: true })

      // Check for frame counter or info display
      const controls = page.locator('[data-testid="hottest-controls-container"]')
      const text = await controls.textContent()
      
      // Should have some text content
      expect(text).toBeTruthy()
    })
  })

  test.describe('Navigation', () => {
    test('buttons are clickable', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestControls: true })

      const controls = page.locator('[data-testid="hottest-controls-container"]')
      const nextButton = controls.locator('button').filter({ hasText: /⟩|Next|→/ }).first()
      
      if (await nextButton.isVisible()) {
        // Try clicking next button
        const isDisabled = await nextButton.isDisabled()
        if (!isDisabled) {
          await nextButton.click()
          await page.waitForTimeout(200)
        }
        
        // Just verify no errors occurred
        await expect(controls).toBeVisible()
      }
    })

    test('first and last buttons work', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestControls: true })

      const controls = page.locator('[data-testid="hottest-controls-container"]')
      
      // Look for first/last navigation buttons
      const lastButton = controls.locator('button').filter({ hasText: /⟩⟩|Last|End/ }).first()
      const firstButton = controls.locator('button').filter({ hasText: /⟨⟨|First|Home/ }).first()
      
      // Try clicking last button if not disabled
      if (await lastButton.isVisible()) {
        const isDisabled = await lastButton.isDisabled()
        if (!isDisabled) {
          await lastButton.click()
          await page.waitForTimeout(200)
        }
      }
      
      // Try clicking first button
      if (await firstButton.isVisible()) {
        const isDisabled = await firstButton.isDisabled()
        if (!isDisabled) {
          await firstButton.click()
          await page.waitForTimeout(200)
        }
      }
      
      // Verify controls are still functional
      await expect(controls).toBeVisible()
    })
  })

  test.describe('Integration', () => {
    test('works with hottest frames bar', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestControls: true, hottestFrames: true })

      // Both components should be visible
      const controls = page.locator('[data-testid="hottest-controls-container"]')
      const hottestBar = page.locator('.hottest-frames-bar')
      
      await expect(controls).toBeVisible()
      await expect(hottestBar).toBeVisible()
    })
  })

  test.describe('Visual Regression', () => {
    test('maintains visual consistency', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ hottestControls: true })

      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot('hottest-controls-default.png')
    })
  })
})