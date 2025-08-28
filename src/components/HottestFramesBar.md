# HottestFramesBar

A horizontal bar visualization that displays frames sorted by self-time, providing an alternative navigation method for flame graph analysis.

## Purpose

The HottestFramesBar component renders frames as colored segments in a horizontal bar, ordered by self-time (descending). It provides quick visual identification of performance hotspots and enables direct frame selection through clicking.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profile` | `Profile` | **required** | The parsed pprof profile data |
| `width` | `number \| string` | `'100%'` | Width of the bar |
| `height` | `number` | `10` | Height of the bar in pixels |
| `primaryColor` | `string` | `'#ff4444'` | Starting color for the gradient |
| `secondaryColor` | `string` | `'#ffcc66'` | Ending color for the gradient |
| `backgroundColor` | `string` | `'#1e1e1e'` | Background color |
| `textColor` | `string` | `'#ffffff'` | Text color for tooltips and indicators |
| `selectedFrame` | `FrameData \| null` | - | Currently selected frame |
| `onFrameSelect` | `function` | - | Callback when a frame is selected |
| `onNavigationChange` | `function` | - | Callback when sorted frames change |

## Usage Examples

### Basic Usage with Profile Loading

```tsx
import React, { useState, useEffect } from 'react'
import { HottestFramesBar } from './HottestFramesBar'
import { fetchProfile, Profile } from '../parser'
import { FrameData } from '../renderer'

function ProfileViewer() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfile('/path/to/profile.pprof')
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading profile...</div>
  if (!profile) return <div>No profile data</div>

  return (
    <HottestFramesBar
      profile={profile}
      selectedFrame={selectedFrame}
      onFrameSelect={setSelectedFrame}
    />
  )
}
```

### Loading from API with Error Handling

```tsx
import React, { useState, useEffect } from 'react'
import { HottestFramesBar } from './HottestFramesBar'
import { fetchProfile, Profile } from '../parser'
import { FrameData } from '../renderer'

function APIProfileViewer({ apiEndpoint }: { apiEndpoint: string }) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await fetchProfile(apiEndpoint)
        setProfile(profileData)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile')
        setProfile(null)
      }
    }

    loadProfile()
  }, [apiEndpoint])

  if (error) return <div>Error: {error}</div>
  if (!profile) return <div>Loading...</div>

  return (
    <HottestFramesBar
      profile={profile}
      selectedFrame={selectedFrame}
      onFrameSelect={setSelectedFrame}
    />
  )
}
```

### With Custom Styling

```tsx
<HottestFramesBar
  profile={profile}
  width={800}
  height={15}
  primaryColor="#3b82f6"
  secondaryColor="#10b981"
  backgroundColor="#1f2937"
  selectedFrame={selectedFrame}
  onFrameSelect={handleFrameSelect}
/>
```

### With Navigation Tracking

```tsx
import { FrameWithSelfTime } from './HottestFramesBar'

function AdvancedProfiler({ profile }) {
  const [frames, setFrames] = useState<FrameWithSelfTime[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <HottestFramesBar
      profile={profile}
      onFrameSelect={setSelectedFrame}
      onNavigationChange={(index, sortedFrames) => {
        setCurrentIndex(index)
        setFrames(sortedFrames)
      }}
    />
  )
}
```

## Key Features

### Visual Representation
- **Proportional Widths**: Frame segments sized by self-time
- **Color Gradient**: Smooth transition from primary to secondary color
- **Selection Highlight**: Selected frames show full opacity
- **Hover Effects**: Visual feedback on mouse interaction

### Interaction
- **Click Selection**: Click segments to select frames
- **Toggle Selection**: Click selected frame again to deselect
- **Hover Preview**: Shows frame information via tooltip
- **Mouse Tracking**: Real-time hover state updates

### Data Processing
- **Self-Time Calculation**: Computes actual time spent in each frame
- **Smart Sorting**: Orders by self-time, then total time as fallback
- **Minimal Width Allocation**: Frames with zero self-time get minimal visible width
- **Frame ID Consistency**: Matches FlameGraph component frame IDs

## Frame Width Algorithm

The component uses a sophisticated width allocation system:

1. **Active Frames** (with self-time > 0): Get proportional width based on self-time
2. **Inactive Frames** (with self-time = 0): Get minimal fixed width for visibility
3. **Space Distribution**: 
   - Up to 80% for active frames (proportional)
   - Up to 20% for inactive frames (equal distribution)
   - Minimum 0.2% width per inactive frame

## Color System

Colors are interpolated across the bar:
- **Leftmost** (hottest): Primary color
- **Rightmost** (coolest): Secondary color  
- **Interpolation**: Linear RGB interpolation based on frame position
- **Opacity States**: Selected (100%), Hovered (90%), Normal (70%)

## Data Export

The component provides processed frame data through `onNavigationChange`:

```tsx
interface FrameWithSelfTime {
  frame: FrameData      // Frame information
  selfTime: number      // Calculated self-time
  nodeId: string       // Unique frame identifier
}
```

## Tooltip Integration

Segments display rich tooltips on hover showing:
- Frame name
- Self-time value  
- Total time value
- Formatted as: `"FunctionName (self: 42.50, total: 156.75)"`

## Selection States

The bar indicates different selection states:

- **Selected Frame**: Full opacity, matches external selection
- **Current Navigation**: Border highlight when no external selection
- **Hovered Frame**: Increased opacity and cursor feedback
- **Normal Frames**: Base opacity for non-interactive state

## Performance Optimizations

- **Memoized Processing**: Frame calculations cached with `useMemo`
- **Efficient Lookups**: Uses Maps for O(1) frame access
- **Callback Optimization**: Event handlers wrapped with `useCallback`
- **Minimal Re-renders**: State updates only when necessary

## Hook Export

The component also exports a custom hook for navigation:

```tsx
const { selectedIndex, handleFirst, handlePrev, handleNext, handleLast } = 
  useHottestFramesNavigation(sortedFrames, onFrameSelect)
```

## Related Components

- `FullFlameGraph`: Integrates this component for complete navigation
- `HottestFramesControls`: Provides button-based navigation for the same data
- `FlameGraph`: Main visualization that this component complements

## Technical Details

- **Profile Processing**: Reconstructs flame graph structure from pprof data
- **Self-Time Logic**: `node.value - sum(children.value)` with safeguards
- **Frame Mapping**: Maintains consistent IDs across components
- **Event Handling**: Mouse position tracking for precise segment detection