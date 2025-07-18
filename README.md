# @platformatic/react-pprof

A React component for visualizing pprof profiles using WebGL.

[![CI](https://github.com/platformatic/react-pprof/actions/workflows/ci.yml/badge.svg)](https://github.com/platformatic/react-pprof/actions/workflows/ci.yml)
[![Lint](https://github.com/platformatic/react-pprof/actions/workflows/lint.yml/badge.svg)](https://github.com/platformatic/react-pprof/actions/workflows/lint.yml)

## Features

- 🚀 **WebGL-accelerated rendering** for smooth performance with large datasets
- 🎨 **Customizable theming** with multiple color schemes
- 🔍 **Interactive zoom and pan** with smooth animations
- 📊 **Stack trace visualization** with complete call hierarchy
- 🎯 **Frame details panel** showing children and parent relationships
- 📱 **Responsive design** that works on all screen sizes
- 🔧 **TypeScript support** with full type definitions
- 🧪 **Comprehensive testing** with visual regression tests
- ⚡ **High performance** optimized for large profile datasets

## Installation

```bash
npm install @platformatic/react-pprof
```

## Quick Start

```tsx
import { FlameGraph, StackDetails, fetchProfile } from '@platformatic/react-pprof'
import { useState, useEffect } from 'react'

function App() {
  const [profile, setProfile] = useState(null)
  const [selectedFrame, setSelectedFrame] = useState(null)
  const [stackTrace, setStackTrace] = useState([])
  const [children, setChildren] = useState([])

  useEffect(() => {
    // Load the pprof profile
    fetchProfile('/path/to/profile.pprof')
      .then(setProfile)
      .catch(console.error)
  }, [])

  if (!profile) {
    return <div>Loading profile...</div>
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1 }}>
        <FlameGraph
          profile={profile}
          onFrameClick={(frame, stack, frameChildren) => {
            setSelectedFrame(frame)
            setStackTrace(stack)
            setChildren(frameChildren)
          }}
        />
      </div>
      <div style={{ width: '400px' }}>
        <StackDetails
          selectedFrame={selectedFrame}
          stackTrace={stackTrace}
          children={children}
        />
      </div>
    </div>
  )
}
```

## Capturing pprof Profiles

### Using @datadog/pprof

To capture CPU profiles in Node.js applications, you can use the `@datadog/pprof` package:

```bash
npm install @datadog/pprof
```

**Requirements**: Node.js 18 or greater

#### Basic CPU Profile Capture

```javascript
const pprof = require('@datadog/pprof')
const fs = require('fs')

// Collect a 10-second wall time profile
const profile = await pprof.time.profile({
  durationMillis: 10000    // Profile for 10 seconds
})

// Or...

pprof.time.start({
  durationMillis: 10000
})

// Do something ...

const profile = pprof.time.stop()

// Encode profile data to buffer
const buf = profile.encode()

// Save profile data to disk
fs.writeFile('cpu-profile.pprof', buf, (err) => {
  if (err) throw err;
  console.log('Profile saved to cpu-profile.pprof')
})
```

## Components

### FlameGraph

The main component for rendering interactive flame graphs using WebGL.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `profile` | `Profile` | **required** | The pprof profile data object |
| `width` | `number \| string` | `'100%'` | Width of the component |
| `height` | `number \| string` | `undefined` | Height of the component (auto-calculated if not specified) |
| `primaryColor` | `string` | `'#ff4444'` | Primary color for high-weight frames |
| `secondaryColor` | `string` | `'#ffcc66'` | Secondary color for low-weight frames |
| `backgroundColor` | `string` | `'#1e1e1e'` | Background color of the canvas |
| `textColor` | `string` | `'#ffffff'` | Color of frame labels |
| `fontFamily` | `string` | `'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'` | Font family for labels |
| `shadowOpacity` | `number` | `0.3` | Opacity of frame shadows |
| `selectedOpacity` | `number` | `1.0` | Opacity of selected frames |
| `hoverOpacity` | `number` | `0.9` | Opacity of hovered frames |
| `unselectedOpacity` | `number` | `0.75` | Opacity of unselected frames |
| `framePadding` | `number` | `5` | Padding around frame content (pixels) |
| `zoomOnScroll` | `boolean` | `false` | Enable zooming with mouse wheel |
| `scrollZoomSpeed` | `number` | `0.05` | Speed of scroll zoom (0.01 - 0.1) |
| `scrollZoomInverted` | `boolean` | `false` | Invert scroll zoom direction |
| `onFrameClick` | `function` | `undefined` | Callback when a frame is clicked |
| `onZoomChange` | `function` | `undefined` | Callback when zoom level changes |

#### onFrameClick Callback

```tsx
onFrameClick: (frame: FrameData, stackTrace: FlameNode[], children: FlameNode[]) => void
```

**Parameters:**
- `frame`: Details about the clicked frame
- `stackTrace`: Complete call stack from root to selected frame
- `children`: Array of all child frames

#### onZoomChange Callback

```tsx
onZoomChange: (zoomLevel: number) => void
```

**Parameters:**
- `zoomLevel`: Current zoom level (1.0 = no zoom)

#### Usage Examples

**Basic Usage:**
```tsx
const profile = await fetchProfile('/profile.pprof')
<FlameGraph profile={profile} />
```

**Custom Colors:**
```tsx
<FlameGraph
  profile={profile}
  primaryColor="#3498db"
  secondaryColor="#87ceeb"
  backgroundColor="#2c3e50"
/>
```

**With Interaction Handling:**
```tsx
<FlameGraph
  profile={profile}
  onFrameClick={(frame, stack, children) => {
    console.log('Selected:', frame.name)
    console.log('Stack depth:', stack.length)
    console.log('Children count:', children.length)
  }}
  onZoomChange={(level) => {
    console.log('Zoom level:', level)
  }}
/>
```

**Custom Opacity Settings:**
```tsx
<FlameGraph
  profile={profile}
  selectedOpacity={1.0}
  hoverOpacity={0.8}
  unselectedOpacity={0.5}
/>
```

**Enable Scroll Zooming:**
```tsx
<FlameGraph
  profile={profile}
  zoomOnScroll={true}
  scrollZoomSpeed={0.1}
  scrollZoomInverted={false}
/>
```

### StackDetails

A component that displays detailed information about the selected frame, including the complete stack trace and child frames.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedFrame` | `FrameData \| null` | **required** | Currently selected frame data |
| `stackTrace` | `FlameNode[]` | `[]` | Complete stack trace from root to selected frame |
| `children` | `FlameNode[]` | `[]` | Array of child frames |
| `width` | `number \| string` | `'100%'` | Width of the component |
| `height` | `number \| string` | `'auto'` | Height of the component |
| `backgroundColor` | `string` | `'#1e1e1e'` | Background color |
| `textColor` | `string` | `'#ffffff'` | Primary text color |
| `primaryColor` | `string` | `'#ff4444'` | Accent color for headers and highlights |
| `secondaryColor` | `string` | `'#ffcc66'` | Secondary accent color |

#### Usage Examples

**Basic Usage:**
```tsx
<StackDetails
  selectedFrame={selectedFrame}
  stackTrace={stackTrace}
  children={children}
/>
```

**Custom Styling:**
```tsx
<StackDetails
  selectedFrame={selectedFrame}
  stackTrace={stackTrace}
  children={children}
  backgroundColor="#f8f9fa"
  textColor="#212529"
  primaryColor="#007bff"
  secondaryColor="#6c757d"
/>
```

**Fixed Height with Scrolling:**
```tsx
<StackDetails
  selectedFrame={selectedFrame}
  stackTrace={stackTrace}
  children={children}
  height="600px"
/>
```

## Data Types

### FrameData

Represents a single frame in the flame graph.

```tsx
interface FrameData {
  id: string;           // Unique identifier for the frame
  name: string;         // Function name
  value: number;        // Frame weight/value
  depth: number;        // Stack depth (0 = root)
  x: number;           // Normalized x position (0-1)
  width: number;       // Normalized width (0-1)
  functionName: string; // Function name (same as name)
  fileName?: string;    // Source file name
  lineNumber?: number;  // Source line number
}
```

### FlameNode

Represents a node in the flame graph tree structure.

```tsx
interface FlameNode {
  id: string;           // Unique identifier
  name: string;         // Function name
  value: number;        // Frame weight/value
  children: FlameNode[]; // Child frames
  parent?: FlameNode;   // Parent frame
  x: number;           // Normalized x position (0-1)
  width: number;       // Normalized width (0-1)
  depth: number;       // Stack depth (0 = root)
  fileName?: string;    // Source file name
  lineNumber?: number;  // Source line number
}
```

## Theming

The `<FlameGraph />` component accepts several colors to configure its appearance:

- `backgroundColor` is obvious
- `textColor` is also obvious
- `primaryColor` for root node or nodes near 100% of their parent's weight
- `secondaryColor` for nodes near 0% of their parent's weight

The graph will use a gradient of colors between the primary and secondary depending
on their weight ratio compared to their parent.

```tsx
// Traditional Red/Orange
<FlameGraph
  primaryColor="#ff4444"
  secondaryColor="#ffcc66"
  backgroundColor="#1e1e1e"
/>

// Greens
<FlameGraph
  primaryColor="#2ecc71"
  secondaryColor="#27ae60"
  backgroundColor="#1e1e1e"
/>

// Blues
<FlameGraph
  primaryColor="#2563eb"
  secondaryColor="#7dd3fc"
  backgroundColor="#2c3e50"
/>
```

## Interactions

### Mouse Controls

- **Click Frame**: Zoom in to selected frame
- **Click Empty Space**: Zoom out to root view
- **Hover Frame**: Show tooltip with frame details
- **Mouse Move**: Tooltip follows cursor
- **Mouse Leave**: Hide tooltip

### Keyboard Controls

- **Tab**: Navigate through interactive elements
- **Enter**: Activate focused element
- **Escape**: Reset to default state

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run specific test suites
npm run test:flamegraph
npm run test:stack-details
npm run test:integration

# Update visual snapshots
npm run test:update-snapshots
```

### Test Coverage

- **Unit Tests**: Component logic and data processing
- **Integration Tests**: Component interaction and communication
- **Visual Regression Tests**: Pixel-perfect UI consistency
- **Performance Tests**: WebGL performance benchmarks
- **Accessibility Tests**: Keyboard navigation and ARIA support

## Development

### Setup

```bash
# Clone repository
git clone https://github.com/platformatic/react-pprof.git
cd react-pprof

# Install dependencies
npm install

# Start development server
npm run storybook
```

## Examples

### Complete Integration Example

```tsx
import { FlameGraph, StackDetails, fetchProfile } from '@platformatic/react-pprof'
import { useState, useEffect } from 'react'

function ProfileViewer() {
  const [profile, setProfile] = useState(null)
  const [selectedFrame, setSelectedFrame] = useState(null)
  const [stackTrace, setStackTrace] = useState([])
  const [children, setChildren] = useState([])
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProfile('/api/profile/cpu')
      .then(setProfile)
      .catch(setError)
      .finally(() => setLoading(false))
  }, []);

  if (loading) return <div>Loading profile...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!profile) return <div>No profile data</div>

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Main flame graph */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>CPU Profile</h1>
        <FlameGraph
          profile={profile}
          width="100%"
          height="600px"
          onFrameClick={(frame, stack, frameChildren) => {
            setSelectedFrame(frame)
            setStackTrace(stack)
            setChildren(frameChildren)
          }}
          onZoomChange={setZoomLevel}
          zoomOnScroll={true}
        />
        <p>Zoom Level: {zoomLevel.toFixed(2)}x</p>
      </div>

      {/* Details panel */}
      <div style={{
        width: '400px',
        borderLeft: '1px solid #ccc',
        padding: '20px'
      }}>
        <StackDetails
          selectedFrame={selectedFrame}
          stackTrace={stackTrace}
          children={children}
        />
      </div>
    </div>
  )
}
```

### Responsive Layout Example

```tsx
import { FlameGraph, StackDetails, fetchProfile } from '@platformatic/react-pprof'
import { useState, useEffect } from 'react'

function ResponsiveProfileViewer() {
  const [profile, setProfile] = useState(null)
  const [selectedFrame, setSelectedFrame] = useState(null)
  const [stackTrace, setStackTrace] = useState([])
  const [children, setChildren] = useState([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchProfile('/profile.pprof').then(setProfile)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!profile) return <div>Loading...</div>

  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      height: '100vh'
    }}>
      <div style={{ flex: 1 }}>
        <FlameGraph
          profile={profile}
          width="100%"
          height={isMobile ? '50vh' : '100vh'}
          onFrameClick={(frame, stack, frameChildren) => {
            setSelectedFrame(frame)
            setStackTrace(stack)
            setChildren(frameChildren)
          }}
        />
      </div>

      <div style={{
        width: isMobile ? '100%' : '400px',
        height: isMobile ? '50vh' : '100vh',
        overflow: 'auto'
      }}>
        <StackDetails
          selectedFrame={selectedFrame}
          stackTrace={stackTrace}
          children={children}
        />
      </div>
    </div>
  );
}
```
