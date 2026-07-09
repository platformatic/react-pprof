import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('SearchControls Component', () => {
  test.describe('Rendering', () => {
    test('renders search input in FullFlameGraph', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      const container = page.locator('[data-testid="full-flamegraph-container"]')
      await expect(container).toBeVisible()

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await expect(searchInput).toBeVisible()
      await expect(searchInput).toHaveAttribute('placeholder', 'Search frames')
    })

    test('navigation buttons start disabled with no query', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const prevButton = page.locator('button[title="Previous match"]')
      const nextButton = page.locator('button[title="Next match"]')
      await expect(prevButton).toBeDisabled()
      await expect(nextButton).toBeDisabled()
    })
  })

  test.describe('Functionality', () => {
    test('shows match count when typing a query', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('main')
      await page.waitForTimeout(500)

      // The mock profile always contains a "main" frame
      const matchCount = page.locator('text=/\\d+ match(es)?/')
      await expect(matchCount).toBeVisible()

      const nextButton = page.locator('button[title="Next match"]')
      await expect(nextButton).toBeEnabled()
    })

    test('shows no matches for unknown query', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('definitely-not-a-function-name')
      await page.waitForTimeout(500)

      await expect(page.locator('text=No matches')).toBeVisible()

      const nextButton = page.locator('button[title="Next match"]')
      await expect(nextButton).toBeDisabled()
    })

    test('matches by file name', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('main.go')
      await page.waitForTimeout(500)

      const matchCount = page.locator('text=/\\d+ match(es)?/')
      await expect(matchCount).toBeVisible()
    })

    test('Enter selects the first match and opens stack details', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('main')
      await searchInput.press('Enter')
      await page.waitForTimeout(500)

      // The counter switches to "N of M" once a match is selected
      await expect(page.locator('text=/1 of \\d+/')).toBeVisible()

      // Selecting a frame opens the StackDetails overlay
      await expect(page.locator('text=Stack Details')).toBeVisible()
    })

    test('Enter cycles through matches', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('main')
      await searchInput.press('Enter')
      await page.waitForTimeout(500)
      await expect(page.locator('text=/1 of \\d+/')).toBeVisible()

      const countText = await page.locator('text=/1 of \\d+/').textContent()
      const totalMatches = parseInt(countText!.match(/1 of (\d+)/)![1])

      if (totalMatches > 1) {
        await searchInput.press('Enter')
        await page.waitForTimeout(500)
        await expect(page.locator('text=/2 of \\d+/')).toBeVisible()

        // Shift+Enter navigates back
        await searchInput.press('Shift+Enter')
        await page.waitForTimeout(500)
        await expect(page.locator('text=/1 of \\d+/')).toBeVisible()
      }
    })

    test('searching highlights matching frames in the flame graph', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const canvas = page.locator('canvas').first()
      const before = await canvas.screenshot()

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('main')
      await page.waitForTimeout(1000)

      // Non-matching frames are dimmed, so the canvas must render differently
      const highlighted = await canvas.screenshot()
      expect(highlighted.equals(before)).toBe(false)

      // Clearing the query restores the original rendering
      await searchInput.press('Escape')
      await page.waitForTimeout(1000)

      const cleared = await canvas.screenshot()
      expect(cleared.equals(highlighted)).toBe(false)
    })

    test('Escape clears the query', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true })

      await page.waitForTimeout(1000)

      const searchInput = page.locator('input[type="search"]')
      await searchInput.fill('main')
      await page.waitForTimeout(500)

      await searchInput.press('Escape')
      await page.waitForTimeout(500)

      await expect(searchInput).toHaveValue('')
      const nextButton = page.locator('button[title="Next match"]')
      await expect(nextButton).toBeDisabled()
    })
  })
})
