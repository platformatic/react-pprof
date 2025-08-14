import { test, expect } from '@playwright/test'

test.describe('FlameGraphTooltip Component', () => {
  test.describe('Visual Appearance', () => {
    test('tooltip appears on hover in flamegraph', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      // Hover over a frame
      const canvas = page.locator('canvas').first()
      await canvas.hover({ position: { x: 200, y: 50 } })

      // Wait for tooltip
      await page.waitForTimeout(500)

      // Check tooltip is visible
      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      // Check tooltip content - no more 'Function:' prefix
      await expect(tooltip.locator('text=Value:')).toBeVisible()
      await expect(tooltip.locator('text=Width:')).toBeVisible()
      await expect(tooltip.locator('text=Depth:')).toBeVisible()
    })

    test('tooltip has correct styling', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      // Hover over a frame
      const canvas = page.locator('canvas').first()
      await canvas.hover({ position: { x: 200, y: 50 } })

      // Wait for tooltip
      await page.waitForTimeout(500)

      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      // Check background - should be white now
      const bgColor = await tooltip.evaluate(el =>
        window.getComputedStyle(el).backgroundColor
      )
      expect(bgColor).toMatch(/rgb\(255,\s*255,\s*255\)|white/)

      // Check border radius
      const borderRadius = await tooltip.evaluate(el =>
        window.getComputedStyle(el).borderRadius
      )
      expect(borderRadius).toBe('6px')

      // Check z-index
      const zIndex = await tooltip.evaluate(el =>
        window.getComputedStyle(el).zIndex
      )
      expect(zIndex).toBe('1000')

      // Check pointer events
      const pointerEvents = await tooltip.evaluate(el =>
        window.getComputedStyle(el).pointerEvents
      )
      expect(pointerEvents).toBe('none')
      
      // Check text color - should be black
      const textColor = await tooltip.evaluate(el =>
        window.getComputedStyle(el).color
      )
      expect(textColor).toMatch(/rgb\(0,\s*0,\s*0\)|black/)
    })

    test('tooltip uses configured font family', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      // Hover over a frame
      const canvas = page.locator('canvas').first()
      await canvas.hover({ position: { x: 200, y: 50 } })

      // Wait for tooltip
      await page.waitForTimeout(1000)

      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible({ timeout: 5000 })

      // Check font family - test app uses monospace
      const fontFamily = await tooltip.evaluate(el =>
        window.getComputedStyle(el).fontFamily
      )
      // Test app configures monospace font
      expect(fontFamily.toLowerCase()).toContain('monospace')
    })

    test('tooltip disappears when mouse leaves frame', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      const canvas = page.locator('canvas').first()

      // Hover over a frame
      await canvas.hover({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(500)

      // Check tooltip is visible
      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      // Move mouse away
      await page.mouse.move(750, 300)
      await page.waitForTimeout(500)

      // Tooltip should be hidden
      await expect(tooltip).toBeHidden()
    })

    test('tooltip content updates when hovering different frames', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      const canvas = page.locator('canvas').first()
      const tooltip = page.locator('.flamegraph-tooltip')

      // Hover over first frame
      await canvas.hover({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(500)
      await expect(tooltip).toBeVisible()

      // Get first frame content
      const firstFrameName = await tooltip.locator('div').nth(1).textContent()

      // Move to empty space
      await page.mouse.move(750, 300)
      await page.waitForTimeout(500)

      // Hover over different frame
      await canvas.hover({ position: { x: 400, y: 50 } })
      await page.waitForTimeout(500)
      await expect(tooltip).toBeVisible()

      // Get second frame content
      const secondFrameName = await tooltip.locator('div').nth(1).textContent()

      // Should be different content
      expect(firstFrameName).not.toBe(secondFrameName)
    })
  })

  test.describe('Positioning', () => {
    test('tooltip stays within viewport bounds', async ({ page }) => {
      await page.goto('http://localhost:3100')
      await page.setViewportSize({ width: 800, height: 600 })

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      const canvas = page.locator('canvas').first()

      // Test near right edge
      await canvas.hover({ position: { x: 750, y: 50 } })
      await page.waitForTimeout(500)

      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      const box = await tooltip.boundingBox()
      expect(box.x + box.width).toBeLessThanOrEqual(800)
    })

    test('tooltip follows mouse position', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      const canvas = page.locator('canvas').first()
      const tooltip = page.locator('.flamegraph-tooltip')

      // First position
      await canvas.hover({ position: { x: 200, y: 50 } })
      await page.waitForTimeout(500)
      const box1 = await tooltip.boundingBox()

      // Move to different position on same frame
      await canvas.hover({ position: { x: 250, y: 50 } })
      await page.waitForTimeout(500)
      const box2 = await tooltip.boundingBox()

      // Tooltip should have moved
      expect(box2.x).not.toBe(box1.x)
    })
  })

  test.describe('Content Formatting', () => {
    test('formats large numbers with commas', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      // Hover over root frame which typically has large values
      const canvas = page.locator('canvas').first()
      await canvas.hover({ position: { x: 400, y: 30 } })

      await page.waitForTimeout(500)

      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      // Check for comma-formatted numbers
      const valueText = await tooltip.locator('text=Value:').locator('..').textContent()
      expect(valueText).toMatch(/[\d,]+/)
    })

    test('shows percentage with two decimal places', async ({ page }) => {
      await page.goto('http://localhost:3100')

      // Wait for flamegraph to render
      await page.waitForSelector('canvas', { timeout: 5000 })
      await page.waitForTimeout(200)

      const canvas = page.locator('canvas').first()
      await canvas.hover({ position: { x: 200, y: 50 } })

      await page.waitForTimeout(500)

      const tooltip = page.locator('.flamegraph-tooltip')
      await expect(tooltip).toBeVisible()

      // Check for percentage format
      const widthText = await tooltip.locator('text=Width:').locator('..').textContent()
      expect(widthText).toMatch(/\d+\.\d{2}%/)
    })
  })
})
