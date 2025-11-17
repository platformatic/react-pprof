// Renderer module exports

// Export the new refactored renderer
export { FlameGraphRenderer } from './FlameGraphRenderer.js'

// Export new focused classes and their types
export { WebGLManager } from './WebGLManager.js'
export { CameraController } from './CameraController.js'
export {
  hexToRgb,
  rgbToHex,
  interpolateColor,
  getFrameColorBySameDepthRatio,
  getFrameColorHexBySameDepthRatio,
  withOpacity,
  darken,
  lighten,
  getContrastColor,
  isValidHex,
  normalizeHex
} from './colors.js'
export { InteractionHandler } from './InteractionHandler.js'
export { FlameDataProcessor, type FlameNode, type FrameData } from './FlameDataProcessor.js'
export { TextRenderer } from './TextRenderer.js'
export { FrameRenderer } from './FrameRenderer.js'

// Export profile metadata and formatting utilities
export {
  ProfileType,
  TimeUnit,
  SpaceUnit,
  type ProfileMetadata,
  detectProfileMetadata,
  isCPUProfile,
  isHeapProfile
} from './ProfileMetadata.js'
export {
  formatValue,
  formatTime,
  formatSpace,
  formatPercentage,
  formatSampleCount,
  getMetricLabel,
  getValueLabel,
  getTotalValueLabel,
  getSelfValueLabel
} from './formatters.js'

// Export utilities
export * from './shaders.js'
export * from './constants.js'
