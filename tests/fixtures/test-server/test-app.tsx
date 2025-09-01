import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { FlameGraph } from '../../../src/components/FlameGraph'
import { StackDetails } from '../../../src/components/StackDetails'
import { FlameGraphTooltip } from '../../../src/components/FlameGraphTooltip'
import { HottestFramesBar } from '../../../src/components/HottestFramesBar'
import { HottestFramesControls } from '../../../src/components/HottestFramesControls'
import { FrameDetails } from '../../../src/components/FrameDetails'
import { FullFlameGraph } from '../../../src/components/FullFlameGraph'
import { FlameNode, FrameData, FlameDataProcessor } from '../../../src/renderer'
import { fetchProfile } from '../../../src/parser'
import { generateMockProfile } from '../mock-data'

// Expose components globally for testing
declare global {
  interface Window {
    fetchProfile: typeof fetchProfile
    FlameGraphTooltip: typeof FlameGraphTooltip
    waitForAnimationComplete: () => Promise<void>
  }
}
window.fetchProfile = fetchProfile
window.FlameGraphTooltip = FlameGraphTooltip

// Global promise resolver for animation completion
let animationCompleteResolver: (() => void) | null = null

window.waitForAnimationComplete = () => {
  return new Promise<void>((resolve) => {
    animationCompleteResolver = resolve
  })
}

