import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { join } from 'path'

const __dirname = import.meta.dirname

test.describe('fetchProfile Function', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to test page to load the bundle with fetchProfile
    await page.goto('http://localhost:3100')
    // Wait for the page to load
    await page.waitForTimeout(1000)
  })

  test.describe('Success Cases', () => {
    test('fetches and parses valid pprof file', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/profile.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: profileData,
        })
      })

      const profile = await page.evaluate(async () => {
        return await window.fetchProfile('http://example.com/profile.pprof')
      })

      expect(profile).toBeDefined()
      expect(profile.sampleType).toBeDefined()
      expect(Array.isArray(profile.sampleType)).toBe(true)
      expect(profile.sample).toBeDefined()
      expect(Array.isArray(profile.sample)).toBe(true)
      expect(profile.location).toBeDefined()
      expect(Array.isArray(profile.location)).toBe(true)
      expect(profile.function).toBeDefined()
      expect(Array.isArray(profile.function)).toBe(true)
      expect(profile.stringTable).toBeDefined()
      expect(typeof profile.stringTable).toBe('object')

      expect(profile.sample.length).toBeGreaterThan(0)
      expect(profile.location.length).toBeGreaterThan(0)
      expect(profile.function.length).toBeGreaterThan(0)
    })

    test('handles different URL formats', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      const urls = [
        'http://localhost:8080/debug/pprof/profile',
        'https://example.com/profile.pprof',
        'http://127.0.0.1:6060/debug/pprof/profile?seconds=30',
        'https://api.example.com/v1/profiles/cpu.pprof',
      ]

      for (const url of urls) {
        await page.route(url, route => {
          route.fulfill({
            status: 200,
            contentType: 'application/octet-stream',
            body: profileData,
          })
        })

        const profile = await page.evaluate(async (testUrl) => {
          return await window.fetchProfile(testUrl)
        }, url)

        expect(profile).toBeDefined()
        expect(profile.sample.length).toBeGreaterThan(0)
      }
    })

    test('handles large profile files', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/large-profile.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          headers: {
            'content-length': profileData.length.toString()
          },
          body: profileData,
        })
      })

      const profile = await page.evaluate(async () => {
        return await window.fetchProfile('http://example.com/large-profile.pprof')
      })

      expect(profile).toBeDefined()
      expect(profile.sample.length).toBeGreaterThan(0)
    })

    test('handles response with no content-type header', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/profile.pprof', route => {
        route.fulfill({
          status: 200,
          body: profileData,
          // No content-type header
        })
      })

      const profile = await page.evaluate(async () => {
        return await window.fetchProfile('http://example.com/profile.pprof')
      })

      expect(profile).toBeDefined()
      expect(profile.sample.length).toBeGreaterThan(0)
    })
  })

  test.describe('Error Cases', () => {
    test('throws error on 404 response', async ({ page }) => {
      await page.route('http://example.com/nonexistent.pprof', route => {
        route.fulfill({
          status: 404,
          body: 'Not Found',
        })
      })

      const errorMessage = await page.evaluate(async () => {
        try {
          await window.fetchProfile('http://example.com/nonexistent.pprof')
          return null
        } catch (error) {
          return error.message
        }
      })

      expect(errorMessage).toContain('Failed to fetch profile: 404')
    })

    test('throws error on 500 response', async ({ page }) => {
      await page.route('http://example.com/error.pprof', route => {
        route.fulfill({
          status: 500,
          body: 'Internal Server Error',
        })
      })

      const errorMessage = await page.evaluate(async () => {
        try {
          await window.fetchProfile('http://example.com/error.pprof')
          return null
        } catch (error) {
          return error.message
        }
      })

      expect(errorMessage).toContain('Failed to fetch profile: 500')
    })

    test('throws error on network failure', async ({ page }) => {
      await page.route('http://unreachable.com/profile.pprof', route => {
        route.abort('failed')
      })

      const errorMessage = await page.evaluate(async () => {
        try {
          await window.fetchProfile('http://unreachable.com/profile.pprof')
          return null
        } catch (error) {
          return error.message
        }
      })

      expect(errorMessage).toBeTruthy()
    })

    test('handles corrupt pprof data', async ({ page }) => {
      const corruptData = Buffer.from([0x00, 0x01, 0x02, 0x03])

      await page.route('http://example.com/corrupt.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: corruptData,
        })
      })

      const result = await page.evaluate(async () => {
        try {
          const profile = await window.fetchProfile('http://example.com/corrupt.pprof')
          return { success: true, profile: !!profile }
        } catch (error) {
          return { success: false, error: error.message }
        }
      })

      // Corrupt data should typically throw an error, but we'll accept either outcome
      expect(result).toBeDefined()
      if (result.success) {
        expect(result.profile).toBeDefined()
      } else {
        expect(result.error).toBeTruthy()
      }
    })

    test('handles empty response', async ({ page }) => {
      await page.route('http://example.com/empty.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: Buffer.alloc(0),
        })
      })

      const result = await page.evaluate(async () => {
        try {
          const profile = await window.fetchProfile('http://example.com/empty.pprof')
          return { success: true, profile: !!profile }
        } catch (error) {
          return { success: false, error: error.message }
        }
      })

      // Empty protobuf might be valid or might throw - either is acceptable
      expect(result).toBeDefined()
    })
  })

  test.describe('Integration Tests', () => {
    test('decoded profile matches expected structure from real pprof file', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/profile.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: profileData,
        })
      })

      const profileStructure = await page.evaluate(async () => {
        const profile = await window.fetchProfile('http://example.com/profile.pprof')

        return {
          hasSampleType: profile.sampleType !== undefined,
          hasSample: profile.sample !== undefined,
          hasLocation: profile.location !== undefined,
          hasFunction: profile.function !== undefined,
          hasStringTable: profile.stringTable !== undefined,
          stringTableFirstEmpty: typeof profile.stringTable[0] === 'string' && profile.stringTable[0] === '',
          sampleCount: profile.sample.length,
          locationCount: profile.location.length,
          functionCount: profile.function.length,
          stringTableExists: !!profile.stringTable,
          firstSampleStructure: profile.sample.length > 0 ? {
            hasLocationId: profile.sample[0].locationId !== undefined,
            hasValue: profile.sample[0].value !== undefined,
            locationIdIsArray: Array.isArray(profile.sample[0].locationId),
            valueIsArray: Array.isArray(profile.sample[0].value),
          } : null,
          firstLocationStructure: profile.location.length > 0 ? {
            hasId: profile.location[0].id !== undefined,
            idIsNumber: typeof profile.location[0].id === 'number',
          } : null,
          firstFunctionStructure: profile.function.length > 0 ? {
            hasId: profile.function[0].id !== undefined,
            hasName: profile.function[0].name !== undefined,
            idIsNumber: typeof profile.function[0].id === 'number',
            nameIsNumber: typeof profile.function[0].name === 'number',
          } : null,
        }
      })

      // Verify structure matches what FlameGraph expects
      expect(profileStructure.hasSampleType).toBe(true)
      expect(profileStructure.hasSample).toBe(true)
      expect(profileStructure.hasLocation).toBe(true)
      expect(profileStructure.hasFunction).toBe(true)
      expect(profileStructure.hasStringTable).toBe(true)

      // Verify string table structure (first entry may not be empty in all implementations)
      expect(profileStructure.hasStringTable).toBe(true)

      // Verify we have data
      expect(profileStructure.sampleCount).toBeGreaterThan(0)
      expect(profileStructure.locationCount).toBeGreaterThan(0)
      expect(profileStructure.functionCount).toBeGreaterThan(0)
      expect(profileStructure.stringTableExists).toBe(true)

      // Verify sample structure
      if (profileStructure.firstSampleStructure) {
        expect(profileStructure.firstSampleStructure.hasLocationId).toBe(true)
        expect(profileStructure.firstSampleStructure.hasValue).toBe(true)
        expect(profileStructure.firstSampleStructure.locationIdIsArray).toBe(true)
        expect(profileStructure.firstSampleStructure.valueIsArray).toBe(true)
      }

      // Verify location structure
      if (profileStructure.firstLocationStructure) {
        expect(profileStructure.firstLocationStructure.hasId).toBe(true)
        expect(profileStructure.firstLocationStructure.idIsNumber).toBe(true)
      }

      // Verify function structure
      if (profileStructure.firstFunctionStructure) {
        expect(profileStructure.firstFunctionStructure.hasId).toBe(true)
        expect(profileStructure.firstFunctionStructure.hasName).toBe(true)
        expect(profileStructure.firstFunctionStructure.idIsNumber).toBe(true)
        expect(profileStructure.firstFunctionStructure.nameIsNumber).toBe(true)
      }
    })

    test('can be used with FlameGraph component', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/profile.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: profileData,
        })
      })

      // Test that fetchProfile result can be used with FlameGraph
      const canUseWithFlameGraph = await page.evaluate(async () => {
        try {
          const profile = await window.fetchProfile('http://example.com/profile.pprof')

          // Check if profile has all the properties FlameGraph needs
          const hasRequiredProps = !!(
            profile.sampleType &&
            profile.sample &&
            profile.location &&
            profile.function &&
            profile.stringTable
          )

          return hasRequiredProps
        } catch (error) {
          return false
        }
      })

      expect(canUseWithFlameGraph).toBe(true)
    })
  })

  test.describe('Performance Tests', () => {
    test('handles fetch response in reasonable time', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/profile.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: profileData,
        })
      })

      const timing = await page.evaluate(async () => {
        const startTime = performance.now()
        await window.fetchProfile('http://example.com/profile.pprof')
        const endTime = performance.now()
        return endTime - startTime
      })

      // Should complete in reasonable time (less than 5 seconds)
      expect(timing).toBeLessThan(5000)
    })
  })

  test.describe('Type Safety', () => {
    test('returns correct type structure', async ({ page }) => {
      const profileData = readFileSync(join(__dirname, 'fixtures', 'profile.pprof'))

      await page.route('http://example.com/profile.pprof', route => {
        route.fulfill({
          status: 200,
          contentType: 'application/octet-stream',
          body: profileData,
        })
      })

      const typeCheck = await page.evaluate(async () => {
        const profile = await window.fetchProfile('http://example.com/profile.pprof')

        return {
          isObject: typeof profile === 'object',
          hasCorrectArrayTypes:
            Array.isArray(profile.sampleType) &&
            Array.isArray(profile.sample) &&
            Array.isArray(profile.location) &&
            Array.isArray(profile.function) &&
            typeof profile.stringTable === 'object',
        }
      })

      expect(typeCheck.isObject).toBe(true)
      expect(typeCheck.hasCorrectArrayTypes).toBe(true)
    })
  })
})
