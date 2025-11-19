import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('FlameGraph Accessibility Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('supports basic keyboard navigation', async ({ page }) => {
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

    // Check for ARIA attributes
    const role = await canvas.getAttribute('role')
    expect(role).toBe('img')

    const ariaLabel = await canvas.getAttribute('aria-label')
    expect(ariaLabel).toContain('Flame graph visualization')
    expect(ariaLabel).toContain('arrow keys')
  })

  test('canvas is focusable with tabIndex', async ({ page }) => {
    await utils.navigateToTest()

    const canvas = await utils.getCanvasElement()
    const tabIndex = await canvas.getAttribute('tabIndex')
    expect(tabIndex).toBe('0')

    // Should be able to focus
    await canvas.focus()
    const isFocused = await canvas.evaluate((el) => el === document.activeElement)
    expect(isFocused).toBe(true)
  })

  test('ArrowDown navigates to first child frame', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Click a frame with children first
    await utils.clickFrame(400, 50)

    // Focus canvas and press down arrow
    await utils.focusCanvas()
    await utils.pressArrowKey('ArrowDown')

    // Should zoom to child frame (verify no crash)
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('ArrowUp navigates to parent frame', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Click a deep frame first
    await utils.clickFrame(200, 100)

    // Focus canvas and press up arrow
    await utils.focusCanvas()
    await utils.pressArrowKey('ArrowUp')

    // Should zoom to parent frame (verify no crash)
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('ArrowRight navigates to next sibling', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Click a frame that has siblings
    await utils.clickFrame(200, 50)

    // Focus canvas and press right arrow
    await utils.focusCanvas()
    await utils.pressArrowKey('ArrowRight')

    // Should zoom to sibling (verify no crash)
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('ArrowLeft navigates to previous sibling', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Click a frame that has previous siblings
    await utils.clickFrame(300, 50)

    // Focus canvas and press left arrow
    await utils.focusCanvas()
    await utils.pressArrowKey('ArrowLeft')

    // Should zoom to previous sibling (verify no crash)
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('Escape key resets zoom', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Click a frame to zoom in
    await utils.clickFrame(200, 100)

    // Focus canvas and press Escape
    await utils.focusCanvas()
    await utils.pressEscape()

    // Should reset to full view (verify no crash)
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('Home key resets zoom', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Click a frame to zoom in
    await utils.clickFrame(200, 100)

    // Focus canvas and press Home
    await utils.focusCanvas()
    await utils.pressHome()

    // Should reset to full view (verify no crash)
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('keyboard navigation works after mouse interaction', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Start with mouse click
    await utils.clickFrame(400, 50)

    // Then use keyboard navigation
    await utils.focusCanvas()
    await utils.pressArrowKey('ArrowDown')

    // Then back to mouse
    await utils.clickFrame(200, 100)

    // Then keyboard again
    await utils.pressArrowKey('ArrowUp')

    // Should work without issues
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })

  test('keyboard navigation does not crash on edge cases', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Focus canvas
    await utils.focusCanvas()

    // Try to navigate when at root (no parent)
    await utils.pressArrowKey('ArrowUp')

    // Try to navigate when at leaf (no children)
    await utils.clickFrame(200, 150)
    await utils.pressArrowKey('ArrowDown')

    // Try to navigate at first sibling (no previous)
    await utils.clickFrame(50, 50)
    await utils.pressArrowKey('ArrowLeft')

    // Should not crash
    const canvas = await utils.getCanvasElement()
    await expect(canvas).toBeVisible()
  })
})
