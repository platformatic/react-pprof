// Main library exports
export { FlameGraph, type FlameGraphProps } from './components/FlameGraph'
export { StackDetails, type StackDetailsProps } from './components/StackDetails'
export { FlameGraphTooltip, type FlameGraphTooltipProps } from './components/FlameGraphTooltip'
export { fetchProfile, type Profile } from './parser'

// Internal types - not recommended for external use
export type { FlameNode, FrameData } from './renderer/FlameDataProcessor'
