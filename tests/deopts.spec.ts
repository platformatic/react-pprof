import { test, expect } from '@playwright/test'
import { FlameGraphTestUtils } from './test-utils'

test.describe('V8 deopt overlay', () => {
  test.describe('Deopt data parsing', () => {
    test('extracts the deopt payload from profile comments', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ deopts: true })

      const result = await page.evaluate(() => {
        const { extractDeoptPayload, profile } = window.deoptTest
        const payload = extractDeoptPayload(profile)
        return payload && { type: payload.type, version: payload.version, functions: payload.functions.length }
      })
      expect(result).toEqual({ type: 'v8-deopts', version: 1, functions: 2 })
    })

    test('returns null when the profile has no deopt data', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      const result = await page.evaluate(() => {
        const { createDeoptIndex, profile } = window.deoptTest
        return createDeoptIndex(profile)
      })
      expect(result).toBeNull()
    })

    test('ignores comments that are not deopt payloads', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      const result = await page.evaluate(() => {
        const { extractDeoptPayload } = window.deoptTest
        const profile = {
          stringTable: { strings: ['', 'just a note', '{"type":"v8-deopts" broken json', '{"type":"other"}'] },
          comment: [1, 2, 3]
        }
        return extractDeoptPayload(profile)
      })
      expect(result).toBeNull()
    })

    test('summarizes and classifies deopts per function', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ deopts: true })

      const summary = await page.evaluate(() => {
        const { createDeoptIndex, profile } = window.deoptTest
        return createDeoptIndex(profile).lookup('db.Query', 'database/query.go', 120)
      })

      expect(summary.total).toBe(347)
      expect(summary.actionable).toBe(342)
      // Sorted by count
      expect(summary.deopts.map((d: any) => d.reason)).toEqual([
        'wrong map',
        'prepare for on stack replacement (OSR)',
        'dependent prototype chain changed'
      ])
      const [wrongMap, osr, proto] = summary.deopts
      expect(wrongMap).toMatchObject({ kind: 'eager', category: 'actionable', name: 'WrongMap', count: 340 })
      expect(wrongMap.meaning).toContain('map')
      expect(osr).toMatchObject({ category: 'tiering' })
      expect(proto).toMatchObject({ kind: 'lazy', category: 'actionable', name: 'PrototypeChange' })
    })

    test('falls back to name and file when the line differs', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ deopts: true })

      const result = await page.evaluate(() => {
        const { createDeoptIndex, profile } = window.deoptTest
        const index = createDeoptIndex(profile)
        return {
          otherLine: index.lookup('db.Query', 'database/query.go', 999)?.total,
          otherFile: index.lookup('db.Query', 'other.go', 120)?.total ?? null
        }
      })
      expect(result).toEqual({ otherLine: 347, otherFile: null })
    })

    test('classifies reasons and handles unknown ones', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest()

      const result = await page.evaluate(() => {
        const { getDeoptCategory, getDeoptReasonInfo } = window.deoptTest
        return {
          wrongMap: getDeoptCategory('wrong map'),
          feedback: getDeoptCategory('Insufficient type feedback for call'),
          osr: getDeoptCategory('prepare for on stack replacement (OSR)'),
          debugger: getDeoptCategory('JS debugger attached'),
          unknown: getDeoptCategory('some future reason'),
          unknownInfo: getDeoptReasonInfo('some future reason') ?? null,
          protoInfo: getDeoptReasonInfo('toString') ?? null
        }
      })
      expect(result).toEqual({
        wrongMap: 'actionable',
        feedback: 'tiering',
        osr: 'tiering',
        debugger: 'internal',
        unknown: 'actionable',
        unknownInfo: null,
        protoInfo: null
      })
    })

    test('attaches deopts to flame graph nodes', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ deopts: true })

      const result = await page.evaluate(() => {
        const { FlameDataProcessor, profile } = window.deoptTest
        const root = new FlameDataProcessor().processProfile(profile)
        const withDeopts = new Map<string, number>()
        let dbQueryNodes = 0
        const visit = (node: any) => {
          if (node.name === 'db.Query') {
            dbQueryNodes++
          }
          if (node.deopts) {
            withDeopts.set(node.name, (withDeopts.get(node.name) || 0) + 1)
          }
          node.children.forEach(visit)
        }
        visit(root)
        return { dbQueryNodes, withDeopts: Object.fromEntries(withDeopts) }
      })

      expect(result.dbQueryNodes).toBeGreaterThan(0)
      expect(result.withDeopts['db.Query']).toBe(result.dbQueryNodes)
      expect(Object.keys(result.withDeopts).sort()).toEqual(['db.Query', 'json.Marshal'])
    })
  })

  test.describe('UI', () => {
    test('DeoptDetails lists deopts with explanations', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ deopts: true, deoptDetails: true })

      const details = page.locator('[data-testid="deopt-details-container"] .deopt-details')
      await expect(details).toBeVisible()
      await expect(details).toContainText('V8 deoptimizations (347)')
      await expect(details).toContainText('340×')
      await expect(details).toContainText('wrong map')
      await expect(details).toContainText('database/query.go:130:12')
      await expect(details).toContainText('dependent prototype chain changed')

      // Tiering events are collapsed
      const summary = details.locator('summary')
      await expect(summary).toContainText('5 tiering / engine-internal events')
      const osr = details.locator('details li')
      await expect(osr).toBeHidden()
      await summary.click()
      await expect(osr).toBeVisible()
      await expect(osr).toContainText('prepare for on stack replacement (OSR)')
    })

    test('tooltip shows deopt counts', async ({ page }) => {
      await page.goto('http://localhost:3100?deopts=true&deoptTooltip=true&flamegraph=false')

      const deopts = page.locator('[data-testid="deopt-tooltip-container"] .flamegraph-tooltip-deopts')
      await expect(deopts).toBeVisible()
      await expect(deopts).toContainText('Deopts:')
      await expect(deopts).toContainText('347')
      await expect(deopts).toContainText('(342 actionable)')
      await expect(deopts).toContainText('340× wrong map')
    })

    test('Highlight Deopts toggle only appears with deopt data', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)

      await utils.navigateToTest({ fullFlameGraph: true })
      await expect(page.locator('text=Show App Code Only')).toBeVisible()
      await expect(page.locator('text=Highlight Deopts')).toHaveCount(0)

      await utils.navigateToTest({ fullFlameGraph: true, deopts: true })
      await expect(page.locator('text=Highlight Deopts')).toBeVisible()
    })

    test('deopt markers are drawn and can be toggled off', async ({ page }) => {
      const utils = new FlameGraphTestUtils(page)
      await utils.navigateToTest({ fullFlameGraph: true, deopts: true })
      await page.waitForTimeout(500)

      const canvas = page.locator('[data-testid="full-flamegraph-container"] canvas').first()
      const withMarkers = await canvas.screenshot()

      await page.locator('label:has-text("Highlight Deopts") input').uncheck()
      await page.waitForTimeout(300)
      const withoutMarkers = await canvas.screenshot()

      expect(withMarkers.equals(withoutMarkers)).toBe(false)

      await page.locator('label:has-text("Highlight Deopts") input').check()
      await page.waitForTimeout(300)
      const markersAgain = await canvas.screenshot()
      expect(markersAgain.equals(withMarkers)).toBe(true)
    })
  })
})
