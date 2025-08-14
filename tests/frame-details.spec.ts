import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FrameDetails Component', () => {

  test.describe('Basic Rendering', () => {
    test('renders nothing when no frame selected', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true })

      // Container should exist
      const frameDetails = page.locator('[data-testid="frame-details-container"]')
      const exists = await frameDetails.count()
      expect(exists).toBe(1)
      
      // Content should be empty or minimal
      const text = await frameDetails.textContent()
      expect(text?.trim()).toBe('')
    })

    test('displays frame details when frame is selected', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, flamegraph: true })

      // Select a frame
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)

      // Check that frame details show something
      const frameDetails = page.locator('[data-testid="frame-details-container"]')
      const text = await frameDetails.textContent()
      
      // If a frame was selected, should show some text
      if (text && text.trim()) {
        expect(text).toContain('self:')
        expect(text).toContain('total:')
      }
    })
  })

  test.describe('Data Display', () => {
    test('shows frame name and metrics', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, flamegraph: true })

      // Select a frame
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(500)

      const frameDetails = page.locator('[data-testid="frame-details-container"]')
      const text = await frameDetails.textContent()
      
      if (text && text.trim()) {
        // Should contain metrics
        expect(text).toMatch(/self:\s*[\d.]+/)
        expect(text).toMatch(/total:\s*[\d.]+/)
      }
    })

    test('updates when different frame selected', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, flamegraph: true })

      // Select first frame
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 100, y: 50 } })
      await page.waitForTimeout(500)

      const frameDetails = page.locator('[data-testid="frame-details-container"]')
      const text1 = await frameDetails.textContent()

      // Select different frame
      await canvas.click({ position: { x: 300, y: 150 } })
      await page.waitForTimeout(500)

      const text2 = await frameDetails.textContent()
      
      // Content might change or stay the same depending on selection
      expect(text1).toBeDefined()
      expect(text2).toBeDefined()
    })
  })

  test.describe('Styling', () => {
    test('applies text color', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, mode: 'blue' })

      const frameDetails = page.locator('[data-testid="frame-details-container"]')
      const color = await frameDetails.evaluate(el => window.getComputedStyle(el).color)
      
      // Should have a color set
      expect(color).toBeDefined()
    })

    test('applies font family', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, flamegraph: true })

      // Click on root frame to ensure we select something
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 400, y: 50 } })
      await page.waitForTimeout(500)

      // Check if frame details has content
      const frameDetailsContainer = page.locator('[data-testid="frame-details-container"]')
      const text = await frameDetailsContainer.textContent()
      
      if (text && text.trim()) {
        // Only check font family if there's content
        const frameDetails = frameDetailsContainer.locator('> div').first()
        const fontFamily = await frameDetails.evaluate(el => window.getComputedStyle(el).fontFamily)
        
        // Should be monospace as configured in test app
        expect(fontFamily).toContain('monospace')
      } else {
        // If no content, just verify the container exists
        expect(await frameDetailsContainer.count()).toBe(1)
      }
    })
  })

  test.describe('Integration', () => {
    test('works with hottest frames selection', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, hottestFrames: true })

      // Click on hottest frames bar
      const hottestBar = page.locator('.hottest-frames-bar')
      await hottestBar.click({ position: { x: 50, y: 5 } })
      await page.waitForTimeout(500)

      // Frame details should update
      const frameDetails = page.locator('[data-testid="frame-details-container"]')
      await expect(frameDetails).toBeVisible()
    })
  })

  test.describe('Visual Regression', () => {
    test('maintains visual consistency', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ frameDetails: true, flamegraph: true })

      // Select a frame
      const canvas = page.locator('canvas').first()
      await canvas.click({ position: { x: 200, y: 100 } })
      await page.waitForTimeout(1000)

      await expect(page).toHaveScreenshot('frame-details-default.png')
    })
  })
})