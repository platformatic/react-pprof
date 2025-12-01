import ReactDOM from 'react-dom/client'
import { FullFlameGraph } from './components/FullFlameGraph'
import { Profile } from 'pprof-format'

// Theme colors
const BACKGROUND_COLOR = '#1e1e1e'
const TEXT_COLOR = '#ffffff'
const ERROR_COLOR = '#ff6b6b'

// Export a reusable render function for programmatic use
declare global {
  interface Window {
    renderReactPprofFlameGraph: (containerId: string, options: {
      profileData: ArrayBuffer
      filename: string
      title: string
      primaryColor?: string
      secondaryColor?: string
    }) => void
  }
}

window.renderReactPprofFlameGraph = (containerId: string, options) => {
  const container = document.getElementById(containerId)
  if (!container) {
    console.error(`Container with id "${containerId}" not found`)
    return
  }

  const primaryColor = options.primaryColor || '#ff4444'
  const secondaryColor = options.secondaryColor || '#ffcc66'

  try {
    // Parse the pprof binary data
    const uint8Array = new Uint8Array(options.profileData)
    const profile = Profile.decode(uint8Array)

    // Render the flamegraph with a wrapper that handles sizing
    const root = ReactDOM.createRoot(container)

    root.render(
      <FullFlameGraph
        profile={profile}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        backgroundColor={BACKGROUND_COLOR}
        textColor={TEXT_COLOR}
        showHottestFrames={true}
        showControls={true}
        showStackDetails={true}
        hottestFramesHeight={12}
      />
    )
  } catch (err) {
    container.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: ${ERROR_COLOR}; font-size: 16px;">
        Error loading profile: ${err instanceof Error ? err.message : 'Unknown error'}
      </div>
    `
  }
}