// Test component that renders FlameGraph with different configurations
const TestApp: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<any | null>(null)
  const [stackTrace, setStackTrace] = useState<FlameNode[]>([])
  const [children, setChildren] = useState<FlameNode[]>([])

  const handleFrameClick = (frame: any, stack: FlameNode[], frameChildren: FlameNode[]) => {
    setSelectedFrame(frame)
    setStackTrace(stack)
    setChildren(frameChildren)

    // Store for test assertions without console output
    // Tests can check this via window object if needed
  }

  const handleAnimationComplete = () => {
    // Signal animation complete without console output
    if (animationCompleteResolver) {
      animationCompleteResolver()
      animationCompleteResolver = null
    }
  }

  // Get test configuration from URL params
  const params = new URLSearchParams(window.location.search)
  const testMode = params.get('mode') || 'default'
  const showStackDetails = params.get('stackDetails') === 'true'
  const showHottestFrames = params.get('hottestFrames') === 'true'
  const showHottestControls = params.get('hottestControls') === 'true'
  const showFrameDetails = params.get('frameDetails') === 'true'
  const showFullFlameGraph = params.get('fullFlameGraph') === 'true'
  const showFlameGraph = params.get('flamegraph') !== 'false' // Default to true
  const hottestHeight = params.get('hottestHeight') ? parseInt(params.get('hottestHeight')!) : 10
  const prePopulateStackDetails = params.get('prePopulateStackDetails') === 'true'

  // Generate consistent mock profile for testing
  const testProfile = useMemo(() => {
    // Use a seeded random approach for consistent test results
    const originalRandom = Math.random
    let seed = 12345
    const seededRandom = () => {
      const x = Math.sin(seed++) * 10000
      return x - Math.floor(x)
    }

    Math.random = seededRandom
    const profile = generateMockProfile()
    Math.random = originalRandom

    return profile
  }, [])

  // Different configurations for different test scenarios
  const configs: Record<string, any> = {
    default: {
      profile: testProfile,
      width: 800,
      height: 600,
      primaryColor: '#ff4444',
      secondaryColor: '#ffcc66',
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
      fontFamily: 'monospace',
    },
    blue: {
      profile: testProfile,
      width: 800,
      height: 600,
      primaryColor: '#2563eb',
      secondaryColor: '#7dd3fc',
      backgroundColor: '#2c3e50',
      textColor: '#ffffff',
      fontFamily: 'monospace',
    },
    small: {
      profile: testProfile,
      width: 400,
      height: 300,
      primaryColor: '#ff4444',
      secondaryColor: '#ffcc66',
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
      fontFamily: 'monospace',
    },
  }

  const config = configs[testMode] || configs.default

  // Pre-populate stack details for unit testing if requested
  React.useEffect(() => {
    if (prePopulateStackDetails && testProfile) {
      // Process the profile to get the flame graph structure
      const processor = new FlameDataProcessor()
      const flameGraphRoot = processor.processProfile(testProfile)
      // Find a reasonable frame to pre-select (e.g., a nested frame)
      const findNestedFrame = (node: any, depth = 0): any => {
        if (!node) {
          return null
        }
        
        // Return a frame that's deep enough to have interesting stack trace
        if (depth >= 1 && node.name && node.value) {
          return node
        }
        
        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            const result = findNestedFrame(child, depth + 1)
            if (result) {
              return result
            }
          }
        }
        
        return null
      }
      
      const frameToSelect = findNestedFrame(flameGraphRoot)
      if (frameToSelect) {
        // Build stack trace from root to selected frame
        const buildStackTrace = (root: any, target: any, path: any[] = []): any[] | null => {
          if (!root || !target) {
            return null
          }
          
          const currentPath = [...path, root]
          
          if (root.id === target.id) {
            return currentPath
          }
          
          if (root.children) {
            for (const child of root.children) {
              const result = buildStackTrace(child, target, currentPath)
              if (result) {
                return result
              }
            }
          }
          
          return null
        }
        
        const stackTrace = buildStackTrace(flameGraphRoot, frameToSelect) || []
        const children = frameToSelect.children || []
        
        setSelectedFrame(frameToSelect)
        setStackTrace(stackTrace)
        setChildren(children)
      }
    }
  }, [prePopulateStackDetails, testProfile])

  // Handle frame selection from HottestFramesBar
  const handleHotFrameSelect = (frame: FrameData | null) => {
    if (frame) {
      // Convert FrameData to the format expected by other components
      setSelectedFrame(frame)
      // Would need to compute stack trace and children here
      // For testing, we'll use simplified data
      setStackTrace([frame] as any)
      setChildren([])
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '20px',
      backgroundColor: config.backgroundColor,
      minHeight: '100vh',
    }}>
      {showHottestFrames && (
        <div className="hottest-frames-bar" style={{ width: '100%' }} data-testid="hottest-frames-container">
          <HottestFramesBar
            profile={config.profile}
            width={config.width}
            height={hottestHeight}
            primaryColor={config.primaryColor}
            secondaryColor={config.secondaryColor}
            backgroundColor={config.backgroundColor}
            textColor={config.textColor}
            selectedFrame={selectedFrame}
            onFrameSelect={handleHotFrameSelect}
          />
        </div>
      )}
      
      {showHottestControls && (
        <div style={{ width: '100%' }} data-testid="hottest-controls-container">
          <HottestFramesControls
            profile={config.profile}
            selectedFrame={selectedFrame}
            onFrameSelect={handleHotFrameSelect}
            textColor={config.textColor}
          />
        </div>
      )}

      {showFullFlameGraph && (
        <div style={{ width: '100%', height: '600px' }} data-testid="full-flamegraph-container">
          <FullFlameGraph
            profile={config.profile}
            primaryColor={config.primaryColor}
            secondaryColor={config.secondaryColor}
            backgroundColor={config.backgroundColor}
            textColor={config.textColor}
            fontFamily={config.fontFamily}
          />
        </div>
      )}

      {showFrameDetails && (
        <div style={{ width: '100%' }} data-testid="frame-details-container">
          <FrameDetails
            frame={selectedFrame}
            selfTime={selectedFrame ? selectedFrame.value : undefined}
            textColor={config.textColor}
            fontFamily={config.fontFamily}
          />
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '20px',
        flex: 1
      }}>
        {showFlameGraph && (
          <div style={{ flex: 1 }} data-testid="flamegraph-container">
            <FlameGraph
              {...config}
              onFrameClick={handleFrameClick}
              onAnimationComplete={handleAnimationComplete}
            />
          </div>
        )}
        {showStackDetails && (
          <div style={{ width: '400px' }} data-testid="stack-details-container">
            <StackDetails
              selectedFrame={selectedFrame}
              stackTrace={stackTrace}
              children={children}
              backgroundColor={config.backgroundColor}
              textColor={config.textColor}
              primaryColor={config.primaryColor}
              secondaryColor={config.secondaryColor}
            />
          </div>
        )}
      </div>
    </div>
  )
}

// Mount the app
const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<TestApp />)
}
