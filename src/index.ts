// Main library exports
export { FlameGraph, type FlameGraphProps } from './components/FlameGraph.js'
export { StackDetails, type StackDetailsProps } from './components/StackDetails.js'
export { FlameGraphTooltip, type FlameGraphTooltipProps } from './components/FlameGraphTooltip.js'
export { HottestFramesBar, type HottestFramesBarProps } from './components/HottestFramesBar.js'
export { HottestFramesControls, type HottestFramesControlsProps } from './components/HottestFramesControls.js'
export { FrameDetails, type FrameDetailsProps } from './components/FrameDetails.js'
export { FullFlameGraph, type FullFlameGraphProps } from './components/FullFlameGraph.js'
export { fetchProfile, type Profile } from './parser.js'

// Embeddable flamegraph generation for server-side use
export {
  generateEmbeddableFlameGraph,
  getFlamegraphBundle,
  type EmbeddableFlameGraphOptions,
  type EmbeddableFlameGraphResult,
  type EmbeddableFlameGraphBundle
} from './embeddable.js'

// Internal types - not recommended for external use
export type { FlameNode, FrameData } from './renderer/FlameDataProcessor.js'
