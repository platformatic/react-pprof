/**
 * Color management utilities for flame graph rendering
 */

/**
 * Convert hex color to RGB array (0-1 range)
 */
export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`)
  }

  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255
  ]
}

/**
 * Convert RGB array (0-1 range) to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Interpolate between two colors
 */
export function interpolateColor(
  color1: [number, number, number],
  color2: [number, number, number],
  t: number
): [number, number, number] {
  // Clamp t to [0, 1]
  t = Math.max(0, Math.min(1, t))

  return [
    color1[0] + (color2[0] - color1[0]) * t,
    color1[1] + (color2[1] - color1[1]) * t,
    color1[2] + (color2[2] - color1[2]) * t
  ]
}

/**
 * Create a gradient between multiple colors
 */
export function createGradient(colors: string[], steps: number): [number, number, number][] {
  if (colors.length < 2) {
    throw new Error('Gradient requires at least 2 colors')
  }

  const rgbColors = colors.map(color => hexToRgb(color))
  const gradient: [number, number, number][] = []

  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    const segmentIndex = t * (rgbColors.length - 1)
    const lowerIndex = Math.floor(segmentIndex)
    const upperIndex = Math.min(lowerIndex + 1, rgbColors.length - 1)
    const localT = segmentIndex - lowerIndex

    gradient.push(interpolateColor(rgbColors[lowerIndex], rgbColors[upperIndex], localT))
  }

  return gradient
}

/**
 * Get color for a frame based on its depth and value
 */
export function getFrameColor(
  primaryColor: [number, number, number],
  secondaryColor: [number, number, number],
  depth: number,
  maxDepth: number,
  normalizedValue: number
): [number, number, number] {
  // Mix colors based on depth and value
  const depthFactor = maxDepth > 0 ? depth / maxDepth : 0
  const valueFactor = normalizedValue

  // Combine depth and value factors
  const mixFactor = (depthFactor * 0.6 + valueFactor * 0.4)

  return interpolateColor(primaryColor, secondaryColor, mixFactor)
}

/**
 * Apply opacity to a color
 */
export function withOpacity(color: [number, number, number], opacity: number): [number, number, number, number] {
  return [color[0], color[1], color[2], Math.max(0, Math.min(1, opacity))]
}

/**
 * Darken a color by a factor
 */
export function darken(color: [number, number, number], factor: number): [number, number, number] {
  factor = Math.max(0, Math.min(1, factor))
  return [
    color[0] * (1 - factor),
    color[1] * (1 - factor),
    color[2] * (1 - factor)
  ]
}

/**
 * Lighten a color by a factor
 */
export function lighten(color: [number, number, number], factor: number): [number, number, number] {
  factor = Math.max(0, Math.min(1, factor))
  return [
    color[0] + (1 - color[0]) * factor,
    color[1] + (1 - color[1]) * factor,
    color[2] + (1 - color[2]) * factor
  ]
}

/**
 * Get a readable text color (black or white) for a given background
 */
export function getContrastColor(backgroundColor: [number, number, number]): [number, number, number] {
  // Calculate relative luminance
  const luminance = 0.299 * backgroundColor[0] + 0.587 * backgroundColor[1] + 0.114 * backgroundColor[2]

  // Return white for dark backgrounds, black for light backgrounds
  return luminance > 0.5 ? [0, 0, 0] : [1, 1, 1]
}

/**
 * Validate if a string is a valid hex color
 */
export function isValidHex(hex: string): boolean {
  return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex)
}

/**
 * Normalize hex color (ensure it has # prefix and is 6 digits)
 */
export function normalizeHex(hex: string): string {
  if (!isValidHex(hex)) {
    return '#ffffff'; // Default fallback
  }

  // Add # if missing
  if (!hex.startsWith('#')) {
    hex = '#' + hex
  }

  // Expand 3-digit hex to 6-digit
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }

  return hex.toLowerCase()
}
