# FullFlameGraph

A comprehensive flame graph component that combines the main flame graph visualization with navigation controls, frame details, and an expandable stack details panel.

## Purpose

The FullFlameGraph component provides a complete profiling visualization experience by integrating multiple sub-components into a unified interface. It includes the main flame graph, hottest frames bar, navigation controls, and a detailed stack view panel.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profile` | `Profile` | **required** | The parsed pprof profile data to visualize |
| `height` | `number` | `500` | Height of the main flame graph area |
| `primaryColor` | `string` | `'#ff4444'` | Primary color theme |
| `secondaryColor` | `string` | `'#ffcc66'` | Secondary color theme |
| `backgroundColor` | `string` | `'#1e1e1e'` | Background color |
| `textColor` | `string` | `'#ffffff'` | Text color |
| `fontFamily` | `string` | System font stack | Font family |
| `showHottestFrames` | `boolean` | `true` | Show the hottest frames bar |
| `showControls` | `boolean` | `true` | Show navigation controls |
| `showFrameDetails` | `boolean` | `false` | Show frame details in header |
| `showStackDetails` | `boolean` | `true` | Show expandable stack details panel |
| `hottestFramesHeight` | `number` | `10` | Height of the hottest frames bar |

## Usage Examples

### Basic Usage with Profile Loading

```tsx
import React, { useState, useEffect } from 'react'
import { FullFlameGraph } from './FullFlameGraph'
import { fetchProfile, Profile } from '../parser'

function ProfileAnalyzer() {
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
  if (error) return <div>Error loading profile: {error}</div>
  if (!profile) return <div>No profile data</div>

  return (
    <FullFlameGraph 
      profile={profile}
      height={600}
    />
  )
}
```

### Loading from Dynamic URL

```tsx
import React, { useState, useEffect } from 'react'
import { FullFlameGraph } from './FullFlameGraph'
import { fetchProfile, Profile } from '../parser'

function DynamicProfileViewer({ profileId }: { profileId: string }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!profileId) return

    setIsLoading(true)
    fetchProfile(`/api/profiles/${profileId}.pprof`)
      .then(profileData => {
        setProfile(profileData)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Profile loading failed:', error)
        setProfile(null)
        setIsLoading(false)
      })
  }, [profileId])

  if (isLoading) {
    return <div>Loading profile {profileId}...</div>
  }

  if (!profile) {
    return <div>Select a profile to view</div>
  }

  return (
    <FullFlameGraph 
      profile={profile}
      height={600}
    />
  )
}
```

### Customized Appearance

```tsx
<FullFlameGraph
  profile={profileData}
  height={800}
  primaryColor="#3b82f6"
  secondaryColor="#ef4444"
  backgroundColor="#0f172a"
  textColor="#f1f5f9"
  showFrameDetails={true}
  hottestFramesHeight={15}
/>
```

### Minimal Configuration

```tsx
// Just the flame graph with hottest frames, no controls or details
<FullFlameGraph
  profile={profileData}
  showControls={false}
  showFrameDetails={false}
  showStackDetails={false}
/>
```

### With All Features Enabled

```tsx
<FullFlameGraph
  profile={profileData}
  height={700}
  showHottestFrames={true}
  showControls={true}
  showFrameDetails={true}
  showStackDetails={true}
  hottestFramesHeight={12}
/>
```

## Component Structure

The FullFlameGraph consists of several integrated sections:

### 1. Hottest Frames Bar (Optional)
- Visualizes frames sorted by self-time
- Clickable for direct frame selection
- Configurable height

### 2. Header Controls (Optional)
- **Left Side**: Navigation controls (`HottestFramesControls`)
  - First/Previous/Next/Last frame navigation
  - Frame counter display
- **Right Side**: Frame details (`FrameDetails`) 
  - Selected frame information
  - Self-time and total time display

### 3. Main Flame Graph
- Interactive flame graph visualization
- Click to select frames
- Zoom and pan capabilities
- Integrated tooltip on hover

### 4. Stack Details Panel (Optional)
- **Overlay Panel**: Appears on the right side when frame is selected
- **Stack Trace**: Full path from root to selected frame
- **Child Frames**: Direct children of selected frame sorted by value
- **Close Button**: X button to hide the panel

## Key Features

- **Synchronized Selection**: All components stay in sync when frames are selected
- **Multiple Navigation Methods**: 
  - Click frames in flame graph
  - Click hottest frames bar
  - Use navigation controls
- **Responsive Layout**: Adapts to container size
- **Overlay Details**: Non-modal stack details panel
- **Frame Color Consistency**: Colors match across all components

## State Management

The component manages several internal states:

- `selectedFrame`: Currently selected frame data
- `selectedFrameId`: ID of selected frame for flame graph
- `frames`: Processed frame list with self-time calculations
- `stackTrace`: Path from root to selected frame
- `frameChildren`: Direct children of selected frame

## Integration Points

### Frame Selection Flow
1. User interacts with any component (flame graph, hottest frames bar, controls)
2. `handleFrameSelection` processes the selection
3. Updates all related state (frame, ID, stack trace, children)
4. All UI components update to reflect selection

### Data Processing
- Builds complete flame graph structure from profile
- Calculates self-times for hottest frames navigation
- Maintains frame ID consistency across components
- Provides stack trace and children calculation

## Styling Features

- **Consistent Theming**: All sub-components use the same color scheme
- **Responsive Design**: Flexbox layouts adapt to content
- **Professional Appearance**: Consistent spacing, borders, and shadows
- **Overlay Styling**: Semi-transparent background with smooth shadows

## Related Components

- `FlameGraph`: Main visualization component
- `HottestFramesBar`: Frame ranking visualization
- `HottestFramesControls`: Navigation interface
- `FrameDetails`: Compact frame information
- `StackDetails`: Detailed stack and children view

## Performance Considerations

- **Memoized Calculations**: Uses `useMemo` for expensive frame processing
- **Efficient Updates**: Only re-processes data when profile changes
- **WebGL Rendering**: Leverages hardware acceleration for smooth interactions