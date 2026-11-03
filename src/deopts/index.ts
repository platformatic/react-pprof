import type { Profile } from 'pprof-format'
import { DEOPT_REASONS, DeoptKind, DeoptReasonInfo } from './catalog.js'

export { DEOPT_REASONS }
export type { DeoptKind, DeoptReasonInfo }

/**
 * Identifies the deopt payload inside a pprof `comment` string.
 *
 * Producers (e.g. @platformatic/flame) add a single comment to the profile
 * whose content is a JSON document of type {@link DeoptPayload}. Comments are
 * free-form text in the pprof format, so other pprof tools ignore it.
 */
export const DEOPT_PAYLOAD_TYPE = 'v8-deopts'

/**
 * Deopt reasons that are part of V8's normal tiering. They happen in almost
 * every program and are rarely actionable.
 */
export type DeoptCategory = 'actionable' | 'tiering' | 'internal'

export interface DeoptEntry {
  /** V8 reason message, as written in the `code-deopt` log record */
  reason: string
  /** Bailout kind, as reported by V8 (`deopt-eager`, `deopt-lazy`, `dependency-change`, ...) */
  bailoutType?: string
  /** Number of times this reason was logged at this position */
  count: number
  /** Deopt site, as reported by V8: `file:line:column` */
  position?: string
}

export interface DeoptFunction {
  /** Function name, as used for the profile's function table */
  name: string
  /** Script name/URL, as used for the profile's function table */
  file?: string
  /** 1-based line of the function start */
  line?: number
  deopts: DeoptEntry[]
}

export interface DeoptPayload {
  type: typeof DEOPT_PAYLOAD_TYPE
  version: 1
  functions: DeoptFunction[]
}

/**
 * A deopt entry enriched with catalog information
 */
export interface FrameDeopt extends DeoptEntry {
  kind: DeoptKind
  category: DeoptCategory
  /** V8's enum name for the reason, when known */
  name?: string
  /** Explanation and guidance, when known */
  meaning?: string
}

export interface FrameDeoptSummary {
  /** All deopts for the frame, most frequent first */
  deopts: FrameDeopt[]
  /** Sum of all counts */
  total: number
  /** Sum of counts for actionable reasons (excludes tiering and engine-internal events) */
  actionable: number
}

const INTERNAL_REASONS = new Set([
  '%_DeoptimizeNow',
  'for testing',
  'JS debugger attached',
  'embedded weak objects cleared',
  'value in stack frame was materialized',
  '(unknown)'
])

const TIERING_REASONS = new Set([
  'prepare for on stack replacement (OSR)',
  "exit from OSR'd inner loop",
  'marked due to eager deopt'
])

/**
 * Classify a V8 deopt reason message
 */
export function getDeoptCategory(reason: string): DeoptCategory {
  if (INTERNAL_REASONS.has(reason)) {
    return 'internal'
  }
  if (TIERING_REASONS.has(reason) || reason.startsWith('Insufficient type feedback')) {
    return 'tiering'
  }
  return 'actionable'
}

/**
 * Look up catalog information for a V8 deopt reason message
 */
export function getDeoptReasonInfo(reason: string): DeoptReasonInfo | undefined {
  return Object.prototype.hasOwnProperty.call(DEOPT_REASONS, reason) ? DEOPT_REASONS[reason] : undefined
}

function inferKind(entry: DeoptEntry, info: DeoptReasonInfo | undefined): DeoptKind {
  if (info) {
    return info.kind
  }
  const bailout = entry.bailoutType || ''
  return bailout.includes('lazy') || bailout === 'dependency-change' ? 'lazy' : 'eager'
}

function summarize(entries: DeoptEntry[]): FrameDeoptSummary {
  let total = 0
  let actionable = 0
  const deopts: FrameDeopt[] = entries.map((entry) => {
    const info = getDeoptReasonInfo(entry.reason)
    const category = getDeoptCategory(entry.reason)
    const count = Number(entry.count) || 0
    total += count
    if (category === 'actionable') {
      actionable += count
    }
    return {
      ...entry,
      count,
      kind: inferKind(entry, info),
      category,
      name: info?.reason,
      meaning: info?.meaning
    }
  })
  deopts.sort((a, b) => b.count - a.count)
  return { deopts, total, actionable }
}

function isDeoptPayload(value: unknown): value is DeoptPayload {
  if (!value || typeof value !== 'object') {
    return false
  }
  const payload = value as Partial<DeoptPayload>
  return payload.type === DEOPT_PAYLOAD_TYPE && Array.isArray(payload.functions)
}

/**
 * Extract the deopt payload from a profile's comments, if present
 */
export function extractDeoptPayload(profile: Profile | null | undefined): DeoptPayload | null {
  if (!profile || !profile.comment || profile.comment.length === 0) {
    return null
  }
  const strings = profile.stringTable?.strings || []
  for (const index of profile.comment) {
    const text = strings[Number(index)]
    if (typeof text !== 'string' || !text.includes(DEOPT_PAYLOAD_TYPE)) {
      continue
    }
    try {
      const parsed = JSON.parse(text)
      if (isDeoptPayload(parsed)) {
        return parsed
      }
    } catch {
      // Not our payload
    }
  }
  return null
}

function key(name: string, file: string | undefined, line: number | undefined): string {
  return `${name}\u0000${file || ''}\u0000${line || 0}`
}

/**
 * Index of deopts by function, used to annotate flame graph frames
 */
export class DeoptIndex {
  #exact = new Map<string, FrameDeoptSummary>()
  #byNameAndFile = new Map<string, FrameDeoptSummary | null>()
  #total = 0

  constructor(payload: DeoptPayload) {
    const grouped = new Map<string, { fn: DeoptFunction, deopts: DeoptEntry[] }>()
    for (const fn of payload.functions) {
      if (!fn || typeof fn.name !== 'string' || !Array.isArray(fn.deopts)) {
        continue
      }
      const k = key(fn.name, fn.file, fn.line)
      const existing = grouped.get(k)
      if (existing) {
        existing.deopts.push(...fn.deopts)
      } else {
        grouped.set(k, { fn, deopts: [...fn.deopts] })
      }
    }

    for (const [k, { fn, deopts }] of grouped) {
      const summary = summarize(deopts)
      this.#total += summary.total
      this.#exact.set(k, summary)

      // Secondary index without the line, used when the profile reports a
      // different line for the same function. Ambiguous entries are dropped.
      const loose = key(fn.name, fn.file, 0)
      this.#byNameAndFile.set(loose, this.#byNameAndFile.has(loose) ? null : summary)
    }
  }

  /** Sum of all deopt counts in the index */
  get total(): number {
    return this.#total
  }

  /** Number of functions with deopts */
  get size(): number {
    return this.#exact.size
  }

  /**
   * Find the deopts for a frame
   */
  lookup(name: string, file?: string, line?: number): FrameDeoptSummary | undefined {
    return this.#exact.get(key(name, file, line)) ??
      this.#byNameAndFile.get(key(name, file, 0)) ??
      undefined
  }
}

/**
 * Build a deopt index from a profile, or null if it carries no deopt data
 */
export function createDeoptIndex(profile: Profile | null | undefined): DeoptIndex | null {
  const payload = extractDeoptPayload(profile)
  return payload ? new DeoptIndex(payload) : null
}
