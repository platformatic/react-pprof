# HottestFramesControls

A navigation control panel that provides first/previous/next/last navigation through frames sorted by self-time, with a status display showing current position.

## Purpose

The HottestFramesControls component offers button-based navigation through the hottest frames in a profile, complementing the visual HottestFramesBar with precise sequential navigation controls.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profile` | `Profile` | **required** | The parsed pprof profile data |
| `selectedFrame` | `FrameData \| null` | - | Currently selected frame |
| `onFrameSelect` | `function` | - | Callback when a frame is selected |
| `textColor` | `string` | `'#ffffff'` | Text color for buttons and status |
| `fontSize` | `string` | `'14px'` | Font size for text elements |
| `fontFamily` | `string` | System font stack | Font family for text rendering |

## Usage Examples

### Basic Usage with Profile Loading

```tsx
import React, { useState, useEffect } from 'react'
import { HottestFramesControls } from './HottestFramesControls'
import { fetchProfile, Profile } from '../parser'
import { FrameData } from '../renderer'

function NavigationPanel() {
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
    <HottestFramesControls
      profile={profile}
      selectedFrame={selectedFrame}
      onFrameSelect={setSelectedFrame}
    />
  )
}
```

### Loading with Multiple Profiles

```tsx
import React, { useState, useEffect } from 'react'
import { HottestFramesControls } from './HottestFramesControls'
import { fetchProfile, Profile } from '../parser'
import { FrameData } from '../renderer'

function MultiProfileNavigator({ profileUrls }: { profileUrls: string[] }) {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [activeProfileIndex, setActiveProfileIndex] = useState(0)
  const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null)

  useEffect(() => {
    const loadProfiles = async () => {
      const loadedProfiles = await Promise.all(
        profileUrls.map(url => fetchProfile(url))
      )
      setProfiles(loadedProfiles)
    }

    loadProfiles().catch(console.error)
  }, [profileUrls])

  const activeProfile = profiles[activeProfileIndex]

  return (
    <div>
      <select 
        value={activeProfileIndex} 
        onChange={e => setActiveProfileIndex(Number(e.target.value))}
      >
        {profileUrls.map((url, index) => (
          <option key={url} value={index}>Profile {index + 1}</option>
        ))}
      </select>
      
      {activeProfile && (
        <HottestFramesControls
          profile={activeProfile}
          selectedFrame={selectedFrame}
          onFrameSelect={setSelectedFrame}
        />
      )}
    </div>
  )
}
```

### With Custom Styling

```tsx
<HottestFramesControls
  profile={profile}
  selectedFrame={selectedFrame}
  onFrameSelect={handleFrameSelect}
  textColor="#e2e8f0"
  fontSize="12px"
  fontFamily="Consolas, monospace"
/>
```

### Integrated with Other Components

```tsx
function ProfileInterface({ profile }) {
  const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null)

  return (
    <div>
      <HottestFramesBar 
        profile={profile}
        selectedFrame={selectedFrame}
        onFrameSelect={setSelectedFrame}
      />
      <HottestFramesControls
        profile={profile}
        selectedFrame={selectedFrame}
        onFrameSelect={setSelectedFrame}
      />
      <FlameGraph
        profile={profile}
        selectedFrameId={selectedFrame?.id}
        onFrameClick={(frame) => setSelectedFrame(frame)}
      />
    </div>
  )
}
```

## Navigation Controls

The component provides four navigation buttons:

### First Frame (⟨⟨)
- Jumps to the frame with the highest self-time
- Disabled when no frames available or already at first frame

### Previous Frame (⟨)  
- Moves to the previous frame in self-time ranking
- When no frame selected, starts from first frame
- Disabled when at first frame or no frames available

### Next Frame (⟩)
- Moves to the next frame in self-time ranking  
- When no frame selected, starts from first frame
- Disabled when at last frame or no frames available

### Last Frame (⟩⟩)
- Jumps to the frame with the lowest self-time
- Disabled when no frames available or already at last frame

## Status Display

The center status shows current navigation state:

- **With Selection**: `"#3 hottest frame, of 157"` - Shows current rank
- **No Selection**: `"157 frames (none selected)"` - Shows total count
- **No Frames**: `"No frames available"` - Empty state message

## Button States

Buttons have three visual states:

### Enabled
- Full opacity
- Pointer cursor
- Border and text in `textColor`
- Hover effects available

### Disabled  
- 50% opacity
- Not-allowed cursor
- Non-interactive
- Grayed out appearance

### Styling
```tsx
const buttonStyle = {
  background: 'transparent',
  border: `1px solid ${textColor}`,
  color: textColor,
  padding: '4px 8px',
  borderRadius: '2px',
  // ...conditional styles based on disabled state
}
```

## Frame Processing

The component processes profile data to:

1. **Build Flame Graph**: Reconstructs call tree from pprof samples
2. **Calculate Self-Times**: Determines actual time spent per frame
3. **Sort by Performance**: Orders frames by self-time (descending)
4. **Handle Zero Self-Time**: Includes frames with zero self-time, sorted by total value

## Synchronization Logic

The controls maintain synchronization with external frame selection:

- **External Selection**: Updates internal index when `selectedFrame` changes
- **No Selection**: Resets to first frame (index 0) when selection cleared
- **Index Tracking**: Maintains current position for consistent navigation

## Smart Navigation

The component implements intelligent navigation:

### From No Selection
- **Previous/Next**: Both start from first frame instead of doing nothing
- **Provides Entry Point**: Makes navigation accessible from unselected state

### Boundary Handling
- **First/Previous**: Disabled at beginning of list  
- **Next/Last**: Disabled at end of list
- **Visual Feedback**: Clear indication of navigation limits

## Performance Features

- **Memoized Processing**: Frame calculation cached with `useMemo`
- **Efficient Sorting**: Consistent with HottestFramesBar algorithm
- **State Synchronization**: Updates only when necessary
- **Callback Optimization**: Event handlers prevent unnecessary re-renders

## Accessibility

- **Button Labels**: Semantic HTML buttons with titles
- **Keyboard Navigation**: Standard button keyboard interaction
- **Status Updates**: Screen reader friendly status text
- **Visual Indicators**: Clear disabled/enabled states

## Related Components

- `HottestFramesBar`: Visual counterpart showing the same sorted frames
- `FullFlameGraph`: Integrates both navigation components
- `FrameDetails`: Often used alongside to display selected frame info

## Integration Pattern

Typical usage combines visual and control navigation:

```tsx
<div className="navigation-section">
  <HottestFramesControls {...props} />
  <HottestFramesBar {...props} />
</div>
```

This provides both precise button control and visual overview of the frame distribution.