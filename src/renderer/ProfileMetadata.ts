import { Profile } from 'pprof-format'

/**
 * Supported profile types
 */
export enum ProfileType {
  CPU = 'cpu',
  HEAP = 'heap',
  UNKNOWN = 'unknown'
}

/**
 * Supported time units
 */
export enum TimeUnit {
  NANOSECONDS = 'nanoseconds',
  MICROSECONDS = 'microseconds',
  MILLISECONDS = 'milliseconds',
  SECONDS = 'seconds'
}

/**
 * Supported space units
 */
export enum SpaceUnit {
  BYTES = 'bytes',
  KILOBYTES = 'kilobytes',
  MEGABYTES = 'megabytes',
  GIGABYTES = 'gigabytes'
}

/**
 * Profile metadata containing type and unit information
 */
export interface ProfileMetadata {
  profileType: ProfileType
  unit: TimeUnit | SpaceUnit
  sampleTypeIndex: number
  scaleFactor: number
}

/**
 * Detect the profile type and unit from a Profile's sampleType
 */
export function detectProfileMetadata(profile: Profile): ProfileMetadata {
  const stringTable = profile.stringTable?.strings || []

  // Helper to get string from table
  const getString = (index: number | bigint | undefined): string => {
    if (index === undefined) {
      return ''
    }
    const idx = Number(index)
    return stringTable[idx] || ''
  }

  // Check each sample type to find the primary one
  const sampleTypes = profile.sampleType || []

  for (let i = 0; i < sampleTypes.length; i++) {
    const sampleType = sampleTypes[i]
    const type = getString(sampleType.type).toLowerCase()
    const unit = getString(sampleType.unit).toLowerCase()

    // Skip the first entry if it's just a sample/allocation count
    if (type === 'samples' || type === 'objects' || type === 'alloc_objects' || type === 'inuse_objects') {
      continue
    }

    // Check for CPU profile (wall time, cpu time, etc.)
    if (type === 'wall' || type === 'cpu' || type === 'time') {
      return {
        profileType: ProfileType.CPU,
        unit: normalizeTimeUnit(unit),
        sampleTypeIndex: i,
        scaleFactor: getTimeScaleFactor(unit)
      }
    }

    // Check for heap profile (space allocations)
    if (type === 'space' || type === 'alloc_space' || type === 'inuse_space') {
      return {
        profileType: ProfileType.HEAP,
        unit: normalizeSpaceUnit(unit),
        sampleTypeIndex: i,
        scaleFactor: getSpaceScaleFactor(unit)
      }
    }
  }

  // Default to unknown if we can't determine the type
  return {
    profileType: ProfileType.UNKNOWN,
    unit: TimeUnit.NANOSECONDS,
    sampleTypeIndex: 0,
    scaleFactor: 1
  }
}

/**
 * Normalize time unit string to enum
 */
function normalizeTimeUnit(unit: string): TimeUnit {
  const normalized = unit.toLowerCase()

  if (normalized.includes('nanosecond') || normalized === 'ns') {
    return TimeUnit.NANOSECONDS
  }
  if (normalized.includes('microsecond') || normalized === 'us' || normalized === 'μs') {
    return TimeUnit.MICROSECONDS
  }
  if (normalized.includes('millisecond') || normalized === 'ms') {
    return TimeUnit.MILLISECONDS
  }
  if (normalized.includes('second') || normalized === 's') {
    return TimeUnit.SECONDS
  }

  // Default to nanoseconds for CPU profiles
  return TimeUnit.NANOSECONDS
}

/**
 * Normalize space unit string to enum
 */
function normalizeSpaceUnit(unit: string): SpaceUnit {
  const normalized = unit.toLowerCase()

  if (normalized.includes('byte') && !normalized.includes('kilo') && !normalized.includes('mega') && !normalized.includes('giga')) {
    return SpaceUnit.BYTES
  }
  if (normalized.includes('kilobyte') || normalized === 'kb') {
    return SpaceUnit.KILOBYTES
  }
  if (normalized.includes('megabyte') || normalized === 'mb') {
    return SpaceUnit.MEGABYTES
  }
  if (normalized.includes('gigabyte') || normalized === 'gb') {
    return SpaceUnit.GIGABYTES
  }

  // Default to bytes for heap profiles
  return SpaceUnit.BYTES
}

/**
 * Get scale factor to convert time units to nanoseconds
 */
function getTimeScaleFactor(unit: string): number {
  const normalized = unit.toLowerCase()

  if (normalized.includes('second') && !normalized.includes('nano') && !normalized.includes('micro') && !normalized.includes('milli')) {
    return 1_000_000_000 // seconds to nanoseconds
  }
  if (normalized.includes('millisecond') || normalized === 'ms') {
    return 1_000_000 // milliseconds to nanoseconds
  }
  if (normalized.includes('microsecond') || normalized === 'us' || normalized === 'μs') {
    return 1_000 // microseconds to nanoseconds
  }

  return 1 // nanoseconds or unknown
}

/**
 * Get scale factor to convert space units to bytes
 */
function getSpaceScaleFactor(unit: string): number {
  const normalized = unit.toLowerCase()

  if (normalized.includes('gigabyte') || normalized === 'gb') {
    return 1024 * 1024 * 1024 // GB to bytes
  }
  if (normalized.includes('megabyte') || normalized === 'mb') {
    return 1024 * 1024 // MB to bytes
  }
  if (normalized.includes('kilobyte') || normalized === 'kb') {
    return 1024 // KB to bytes
  }

  return 1 // bytes or unknown
}

/**
 * Check if a profile is a CPU profile
 */
export function isCPUProfile(metadata: ProfileMetadata): boolean {
  return metadata.profileType === ProfileType.CPU
}

/**
 * Check if a profile is a heap profile
 */
export function isHeapProfile(metadata: ProfileMetadata): boolean {
  return metadata.profileType === ProfileType.HEAP
}
