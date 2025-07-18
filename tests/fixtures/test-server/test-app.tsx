import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { FlameGraph } from '../../../src/components/FlameGraph'
import { StackDetails } from '../../../src/components/StackDetails'
import { FlameGraphTooltip } from '../../../src/components/FlameGraphTooltip'
import { FlameNode } from '../../../src/renderer'
import { fetchProfile } from '../../../src/parser'
import { generateMockProfile } from '../mock-data'

// Expose components globally for testing
declare global {
  interface Window {
    fetchProfile: typeof fetchProfile
    FlameGraphTooltip: typeof FlameGraphTooltip
  }
}
window.fetchProfile = fetchProfile
window.FlameGraphTooltip = FlameGraphTooltip

// Test component that renders FlameGraph with different configurations
const TestApp: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<any | null>(null)
  const [stackTrace, setStackTrace] = useState<FlameNode[]>([])
  const [children, setChildren] = useState<FlameNode[]>([])

  const handleFrameClick = (frame: any, stack: FlameNode[], frameChildren: FlameNode[]) => {
    setSelectedFrame(frame)
    setStackTrace(stack)
    setChildren(frameChildren)

    // Log for test assertions
    console.log('Frame clicked:', {
      name: frame.name,
      value: frame.value,
      depth: frame.depth
    })
  }

  // Get test configuration from URL params
  const params = new URLSearchParams(window.location.search)
  const testMode = params.get('mode') || 'default'
  const showStackDetails = params.get('stackDetails') === 'true'

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
    },
    blue: {
      profile: testProfile,
      width: 800,
      height: 600,
      primaryColor: '#2563eb',
      secondaryColor: '#7dd3fc',
      backgroundColor: '#2c3e50',
      textColor: '#ffffff',
    },
    small: {
      profile: testProfile,
      width: 400,
      height: 300,
      primaryColor: '#ff4444',
      secondaryColor: '#ffcc66',
      backgroundColor: '#1e1e1e',
      textColor: '#ffffff',
    },
  }

  const config = configs[testMode] || configs.default

  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      padding: '20px',
      backgroundColor: config.backgroundColor,
      minHeight: '100vh',
    }}>
      <div style={{ flex: 1 }} data-testid="flamegraph-container">
        <FlameGraph
          {...config}
          onFrameClick={handleFrameClick}
        />
      </div>
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
  )
}

// Mount the app
const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<TestApp />)
}
