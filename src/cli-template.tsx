import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { FlameGraph } from './components/FlameGraph'
import { StackDetails } from './components/StackDetails'
import { FlameNode } from './renderer'
import { Profile } from 'pprof-format'

declare global {
  interface Window {
    PROFILE_DATA: ArrayBuffer
    PROFILE_FILENAME: string
  }
}

const CliTemplate: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<any | null>(null)
  const [stackTrace, setStackTrace] = useState<FlameNode[]>([])
  const [children, setChildren] = useState<FlameNode[]>([])

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
        
        console.log('Decoded profile:', profile)
        setProfile(profile)
      } catch (err) {
        console.error('Profile parsing error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleFrameClick = (frame: any, stack: FlameNode[], frameChildren: FlameNode[]) => {
    setSelectedFrame(frame)
    setStackTrace(stack)
    setChildren(frameChildren)
  }

  const config = useMemo(() => ({
    profile,
    width: Math.max(800, window.innerWidth - 450),
    height: Math.max(600, window.innerHeight - 100),
    primaryColor: '#ff4444',
    secondaryColor: '#ffcc66',
    backgroundColor: '#1e1e1e',
    textColor: '#ffffff',
  }), [profile])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
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
        backgroundColor: '#1e1e1e',
        color: '#ff6b6b',
        fontSize: '18px',
        gap: '10px',
        padding: '20px'
      }}>
        <div>Error loading profile:</div>
        <div style={{ fontSize: '14px', fontFamily: 'monospace' }}>{error}</div>
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
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
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
      backgroundColor: config.backgroundColor,
    }}>
      <header style={{
        padding: '15px 20px',
        backgroundColor: '#2a2a2a',
        borderBottom: '1px solid #333',
        color: config.textColor,
        flexShrink: 0
      }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>PProf Viewer</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.7, fontSize: '14px' }}>
          File: {window.PROFILE_FILENAME}
        </p>
      </header>
      
      <div style={{
        display: 'flex',
        gap: '20px',
        padding: '20px',
        flex: 1,
        overflow: 'hidden'
      }}>
        <div style={{ flex: 1 }}>
          <FlameGraph
            {...config}
            onFrameClick={handleFrameClick}
          />
        </div>
        
        <div style={{ width: '400px', overflow: 'auto' }}>
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