# FlameGraph

A React component that renders interactive flame graphs for profiling data visualization using WebGL.

## Purpose

The FlameGraph component renders performance profiling data from Go's pprof format as an interactive flame graph visualization. It uses WebGL for high-performance rendering and supports zooming, panning, frame selection, and hover interactions with tooltips.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profile` | `Profile` | **required** | The parsed pprof profile data to visualize |
| `width` | `number \| string` | `'100%'` | Width of the flame graph container |
| `height` | `number \| string` | - | Height of the flame graph (auto-calculated if not provided) |
| `primaryColor` | `string` | `'#ff4444'` | Primary color for flame graph frames |
| `secondaryColor` | `string` | `'#ffcc66'` | Secondary color for flame graph frames |
| `backgroundColor` | `string` | `'#1e1e1e'` | Background color of the container |
| `textColor` | `string` | `'#ffffff'` | Text color for frame labels |
| `fontFamily` | `string` | System font stack | Font family for text rendering |
| `shadowOpacity` | `number` | `0.3` | Opacity of frame shadows |
| `selectedOpacity` | `number` | `1.0` | Opacity of selected frames |
| `hoverOpacity` | `number` | `0.9` | Opacity of hovered frames |
| `unselectedOpacity` | `number` | `0.75` | Opacity of unselected frames |
| `framePadding` | `number` | `5` | Padding around frames in pixels |
| `zoomOnScroll` | `boolean` | `false` | Enable zoom functionality with scroll wheel |
| `scrollZoomSpeed` | `number` | `0.05` | Speed of scroll zoom |
| `scrollZoomInverted` | `boolean` | `false` | Invert scroll zoom direction |
| `selectedFrameId` | `string \| null` | - | ID of the currently selected frame |
| `onFrameClick` | `function` | - | Callback when a frame is clicked |
| `onZoomChange` | `function` | - | Callback when zoom level changes |
| `onAnimationComplete` | `function` | - | Callback when animations complete |

## Usage Examples

### Basic Usage with Profile Loading

```tsx
import React, { useState, useEffect } from 'react'
import { FlameGraph } from './FlameGraph'
import { fetchProfile, Profile } from '../parser'

function MyComponent() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile('/path/to/profile.pprof')
      .then(setProfile)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading profile...</div>
  if (error) return <div>Error: {error}</div>
  if (!profile) return <div>No profile data</div>

  return (
    <FlameGraph
      profile={profile}
      width="100%"
      height={500}
    />
  )
}
```

### Loading from API Endpoint

```tsx
import React, { useState, useEffect } from 'react'
import { FlameGraph } from './FlameGraph'
import { fetchProfile, Profile } from '../parser'

function ProfileViewer({ profileUrl }: { profileUrl: string }) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile(profileUrl)
        setProfile(profileData)
      } catch (error) {
        console.error('Failed to load profile:', error)
      }
    }

    loadProfile()
  }, [profileUrl])

  return profile ? (
    <FlameGraph
      profile={profile}
      width="100%"
      height={500}
    />
  ) : (
    <div>Loading...</div>
  )
}
```

### With Custom Colors and Interactions

```tsx
import { FlameGraph } from './FlameGraph'
import { Profile, FrameData, FlameNode } from '../types'

function InteractiveFlameGraph({ profileData }: { profileData: Profile }) {
  const handleFrameClick = (
    frame: FrameData | null,
    stackTrace: FlameNode[],
    children: FlameNode[]
  ) => {
    if (frame) {
      console.log(`Clicked frame: ${frame.name}`)
      console.log(`Stack depth: ${stackTrace.length}`)
      console.log(`Children count: ${children.length}`)
    }
  }

  return (
    <FlameGraph
      profile={profileData}
      width="100%"
      height={600}
      primaryColor="#3b82f6"
      secondaryColor="#ef4444"
      backgroundColor="#0f172a"
      textColor="#f1f5f9"
      zoomOnScroll={true}
      onFrameClick={handleFrameClick}
    />
  )
}
```

### With External Frame Selection

```tsx
import { useState } from 'react'
import { FlameGraph } from './FlameGraph'

function ControlledFlameGraph({ profileData }) {
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null)

  return (
    <div>
      <button onClick={() => setSelectedFrameId('root/main/server')}>
        Select Server Frame
      </button>
      <FlameGraph
        profile={profileData}
        selectedFrameId={selectedFrameId}
        onFrameClick={(frame) => {
          setSelectedFrameId(frame?.id || null)
        }}
      />
    </div>
  )
}
```

## Key Features

- **WebGL Rendering**: High-performance visualization using WebGL
- **Interactive Navigation**: Click to zoom into frames, click empty space to zoom out
- **Pan & Zoom**: Mouse drag to pan when zoomed in, optional scroll wheel zoom
- **Hover Tooltips**: Shows frame details on hover via `FlameGraphTooltip`
- **Responsive**: Automatically adjusts to container size changes
- **Auto-height Mode**: Calculates optimal height based on stack depth
- **Error Handling**: Graceful fallback when WebGL is unavailable
- **Keyboard Accessible**: Supports external frame selection via props

## Technical Details

The component uses a `FlameGraphRenderer` class for WebGL-based rendering and includes:
- Canvas with device pixel ratio support for crisp rendering
- ResizeObserver for responsive behavior
- Mouse interaction handling for clicks, drags, and hovers
- Animation support with completion callbacks
- Automatic cleanup of WebGL resources

## Related Components

- `FlameGraphTooltip`: Displays frame information on hover
- `FullFlameGraph`: Complete flame graph with controls and details panels
- `HottestFramesBar`: Complementary navigation component
