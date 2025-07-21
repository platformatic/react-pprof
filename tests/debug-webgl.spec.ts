import { test, expect } from '@playwright/test'

test.describe('WebGL Debug Test', () => {
  test('check WebGL availability and capture screenshots', async ({ page }) => {
    // Navigate to test page
    await page.goto('/')
    
    // Check WebGL support
    const webglInfo = await page.evaluate(() => {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const gl2 = canvas.getContext('webgl2')
      
      return {
        webgl: !!gl,
        webgl2: !!gl2,
        userAgent: navigator.userAgent,
        vendor: gl ? gl.getParameter(gl.VENDOR) : null,
        renderer: gl ? gl.getParameter(gl.RENDERER) : null,
        webglVersion: gl ? gl.getParameter(gl.VERSION) : null,
        shadingLanguageVersion: gl ? gl.getParameter(gl.SHADING_LANGUAGE_VERSION) : null,
        maxTextureSize: gl ? gl.getParameter(gl.MAX_TEXTURE_SIZE) : null,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        pixelRatio: window.devicePixelRatio
      }
    })
    
    console.log('WebGL Support Info:', JSON.stringify(webglInfo, null, 2))
    
    // Take screenshot
    await page.screenshot({ path: 'webgl-test-screenshot.png', fullPage: true })
    
    // Wait for flamegraph to render
    await page.waitForTimeout(2000)
    
    // Check if canvas element exists
    const canvas = page.locator('canvas').first()
    await expect(canvas).toBeVisible()
    
    // Get canvas info
    const canvasInfo = await canvas.evaluate((el: HTMLCanvasElement) => {
      const ctx = el.getContext('webgl') || el.getContext('webgl2')
      return {
        width: el.width,
        height: el.height,
        style: {
          width: el.style.width,
          height: el.style.height
        },
        hasContext: !!ctx,
        contextType: ctx ? ctx.constructor.name : null
      }
    })
    
    console.log('Canvas Info:', JSON.stringify(canvasInfo, null, 2))
    
    // Take screenshot after rendering
    await page.screenshot({ path: 'webgl-canvas-screenshot.png', fullPage: true })
    
    // Check console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text())
      }
    })
    
    // Verify WebGL is available
    expect(webglInfo.webgl || webglInfo.webgl2).toBeTruthy()
  })
})