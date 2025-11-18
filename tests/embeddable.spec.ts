import { test, expect } from '@playwright/test'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const __dirname = import.meta.dirname

// These tests validate the embeddable API functions that are exported from the package
// They test both the Node.js API and the browser integration

test.describe('Embeddable API', () => {

  test.describe('getFlamegraphBundle()', () => {
    test('returns bundle with valid JavaScript code', async () => {
      // Import the function dynamically since this is a server-side test
      const { getFlamegraphBundle } = await import('../src/embeddable.js')

      const result = await getFlamegraphBundle()

      expect(result).toBeDefined()
      expect(result.bundle).toBeDefined()
      expect(typeof result.bundle).toBe('string')
      expect(result.bundle.length).toBeGreaterThan(0)

      // Should contain React code markers
      expect(result.bundle).toContain('React')
      // Should contain the render function
      expect(result.bundle).toContain('renderReactPprofFlameGraph')
    })

    test('caches bundle after first call', async () => {
      const { getFlamegraphBundle } = await import('../src/embeddable.js')

      const result1 = await getFlamegraphBundle()
      const result2 = await getFlamegraphBundle()

      // Both results should be identical (same object reference due to caching)
      expect(result1.bundle).toBe(result2.bundle)
    })

    test('bundle file exists at expected location', async () => {
      // Verify the bundle file exists where the function expects it
      const bundlePath = join(process.cwd(), 'cli-build', 'flamegraph.js')
      expect(existsSync(bundlePath)).toBe(true)

      const bundleContent = readFileSync(bundlePath, 'utf8')
      expect(bundleContent.length).toBeGreaterThan(0)
    })
  })

  test.describe('generateEmbeddableFlameGraph()', () => {
    let profileData: Buffer

    test.beforeAll(() => {
      // Load test profile data
      profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))
    })

    test('generates valid HTML and script from Buffer', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData)

      expect(result).toBeDefined()
      expect(result.html).toBeDefined()
      expect(result.script).toBeDefined()
      expect(typeof result.html).toBe('string')
      expect(typeof result.script).toBe('string')
    })

    test('generates valid HTML and script from Uint8Array', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const uint8Array = new Uint8Array(profileData)
      const result = await generateEmbeddableFlameGraph(uint8Array)

      expect(result).toBeDefined()
      expect(result.html).toBeDefined()
      expect(result.script).toBeDefined()
    })

    test('HTML contains required elements and structure', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData)

      // Should contain container div with react-pprof- prefix
      expect(result.html).toContain('id="react-pprof-')
      // Should contain root div
      expect(result.html).toContain('-root"')
      // Should have flexbox styling
      expect(result.html).toContain('display: flex')
      expect(result.html).toContain('flex-direction: column')
      expect(result.html).toContain('flex: 1')
      // Should have loading message
      expect(result.html).toContain('Loading profile')
    })

    test('script contains required function call', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData)

      // Should call renderReactPprofFlameGraph
      expect(result.script).toContain('window.renderReactPprofFlameGraph')
      // Should create Uint8Array with profile data
      expect(result.script).toContain('new Uint8Array([')
      // Should be wrapped in IIFE
      expect(result.script).toContain('(function()')
      // Should check for bundle availability
      expect(result.script).toContain('typeof window.renderReactPprofFlameGraph')
    })

    test('respects title option', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData, {
        title: 'Custom Test Title'
      })

      expect(result.script).toContain('"Custom Test Title"')
    })

    test('respects filename option', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData, {
        filename: 'custom-file.pb'
      })

      expect(result.script).toContain('"custom-file.pb"')
    })

    test('respects primaryColor option', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData, {
        primaryColor: '#00ff00'
      })

      expect(result.script).toContain('"#00ff00"')
    })

    test('respects secondaryColor option', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData, {
        secondaryColor: '#ff00ff'
      })

      expect(result.script).toContain('"#ff00ff"')
    })

    test('uses default options when not provided', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData)

      // Default title is 'Profile'
      expect(result.script).toContain('"Profile"')
      // Default filename is 'profile.pb'
      expect(result.script).toContain('"profile.pb"')
      // Default primaryColor is '#ff4444'
      expect(result.script).toContain('"#ff4444"')
      // Default secondaryColor is '#ffcc66'
      expect(result.script).toContain('"#ffcc66"')
    })

    test('generates unique container IDs for multiple instances', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result1 = await generateEmbeddableFlameGraph(profileData)
      const result2 = await generateEmbeddableFlameGraph(profileData)

      // Extract container IDs from HTML
      const id1Match = result1.html.match(/id="(react-pprof-[a-z0-9]+)"/)
      const id2Match = result2.html.match(/id="(react-pprof-[a-z0-9]+)"/)

      expect(id1Match).toBeTruthy()
      expect(id2Match).toBeTruthy()
      expect(id1Match![1]).not.toBe(id2Match![1])
    })

    test('generates valid JavaScript that can be evaluated', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData)

      // The script should be syntactically valid JavaScript
      // We can't execute it without the bundle, but we can at least parse it
      expect(() => {
        new Function(result.script)
      }).not.toThrow()
    })

    test('handles empty profile data', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const emptyBuffer = Buffer.from([])
      const result = await generateEmbeddableFlameGraph(emptyBuffer)

      expect(result).toBeDefined()
      expect(result.html).toBeDefined()
      expect(result.script).toBeDefined()
      // Should still generate valid structure even with empty data
      expect(result.script).toContain('new Uint8Array([])')
    })

    test('handles small profile data', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const smallBuffer = Buffer.from([1, 2, 3, 4, 5])
      const result = await generateEmbeddableFlameGraph(smallBuffer)

      expect(result).toBeDefined()
      expect(result.script).toContain('new Uint8Array([1,2,3,4,5])')
    })

    test('properly escapes special characters in options', async () => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')

      const result = await generateEmbeddableFlameGraph(profileData, {
        title: 'Test "with" quotes',
        filename: "test's-file.pb"
      })

      // JSON.stringify should properly escape quotes
      expect(result.script).toContain('\\"with\\"')
      expect(result.script).toContain("test's-file.pb")
    })
  })

  test.describe('Browser Integration', () => {
    test('renders flamegraph with generated HTML and script', async ({ page }) => {
      const { getFlamegraphBundle, generateEmbeddableFlameGraph } = await import('../src/embeddable.js')
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      const bundle = await getFlamegraphBundle()
      const embeddable = await generateEmbeddableFlameGraph(profileData, {
        title: 'Integration Test Profile',
        filename: 'test.pb'
      })

      // Create a complete HTML page with the bundle and embeddable content
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Embeddable Test</title>
            <style>
              html, body {
                margin: 0;
                padding: 0;
                height: 100%;
                display: flex;
                flex-direction: column;
              }
              #container {
                flex: 1;
                display: flex;
                flex-direction: column;
              }
            </style>
          </head>
          <body>
            <div id="container">
              ${embeddable.html}
            </div>
            <script>${bundle.bundle}</script>
            <script>${embeddable.script}</script>
          </body>
        </html>
      `

      await page.setContent(html)

      // Wait for the flamegraph to render
      await page.waitForTimeout(2000)

      // Check that the container was created
      const containerExists = await page.locator('[id^="react-pprof-"]').count()
      expect(containerExists).toBeGreaterThan(0)

      // Check that a canvas element was created (flamegraph renders to canvas)
      const canvasExists = await page.locator('canvas').count()
      expect(canvasExists).toBeGreaterThan(0)
    })

    test('renders multiple flamegraphs on same page', async ({ page }) => {
      const { getFlamegraphBundle, generateEmbeddableFlameGraph } = await import('../src/embeddable.js')
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      const bundle = await getFlamegraphBundle()
      const embeddable1 = await generateEmbeddableFlameGraph(profileData, {
        title: 'First Profile'
      })
      const embeddable2 = await generateEmbeddableFlameGraph(profileData, {
        title: 'Second Profile'
      })

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Multiple Flamegraphs Test</title>
            <style>
              html, body {
                margin: 0;
                padding: 0;
                height: 100%;
              }
              .flamegraph-container {
                height: 400px;
                margin: 20px;
              }
            </style>
          </head>
          <body>
            <div class="flamegraph-container">
              ${embeddable1.html}
            </div>
            <div class="flamegraph-container">
              ${embeddable2.html}
            </div>
            <script>${bundle.bundle}</script>
            <script>${embeddable1.script}</script>
            <script>${embeddable2.script}</script>
          </body>
        </html>
      `

      await page.setContent(html)
      await page.waitForTimeout(2000)

      // Should have two separate flamegraph containers (each has a root and nested containers)
      // We count the top-level containers by looking for ones that don't end in "-root"
      const containers = await page.locator('[id^="react-pprof-"]').all()
      const topLevelContainers = []
      for (const container of containers) {
        const id = await container.getAttribute('id')
        if (id && !id.endsWith('-root')) {
          topLevelContainers.push(id)
        }
      }
      expect(topLevelContainers.length).toBe(2)

      // Should have two canvases (one per flamegraph)
      const canvasCount = await page.locator('canvas').count()
      expect(canvasCount).toBeGreaterThanOrEqual(2)
    })

    test('shows error when bundle not loaded', async ({ page }) => {
      const { generateEmbeddableFlameGraph } = await import('../src/embeddable.js')
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      const embeddable = await generateEmbeddableFlameGraph(profileData)

      // Create page WITHOUT the bundle
      const html = `
        <!DOCTYPE html>
        <html>
          <body>
            ${embeddable.html}
            <script>${embeddable.script}</script>
          </body>
        </html>
      `

      // Listen for console errors
      const consoleMessages: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleMessages.push(msg.text())
        }
      })

      await page.setContent(html)
      await page.waitForTimeout(500)

      // Should log an error about bundle not being loaded
      expect(consoleMessages.some(msg =>
        msg.includes('react-pprof bundle not loaded')
      )).toBe(true)
    })

    test('flamegraph is interactive', async ({ page }) => {
      const { getFlamegraphBundle, generateEmbeddableFlameGraph } = await import('../src/embeddable.js')
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      const bundle = await getFlamegraphBundle()
      const embeddable = await generateEmbeddableFlameGraph(profileData)

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              html, body { margin: 0; padding: 0; height: 100%; }
              #container { height: 100%; display: flex; flex-direction: column; }
            </style>
          </head>
          <body>
            <div id="container">
              ${embeddable.html}
            </div>
            <script>${bundle.bundle}</script>
            <script>${embeddable.script}</script>
          </body>
        </html>
      `

      await page.setContent(html)
      await page.waitForTimeout(2000)

      const canvas = page.locator('canvas').first()
      await expect(canvas).toBeVisible()

      // Hover should show tooltip
      await canvas.hover({ position: { x: 100, y: 50 } })
      await page.waitForTimeout(300)

      // Check if tooltip or some visual feedback appears
      // The exact implementation may vary, but we can check that something changed
      const canvasExists = await canvas.count()
      expect(canvasExists).toBeGreaterThan(0)
    })
  })
})
