// Renderer module exports

// Export the new refactored renderer
export { FlameGraphRenderer } from './FlameGraphRenderer'

// Export new focused classes and their types
export { WebGLManager } from './WebGLManager'
export { CameraController } from './CameraController'
export {
  hexToRgb,
  rgbToHex,
  interpolateColor,
  createGradient,
  getFrameColor,
  withOpacity,
  darken,
  lighten,
  getContrastColor,
  isValidHex,
  normalizeHex
} from './colors'
export { InteractionHandler } from './InteractionHandler'
export { FlameDataProcessor, type FlameNode, type FrameData } from './FlameDataProcessor'
export { TextRenderer } from './TextRenderer'
export { FrameRenderer } from './FrameRenderer'

// Export utilities
export * from './shaders'
export * from './constants'