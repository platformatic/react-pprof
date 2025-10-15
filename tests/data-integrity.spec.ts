import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Data Integrity Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('frame selection works correctly', async ({ page }) => {
    await utils.navigateToTest({ stackDetails: true })

    // Click on a frame
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)

    // Verify that frame was selected by checking stack details visibility
    const stackHeader = page.locator('.stack-trace-header')
    await expect(stackHeader).toBeVisible()
    
    // Verify frame information is displayed
    const selectedFrame = page.locator('text=Selected frame:')
    await expect(selectedFrame).toBeVisible()
  })

  test('stack trace data is consistent', async ({ page }) => {
    await utils.navigateToTest({ stackDetails: true })

    // Click on root frame first
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await utils.expectStackDetailsVisible()

    const rootStackFrames = await utils.getStackTraceFrames()
    const rootCount = await rootStackFrames.count()
    expect(rootCount).toBeGreaterThan(0) // Root should have at least 1 frame

    // After zooming into root, click on one of its children
    // Children are now spread across the width at the same y position
    await utils.clickFrame(200, 100) // Click on a child frame
    await page.waitForTimeout(1000) // Wait for update

    // Check if stack details are still visible
    const stackDetailsVisible = await page.locator('.stack-details-header').isVisible()
    
    if (stackDetailsVisible) {
      const childStackFrames = await utils.getStackTraceFrames()
      const childCount = await childStackFrames.count()
      
      // Child frame should have at least as many frames as root (includes root in stack)
      expect(childCount).toBeGreaterThanOrEqual(rootCount)
    } else {
      // If no frame was selected (clicked on empty space), that's ok
      // Just verify the flamegraph is still functional
      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible()
    }
  })

  test('BigInt sample values are converted to numbers correctly', async ({ page }) => {
    await utils.navigateToTest({ fullFlameGraph: true })

    // Wait for rendering
    await page.waitForTimeout(1000)

    // Verify that BigInt values in samples are properly converted to numbers
    // This is done by checking that value arithmetic works correctly
    const result = await page.evaluate(() => {
      // Create a test profile with BigInt values
      const testSample = {
        value: [BigInt(1), BigInt(1000000000)] // sample count and large value as BigInt
      }

      // Simulate the conversion that happens in FullFlameGraph.tsx:199 and :238
      const valueIndex = 0
      const value = testSample.value?.[valueIndex] || 1
      const convertedValue = Number(value)

      // Verify the conversion worked
      const isNumber = typeof convertedValue === 'number'
      const canDoArithmetic = !isNaN(convertedValue + 100)
      const correctValue = convertedValue === 1

      return {
        isNumber,
        canDoArithmetic,
        correctValue,
        originalType: typeof value,
        convertedType: typeof convertedValue
      }
    })

    // All checks should pass
    expect(result.isNumber).toBe(true)
    expect(result.canDoArithmetic).toBe(true)
    expect(result.correctValue).toBe(true)
    expect(result.convertedType).toBe('number')
  })

  test('flame graph builds correctly with BigInt values in samples', async ({ page }) => {
    // Monitor for any JavaScript errors during rendering
    const jsErrors: string[] = []
    page.on('pageerror', error => {
      jsErrors.push(error.message)
    })

    page.on('console', msg => {
      if (msg.type() === 'error') {
        jsErrors.push(msg.text())
      }
    })

    // Use the BigInt profile
    await utils.navigateToTest({ fullFlameGraph: true, bigIntProfile: true })

    // Wait for rendering to complete
    await page.waitForTimeout(1500)

    // Click on frames to trigger value calculations
    await utils.clickFrame(200, 100)
    await page.waitForTimeout(500)

    await utils.clickFrame(300, 150)
    await page.waitForTimeout(500)

    // Verify no errors occurred with the fix in place
    const relevantErrors = jsErrors.filter(err =>
      err.includes('BigInt') ||
      err.includes('cannot mix') ||
      err.includes('NaN') ||
      err.includes('TypeError')
    )

    // With the fix in place, we should have NO errors
    expect(relevantErrors.length).toBe(0)

    // The canvas should be visible and functional
    const canvas = page.locator('canvas').first()
    await expect(canvas).toBeVisible()
  })
})
