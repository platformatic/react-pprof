import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils, COMMON_POSITIONS } from './test-utils'

test.describe('FlameGraph Data Integrity Tests', () => {
  let utils: FlameGraphTestUtils

  test.beforeEach(async ({ page }) => {
    utils = new FlameGraphTestUtils(page)
  })

  test('console logging works correctly', async ({ page }) => {
    const consoleLogs = await utils.captureConsoleLogs()

    await utils.navigateToTest()

    // Trigger logging
    await utils.clickFrame(COMMON_POSITIONS.FIRST_CHILD.x, COMMON_POSITIONS.FIRST_CHILD.y)

    // Wait for logs and get captured results
    const capturedLogs = await utils.getCapturedLogs(consoleLogs)

    // Should have logged frame data
    expect(capturedLogs.some(log => log.includes('Frame clicked:'))).toBeTruthy()
  })

  test('stack trace data is consistent', async ({ page }) => {
    await utils.navigateToTest({ stackDetails: true })

    // Click on different frames and verify stack traces
    await utils.clickFrame(COMMON_POSITIONS.ROOT_FRAME.x, COMMON_POSITIONS.ROOT_FRAME.y)
    await utils.expectStackDetailsVisible()

    const rootStackFrames = await utils.getStackTraceFrames()
    const rootCount = await rootStackFrames.count()

    await utils.clickFrame(COMMON_POSITIONS.DEEP_FRAME.x, COMMON_POSITIONS.DEEP_FRAME.y)

    const deepStackFrames = await utils.getStackTraceFrames()
    const deepCount = await deepStackFrames.count()

    // Deeper frame should have more stack frames
    expect(deepCount).toBeGreaterThanOrEqual(rootCount)
  })
})
