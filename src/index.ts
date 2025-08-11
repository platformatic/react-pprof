// Main library exports
export { FlameGraph, type FlameGraphProps } from './components/FlameGraph'
export { StackDetails, type StackDetailsProps } from './components/StackDetails'
export { FlameGraphTooltip, type FlameGraphTooltipProps } from './components/FlameGraphTooltip'
export { HottestFramesBar, type HottestFramesBarProps } from './components/HottestFramesBar'
export { HottestFramesControls, type HottestFramesControlsProps } from './components/HottestFramesControls'
export { FrameDetails, type FrameDetailsProps } from './components/FrameDetails'
export { FullFlameGraph, type FullFlameGraphProps } from './components/FullFlameGraph'
export { fetchProfile, type Profile } from './parser'

// Internal types - not recommended for external use
export type { FlameNode, FrameData } from './renderer/FlameDataProcessor'
