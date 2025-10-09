import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { FullFlameGraph } from './components/FullFlameGraph'
import { Profile } from 'pprof-format'

declare global {
  interface Window {
    PROFILE_DATA: ArrayBuffer
    PROFILE_FILENAME: string
    PROFILE_TITLE: string
    PROFILE_PRIMARY_COLOR?: string
    PROFILE_SECONDARY_COLOR?: string
  }
}

// Theme colors - use window colors if available, otherwise fall back to defaults
const PRIMARY_COLOR = (typeof window !== 'undefined' && window.PROFILE_PRIMARY_COLOR) || '#ff4444'
const SECONDARY_COLOR = (typeof window !== 'undefined' && window.PROFILE_SECONDARY_COLOR) || '#ffcc66'
const BACKGROUND_COLOR = '#1e1e1e'
const TEXT_COLOR = '#ffffff'
const HEADER_BG_COLOR = '#2a2a2a'
const BORDER_COLOR = '#333'
const ERROR_COLOR = '#ff6b6b'

const CliTemplate: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true)
        
        if (!window.PROFILE_DATA) {
          throw new Error('No profile data found')
        }

        // Parse the pprof binary data using pprof-format
        const uint8Array = new Uint8Array(window.PROFILE_DATA)
        const profile = Profile.decode(uint8Array)
        
        setProfile(profile)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: BACKGROUND_COLOR,
        color: TEXT_COLOR,
        fontSize: '18px'
      }}>
        Loading profile...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: BACKGROUND_COLOR,
        color: ERROR_COLOR,
        fontSize: '18px',
        gap: '10px',
        padding: '20px'
      }}>
        <div>Error loading profile:</div>
        <div style={{ fontSize: '14px', fontFamily: 'SF Mono, Monaco, Cascadia Code, Roboto Mono, Courier New, monospace' }}>{error}</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: BACKGROUND_COLOR,
        color: TEXT_COLOR,
        fontSize: '18px'
      }}>
        No profile data
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: BACKGROUND_COLOR,
    }}>
      <header style={{
        padding: '15px 20px',
        backgroundColor: HEADER_BG_COLOR,
        borderBottom: `1px solid ${BORDER_COLOR}`,
        color: TEXT_COLOR,
        flexShrink: 0
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>{window.PROFILE_TITLE}</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.7, fontSize: '14px' }}>
          File: {window.PROFILE_FILENAME}
        </p>
      </header>
      
      <div style={{ flex: 1, padding: '20px' }}>
        <FullFlameGraph
          profile={profile}
          height={Math.max(600, window.innerHeight - 180)}
          primaryColor={PRIMARY_COLOR}
          secondaryColor={SECONDARY_COLOR}
          backgroundColor={BACKGROUND_COLOR}
          textColor={TEXT_COLOR}
          showHottestFrames={true}
          showControls={true}
          showStackDetails={true}
          hottestFramesHeight={12}
        />
      </div>
    </div>
  )
}

// Mount the app when DOM is ready
const container = document.getElementById('root')
if (container) {
  const root = ReactDOM.createRoot(container)
  root.render(<CliTemplate />)
}