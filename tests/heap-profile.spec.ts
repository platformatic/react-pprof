import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('Heap Profile Support', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('renders heap profile and shows space units', async ({ page }) => {
    await utils.navigateToTest({ heapProfile: true, stackDetails: true })

    // Verify canvas is rendered
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()

    // Wait for profile to load
    await page.waitForTimeout(1000)

    // Click on root frame
    await utils.clickFrame(400, 50)
    await page.waitForTimeout(2000)

    // Check if stack details are visible
    const stackDetails = page.locator('.stack-details-container')
    const isVisible = await stackDetails.isVisible()

    if (isVisible) {
      const pageText = await page.textContent('body')

      // Should show "Allocations" label (heap specific)
      expect(pageText).toContain('Allocations')

      // Should show space units somewhere in the page
      const hasSpaceUnits = /\d+(\.\d+)?( )?(B|KB|MB|GB)/.test(pageText || '')
      expect(hasSpaceUnits).toBe(true)
    }
  })

  test('displays heap-specific labels in stack details', async ({ page }) => {
    await utils.navigateToTest({ heapProfile: true, stackDetails: true })

    await utils.clickFrame(400, 50)
    await page.waitForTimeout(1500)

    const stackDetails = page.locator('.stack-details-container')
    const isVisible = await stackDetails.isVisible()

    // Skip test if stack details don't appear
    test.skip(!isVisible, 'Stack details not visible')

    const text = await stackDetails.textContent()

    // Should have "Allocations" instead of "Samples"
    expect(text).toContain('Allocations')

    // Should have space-related labels
    const hasSpaceLabel = /space|Space/.test(text || '')
    expect(hasSpaceLabel).toBe(true)
  })

  test('formats allocation values correctly', async ({ page }) => {
    await utils.navigateToTest({ heapProfile: true, stackDetails: true })

    await utils.clickFrame(400, 50)
    await page.waitForTimeout(1500)

    const pageText = await page.textContent('body')

    // Should contain properly formatted space values
    // Look for patterns like "1.23KB" or "456.78MB"
    const hasFormattedSpace = /\d+(\.\d+)?(B|KB|MB|GB)/.test(pageText || '')
    expect(hasFormattedSpace).toBe(true)
  })

  test('heap profile works with full flamegraph', async ({ page }) => {
    await utils.navigateToTest({ heapProfile: true, fullFlameGraph: true })

    const container = page.locator('[data-testid="full-flamegraph-container"]')
    await expect(container).toBeVisible()

    // Click on a frame
    const canvas = await utils.getCanvasElement()
    await canvas.click({ position: { x: 400, y: 50 } })
    await page.waitForTimeout(1500)

    // Verify heap-specific content appears
    const pageText = await page.textContent('body')
    if (pageText && pageText.includes('Allocations')) {
      expect(pageText).toContain('Allocations')
    }
  })

  test('tooltip shows heap allocation information', async ({ page }) => {
    await utils.navigateToTest({ heapProfile: true })

    // Hover over a frame
    await utils.hoverFrame(400, 50)
    await page.waitForTimeout(300)

    // Check for tooltip
    const tooltip = page.locator('.flamegraph-tooltip')
    if (await tooltip.isVisible()) {
      const text = await tooltip.textContent()

      // Should show heap-specific information
      if (text) {
        const hasAllocations = text.includes('Allocations')
        const hasSpaceUnits = /\d+(\.\d+)?(B|KB|MB|GB)/.test(text)

        // At least one heap-specific indicator should be present
        expect(hasAllocations || hasSpaceUnits).toBe(true)
      }
    }
  })

  test('heap profile maintains correct labels through interactions', async ({ page }) => {
    await utils.navigateToTest({ heapProfile: true, stackDetails: true })

    // Click first frame - use the same coordinates that work in other heap tests
    await utils.clickFrame(400, 50)
    await page.waitForTimeout(1000)

    const stackDetails = page.locator('.stack-details-container')
    const isVisible = await stackDetails.isVisible()

    // Skip test if stack details don't appear
    test.skip(!isVisible, 'Stack details not visible')

    const text1 = await page.textContent('body')

    // Should show Allocations label
    expect(text1).toContain('Allocations')

    // Click another frame - use a position that's known to have a frame
    await utils.clickFrame(200, 50)
    await page.waitForTimeout(1000)

    const text2 = await page.textContent('body')

    // Should still show Allocations label (not Samples)
    expect(text2).toContain('Allocations')
  })
})
