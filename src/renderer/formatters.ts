import { ProfileMetadata, isCPUProfile, isHeapProfile } from './ProfileMetadata'

/**
 * Format a value based on profile type and unit
 */
export function formatValue(value: number, metadata: ProfileMetadata): string {
  if (isCPUProfile(metadata)) {
    return formatTime(value)
  }

  if (isHeapProfile(metadata)) {
    return formatSpace(value)
  }

  // Unknown profile type - just show the number
  return value.toLocaleString()
}

/**
 * Format time value (in nanoseconds) to human-readable format
 */
export function formatTime(nanoseconds: number): string {
  if (nanoseconds === 0) {
    return '0ns'
  }

  // Convert to appropriate unit for readability
  const seconds = nanoseconds / 1_000_000_000
  if (seconds >= 1) {
    return `${seconds.toFixed(2)}s`
  }

  const milliseconds = nanoseconds / 1_000_000
  if (milliseconds >= 1) {
    return `${milliseconds.toFixed(2)}ms`
  }

  const microseconds = nanoseconds / 1_000
  if (microseconds >= 1) {
    return `${microseconds.toFixed(2)}μs`
  }

  return `${nanoseconds.toFixed(0)}ns`
}

/**
 * Format space value (in bytes) to human-readable format
 */
export function formatSpace(bytes: number): string {
  if (bytes === 0) {
    return '0B'
  }

  const absBytes = Math.abs(bytes)

  // Convert to appropriate unit for readability
  if (absBytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  if (absBytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)}MB`
  }

  if (absBytes >= 1024) {
    return `${(bytes / 1024).toFixed(2)}KB`
  }

  return `${bytes.toFixed(0)}B`
}

/**
 * Format percentage value
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(2)}%`
}

/**
 * Get the label for the metric count (samples vs allocations)
 */
export function getMetricLabel(metadata: ProfileMetadata): string {
  if (isCPUProfile(metadata)) {
    return 'Samples'
  }

  if (isHeapProfile(metadata)) {
    return 'Allocations'
  }

  return 'Samples'
}

/**
 * Get the label for value type (time vs space)
 */
export function getValueLabel(metadata: ProfileMetadata): string {
  if (isCPUProfile(metadata)) {
    return 'Time'
  }

  if (isHeapProfile(metadata)) {
    return 'Space'
  }

  return 'Value'
}

/**
 * Get the label for total value
 */
export function getTotalValueLabel(metadata: ProfileMetadata): string {
  if (isCPUProfile(metadata)) {
    return 'Total Time'
  }

  if (isHeapProfile(metadata)) {
    return 'Total Space'
  }

  return 'Total Value'
}

/**
 * Get the label for self value
 */
export function getSelfValueLabel(metadata: ProfileMetadata): string {
  if (isCPUProfile(metadata)) {
    return 'Self Time'
  }

  if (isHeapProfile(metadata)) {
    return 'Self Space'
  }

  return 'Self Value'
}

/**
 * Format a raw sample count (always an integer count)
 */
export function formatSampleCount(count: number): string {
  return count.toLocaleString()
}
