import { Page, expect } from '@playwright/test'


export class FlameGraphTestUtils {
  constructor(private page: Page) {}

  /**
   * Navigate to test page with optional configuration
   * Now uses mock data instead of server - much faster!
   */
  async navigateToTest(config?: { mode?: string; stackDetails?: boolean }) {
    const params = new URLSearchParams()
    if (config?.mode) {params.set('mode', config.mode)}
    if (config?.stackDetails) {params.set('stackDetails', 'true')}

    const baseUrl = 'http://localhost:3100'
    const url = `${baseUrl}?${params.toString()}`
    await this.page.goto(url)

    // Wait for FlameGraph to render
    await this.page.waitForSelector('canvas', { timeout: 5000 })
    await this.page.waitForTimeout(200)
  }


  /**
   * Get the flamegraph canvas element
   */
  async getCanvasElement() {
    return this.page.locator('canvas').first()
  }

  /**
   * Click on a frame in the flamegraph
   */
  async clickFrame(x: number, y: number) {
    const canvas = await this.getCanvasElement()
    await canvas.click({ position: { x, y } })
    await this.page.waitForTimeout(1000) // Wait for zoom animation
  }

  /**
   * Wait for animation to complete using the callback mechanism
   */
  async waitForAnimationComplete(timeoutMs: number = 5000) {
    try {
      await this.page.evaluate(async (timeout) => {
        return Promise.race([
          window.waitForAnimationComplete(),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Animation timeout after ${timeout}ms`)), timeout)
          )
        ])
      }, timeoutMs)
    } catch (error) {
      console.log('Animation wait failed:', error)
      // Fallback to a fixed timeout if callback fails
      await this.page.waitForTimeout(1000)
    }
  }

  /**
   * Hover over a frame in the flamegraph
   */
  async hoverFrame(x: number, y: number) {
    const canvas = await this.getCanvasElement()
    await canvas.hover({ position: { x, y } })
    await this.page.waitForTimeout(500) // Wait for tooltip
  }

  /**
   * Click on empty space to zoom out
   */
  async clickEmptySpace() {
    const canvas = await this.getCanvasElement()
    await canvas.click({ position: { x: 750, y: 300 } })
    await this.page.waitForTimeout(1000) // Wait for zoom animation
  }

  /**
   * Wait for tooltip to appear
   */
  async waitForTooltip() {
    // Tooltip has a flamegraph-tooltip class
    const tooltip = this.page.locator('.flamegraph-tooltip')
    await expect(tooltip).toBeVisible({ timeout: 5000 })
    return tooltip
  }

  /**
   * Wait for tooltip to disappear
   */
  async waitForTooltipDisappear() {
    const tooltip = this.page.locator('.flamegraph-tooltip')
    // Wait a bit for tooltip to start disappearing
    await this.page.waitForTimeout(500)
    // Then check if it's hidden or wait for it to be hidden
    await expect(tooltip).toBeHidden({ timeout: 5000 })
  }

  /**
   * Check if stack details are visible
   */
  async expectStackDetailsVisible() {
    const stackContainer = this.page.locator('.stack-details-container')
    await expect(stackContainer).toBeVisible()
    await expect(stackContainer).toHaveClass(/stack-details-with-frame/)
  }

  /**
   * Check if stack details show empty state
   */
  async expectStackDetailsEmpty() {
    const stackContainer = this.page.locator('.stack-details-container')
    await expect(stackContainer).toBeVisible()
    await expect(stackContainer).toHaveClass(/stack-details-empty/)
  }

  /**
   * Get stack trace frames
   */
  async getStackTraceFrames() {
    // Look for stack frame elements directly
    return this.page.locator('.stack-frame')
  }

  /**
   * Get child frames
   */
  async getChildFrames() {
    // Look for child frame elements directly
    return this.page.locator('.child-frame')
  }

  /**
   * Check if frame has children
   */
  async expectFrameHasChildren() {
    const childrenCount = this.page.locator('text=Child Frames (').first()
    await expect(childrenCount).toBeVisible()

    const countText = await childrenCount.textContent()
    if (countText) {
      const match = countText.match(/Child Frames \((\d+)\)/)
      if (match) {
        const count = parseInt(match[1])
        expect(count).toBeGreaterThan(0)
      }
    }
  }

  /**
   * Check if frame is a leaf node
   */
  async expectFrameIsLeaf() {
    const leafMessage = this.page.locator('text=No child frames (leaf node)')
    await expect(leafMessage).toBeVisible()
  }

  /**
   * Capture console logs
   */
  async captureConsoleLogs(): Promise<string[]> {
    const logs: string[] = []
    this.page.on('console', msg => {
      if (msg.type() === 'log') {
        logs.push(msg.text())
      }
    })
    return logs
  }

  /**
   * Get captured console logs
   */
  async getCapturedLogs(logs: string[]): Promise<string[]> {
    // Wait a bit for logs to be captured
    await this.page.waitForTimeout(500)
    return logs
  }

  /**
   * Simulate rapid interactions
   */
  async rapidInteractions(positions: Array<{ x: number; y: number }>, delay = 100) {
    const canvas = await this.getCanvasElement()

    for (const position of positions) {
      await canvas.click({ position })
      await this.page.waitForTimeout(delay)
    }
  }

  /**
   * Test different viewport sizes
   */
  async testViewportSizes(sizes: Array<{ width: number; height: number }>) {
    const screenshots: string[] = []

    for (const size of sizes) {
      await this.page.setViewportSize(size)
      await this.page.waitForTimeout(1000)
      screenshots.push(`viewport-${size.width}x${size.height}.png`)
      await expect(this.page).toHaveScreenshot(screenshots[screenshots.length - 1])
    }

    return screenshots
  }

  /**
   * Check WebGL context health
   */
  async checkWebGLHealth() {
    const webglContext = await this.page.evaluate(() => {
      const canvas = document.querySelector('canvas') as HTMLCanvasElement
      if (!canvas) {return null}

      const gl = canvas.getContext('webgl2')
      if (!gl) {return null}

      return {
        contextLost: gl.isContextLost(),
        extensions: gl.getSupportedExtensions(),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
      }
    })

    expect(webglContext).not.toBeNull()
    expect(webglContext?.contextLost).toBe(false)

    return webglContext
  }

  /**
   * Measure performance metrics
   */
  async measurePerformance() {
    const startTime = Date.now()
    await this.page.waitForTimeout(2000) // Wait for render
    const endTime = Date.now()

    return {
      renderTime: endTime - startTime,
      timestamp: new Date().toISOString(),
    }
  }

  /**
   * Test keyboard accessibility
   */
  async testKeyboardNavigation() {
    // Test Tab navigation
    await this.page.keyboard.press('Tab')
    await this.page.waitForTimeout(100)

    // Test Enter key
    await this.page.keyboard.press('Enter')
    await this.page.waitForTimeout(100)

    // Test Escape key
    await this.page.keyboard.press('Escape')
    await this.page.waitForTimeout(100)
  }
}

export const COMMON_POSITIONS = {
  ROOT_FRAME: { x: 400, y: 50 },
  FIRST_CHILD: { x: 200, y: 50 },
  SECOND_CHILD: { x: 300, y: 50 },
  DEEP_FRAME: { x: 200, y: 100 },
  DEEPER_FRAME: { x: 200, y: 150 },
  EMPTY_SPACE: { x: 750, y: 300 },
}

export const VIEWPORT_SIZES = [
  { width: 1920, height: 1080 },
  { width: 1400, height: 800 },
  { width: 1200, height: 800 },
  { width: 1000, height: 600 },
  { width: 800, height: 600 },
]
