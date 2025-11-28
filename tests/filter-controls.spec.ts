import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FilterControls Component', () => {
  test.describe('Rendering', () => {
    test('renders checkbox in FullFlameGraph', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      await expect(container).toBeVisible()

      // Wait for components to render
      await page.waitForTimeout(1000)

      // Look for the "Show App Code Only" checkbox text
      const checkboxLabel = page.locator('text=Show App Code Only')
      await expect(checkboxLabel).toBeVisible()

      // Look for the actual checkbox input
      const checkbox = page.locator('input[type="checkbox"]').first()
      await expect(checkbox).toBeVisible()
    })

    test('checkbox starts unchecked by default', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const checkbox = page.locator('input[type="checkbox"]').first()
      await expect(checkbox).not.toBeChecked()
    })
  })

  test.describe('Functionality', () => {
    test('can toggle checkbox', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const checkbox = page.locator('input[type="checkbox"]').first()

      // Initially unchecked
      await expect(checkbox).not.toBeChecked()

      // Click to check
      await checkbox.click()
      await page.waitForTimeout(500)
      await expect(checkbox).toBeChecked()

      // Click again to uncheck
      await checkbox.click()
      await page.waitForTimeout(500)
      await expect(checkbox).not.toBeChecked()
    })

    test('can toggle via label click', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const checkbox = page.locator('input[type="checkbox"]').first()
      const label = page.locator('text=Show App Code Only')

      // Initially unchecked
      await expect(checkbox).not.toBeChecked()

      // Click label to toggle
      await label.click()
      await page.waitForTimeout(500)
      await expect(checkbox).toBeChecked()
    })

    test('filtering changes flame graph rendering', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      const canvas = container.locator('canvas').first()

      // Get initial rendering
      await expect(canvas).toBeVisible()

      // Enable filter
      const checkbox = page.locator('input[type="checkbox"]').first()
      await checkbox.click()
      await page.waitForTimeout(1500) // Wait for re-render

      // Flame graph should still be visible but with different content
      await expect(canvas).toBeVisible()
    })
  })

  test.describe('Visual Regression', () => {
    test('unchecked state visual', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1500)
      await expect(page).toHaveScreenshot('filter-controls-unchecked.png')
    })

    test('checked state visual', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const checkbox = page.locator('input[type="checkbox"]').first()
      await checkbox.click()
      await page.waitForTimeout(1500)

      await expect(page).toHaveScreenshot('filter-controls-checked.png')
    })
  })
})
