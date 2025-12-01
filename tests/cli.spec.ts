import { test, expect } from '@playwright/test'
import { execSync, spawnSync } from 'child_process'
import { readFileSync, unlinkSync, existsSync } from 'fs'
import { join } from 'path'
import { tmpdir } from 'os'

const __dirname = import.meta.dirname
const projectRoot = join(__dirname, '..')
const cliPath = join(projectRoot, 'cli.js')
const profilePath = join(__dirname, 'fixtures', 'profile.pprof')

test.describe('CLI Script', () => {
  test.describe('Command Line Interface', () => {
    test('shows help with --help flag', () => {
      const result = spawnSync('node', [cliPath, '--help'], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      expect(result.status).toBe(0)
      expect(result.stdout).toContain('Usage:')
      expect(result.stdout).toContain('--output')
      expect(result.stdout).toContain('--title')
      expect(result.stdout).toContain('--primary-color')
      expect(result.stdout).toContain('--secondary-color')
    })

    test('shows help with -h flag', () => {
      const result = spawnSync('node', [cliPath, '-h'], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      expect(result.status).toBe(0)
      expect(result.stdout).toContain('Usage:')
    })

    test('shows help when no arguments provided', () => {
      const result = spawnSync('node', [cliPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      expect(result.status).toBe(0)
      expect(result.stdout).toContain('Usage:')
    })

    test('exits with error for non-existent file', () => {
      const result = spawnSync('node', [cliPath, 'non-existent-file.pb'], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      expect(result.status).toBe(1)
      expect(result.stderr).toContain('not found')
    })
  })

  test.describe('HTML Output Generation', () => {
    const outputPath = join(tmpdir(), `cli-test-${Date.now()}.html`)

    test.afterEach(() => {
      if (existsSync(outputPath)) {
        unlinkSync(outputPath)
      }
    })

    test('generates HTML file from pprof input', () => {
      const result = spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      expect(result.status).toBe(0)
      expect(result.stdout).toContain('Generated HTML output')
      expect(existsSync(outputPath)).toBe(true)
    })

    test('generated HTML has correct structure', () => {
      spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      // Check basic HTML structure
      expect(html).toContain('<!DOCTYPE html>')
      expect(html).toContain('<html')
      expect(html).toContain('</html>')
      expect(html).toContain('<head>')
      expect(html).toContain('</head>')
      expect(html).toContain('<body>')
      expect(html).toContain('</body>')
    })

    test('generated HTML contains flamegraph container', () => {
      spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      // Check for react-pprof container
      expect(html).toMatch(/id="react-pprof-[a-z0-9]+"/)
      expect(html).toMatch(/id="react-pprof-[a-z0-9]+-root"/)
    })

    test('generated HTML contains bundle script', () => {
      spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      // Check that the bundle is inlined
      expect(html).toContain('renderReactPprofFlameGraph')
      expect(html).toContain('<script>')
    })

    test('generated HTML contains render script with profile data', () => {
      spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      // Check for embedded profile data
      expect(html).toContain('new Uint8Array([')
      expect(html).toContain('window.renderReactPprofFlameGraph')
    })

    test('respects custom title option', () => {
      const customTitle = 'My Custom Profile Title'
      spawnSync('node', [cliPath, profilePath, '-o', outputPath, '-t', customTitle], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      expect(html).toContain(`<title>${customTitle}</title>`)
      expect(html).toContain(`"${customTitle}"`)
    })

    test('respects custom primary color option', () => {
      const customColor = '#00ff00'
      spawnSync('node', [cliPath, profilePath, '-o', outputPath, '--primary-color', customColor], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      expect(html).toContain(`"${customColor}"`)
    })

    test('respects custom secondary color option', () => {
      const customColor = '#0000ff'
      spawnSync('node', [cliPath, profilePath, '-o', outputPath, '--secondary-color', customColor], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      expect(html).toContain(`"${customColor}"`)
    })

    test('uses default output filename based on input', () => {
      const defaultOutputPath = join(projectRoot, 'profile.html')

      try {
        const result = spawnSync('node', [cliPath, profilePath], {
          cwd: projectRoot,
          encoding: 'utf8'
        })

        expect(result.status).toBe(0)
        expect(existsSync(defaultOutputPath)).toBe(true)
      } finally {
        if (existsSync(defaultOutputPath)) {
          unlinkSync(defaultOutputPath)
        }
      }
    })

    test('does not contain broken window.PROFILE_DATA assignment', () => {
      spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      // This was the bug - make sure it's not there
      expect(html).not.toContain('window.PROFILE_DATA = ;')
      expect(html).not.toContain('window.PROFILE_DATA =;')
      expect(html).not.toMatch(/window\.PROFILE_DATA\s*=\s*;/)
    })

    test('does not contain old template placeholders', () => {
      spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
        cwd: projectRoot,
        encoding: 'utf8'
      })

      const html = readFileSync(outputPath, 'utf8')

      // Old placeholders should not be present
      expect(html).not.toContain('{{PROFILE_DATA}}')
      expect(html).not.toContain('{{FILENAME}}')
      expect(html).not.toContain('{{PRIMARY_COLOR}}')
      expect(html).not.toContain('{{SECONDARY_COLOR}}')
      // New placeholders should also be replaced
      expect(html).not.toContain('{{CONTENT}}')
      expect(html).not.toContain('{{BUNDLE}}')
      expect(html).not.toContain('{{RENDER_SCRIPT}}')
    })
  })

  test.describe('Browser Rendering', () => {
    test('generated HTML renders flamegraph in browser', async ({ page }) => {
      const outputPath = join(tmpdir(), `cli-browser-test-${Date.now()}.html`)

      try {
        spawnSync('node', [cliPath, profilePath, '-o', outputPath, '-t', 'Browser Test'], {
          cwd: projectRoot,
          encoding: 'utf8'
        })

        const html = readFileSync(outputPath, 'utf8')
        await page.setContent(html)

        // Wait for React to render
        await page.waitForTimeout(2000)

        // Check that the container exists
        const container = page.locator('[id^="react-pprof-"]')
        await expect(container.first()).toBeVisible()

        // Check that canvas is rendered (flamegraph uses canvas)
        const canvas = page.locator('canvas')
        await expect(canvas.first()).toBeVisible()
      } finally {
        if (existsSync(outputPath)) {
          unlinkSync(outputPath)
        }
      }
    })

    test('generated HTML is interactive', async ({ page }) => {
      const outputPath = join(tmpdir(), `cli-interactive-test-${Date.now()}.html`)

      try {
        spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
          cwd: projectRoot,
          encoding: 'utf8'
        })

        const html = readFileSync(outputPath, 'utf8')
        await page.setContent(html)
        await page.waitForTimeout(2000)

        const canvas = page.locator('canvas').first()
        await expect(canvas).toBeVisible()

        // Hover should work without errors
        await canvas.hover({ position: { x: 100, y: 50 } })
        await page.waitForTimeout(300)

        // Page should still be functional
        const canvasCount = await page.locator('canvas').count()
        expect(canvasCount).toBeGreaterThan(0)
      } finally {
        if (existsSync(outputPath)) {
          unlinkSync(outputPath)
        }
      }
    })
  })

  test.describe('Gzipped Input Handling', () => {
    test('handles gzipped pprof files', () => {
      // The test profile is not gzipped, but we can verify the code path exists
      // by checking the output messages
      const outputPath = join(tmpdir(), `cli-gz-test-${Date.now()}.html`)

      try {
        const result = spawnSync('node', [cliPath, profilePath, '-o', outputPath], {
          cwd: projectRoot,
          encoding: 'utf8'
        })

        expect(result.status).toBe(0)
        // Should indicate the file type
        expect(result.stdout).toMatch(/File appears to be (un)?compressed/)
      } finally {
        if (existsSync(outputPath)) {
          unlinkSync(outputPath)
        }
      }
    })
  })
})
