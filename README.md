# react-pprof

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
- 💻 **Command Line Interface** for generating static HTML flamegraphs

## Installation

```bash
npm install react-pprof
```

## Quick Start

```tsx
import React, { useState, useEffect } from 'react'
import { FullFlameGraph, fetchProfile } from 'react-pprof'

function App() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProfile('/path/to/profile.pprof')
      .then(setProfile)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading profile...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!profile) return <div>No profile data</div>

  return (
    <FullFlameGraph
      profile={profile}
      height={600}
      showHottestFrames={true}
      showControls={true}
      showStackDetails={true}
    />
  )
}
```

## Server-Side Embedding API

For programmatic generation of embeddable flamegraphs (e.g., for middleware or dynamic HTML generation), use the embedding API that supports rendering multiple graphs efficiently:

```typescript
import { generateEmbeddableFlameGraph, getFlamegraphBundle } from 'react-pprof'
import fs from 'fs'

// Get the bundle once (it's cached internally)
const { bundle } = await getFlamegraphBundle()

// Generate embeddable flamegraphs for multiple profiles
const cpuProfile = fs.readFileSync('cpu-profile.pb')
const heapProfile = fs.readFileSync('heap-profile.pb')

const cpuGraph = await generateEmbeddableFlameGraph(cpuProfile, {
  title: 'CPU Profile',
  filename: 'cpu-profile.pb',
  primaryColor: '#ff4444',
  secondaryColor: '#ffcc66',
  height: 500
})

const heapGraph = await generateEmbeddableFlameGraph(heapProfile, {
  title: 'Heap Profile',
  filename: 'heap-profile.pb',
  primaryColor: '#ff4444',
  secondaryColor: '#ffcc66',
  height: 500
})

// Use in your HTML response
const fullPage = `
<!DOCTYPE html>
<html>
<head><title>Profiles</title></head>
<body>
  <h2>CPU Profile</h2>
  ${cpuGraph.html}

  <h2>Heap Profile</h2>
  ${heapGraph.html}

  <!-- Include bundle once -->
  <script>${bundle}</script>

  <!-- Render each graph -->
  <script>${cpuGraph.script}</script>
  <script>${heapGraph.script}</script>
</body>
</html>
`
```

### API

**`getFlamegraphBundle()`**

Returns the reusable React-pprof bundle code (cached after first call). Include this once in your page before rendering any graphs.

```typescript
Promise<{ bundle: string }>
```

**`generateEmbeddableFlameGraph(profileBuffer, options)`**

Generates embeddable HTML and JavaScript for a single flamegraph. Can be called multiple times for different graphs on the same page.

```typescript
interface EmbeddableFlameGraphOptions {
  title?: string           // Display title (default: 'Profile')
  filename?: string        // Original filename (default: 'profile.pb')
  primaryColor?: string    // Primary color (default: '#ff4444')
  secondaryColor?: string  // Secondary color (default: '#ffcc66')
  height?: number         // Container height in pixels (default: 500)
}

interface EmbeddableFlameGraphResult {
  html: string    // HTML container div with unique ID
  script: string  // JavaScript code to render into the container
}
```

### Key Features

- **Reusable bundle**: The React-pprof bundle is loaded once and cached, improving performance when rendering multiple graphs
- **No global conflicts**: Each graph uses unique IDs and local variables, so multiple graphs can coexist without conflicts
- **Self-contained**: Generated HTML includes all necessary styling and structure
- **Efficient**: Profile data is embedded efficiently and decoded on the client side

## Command Line Interface (CLI)

This package includes a CLI utility to generate static HTML flamegraphs from pprof files without requiring a running server.

### Installation

Install the CLI globally or use via npx:

```bash
# Install globally
npm install -g react-pprof

# Or use with npx (no installation required)
npx react-pprof profile.pb
```

### CLI Usage

```bash
# Basic usage
react-pprof profile.pb

# Custom output file
react-pprof -o flamegraph.html profile.pb

# Help
react-pprof --help
```

### Building CLI Templates

Before using the CLI, build the static templates:

```bash
npm run build:cli
```

This generates optimized HTML templates and JavaScript bundles in the `cli-build/` directory.

### Supported Profile Formats

The CLI automatically handles both:
- **Gzipped profiles**: Common with @datadog/pprof output (auto-detected)
- **Uncompressed profiles**: Raw pprof binary data

### Example Workflow

```bash
# 1. Generate a profile (see examples below)
curl http://localhost:3000/profile > profile.pb

# 2. Build CLI templates (one-time setup)
npm run build:cli

# 3. Generate static HTML flamegraph
react-pprof profile.pb

# 4. Open in browser
open profile.html
```

The generated HTML includes:
- Complete React flamegraph visualization
- Interactive tooltips and stack details
- WebGL-optimized rendering
- All profile data embedded (no server required)

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

### Example Servers

This repository includes example servers to demonstrate profile generation:

#### Real Profiling Server (example-server.js)

```bash
# Start the real profiling server
node example-server.js

# Generate some load to profile
curl http://localhost:3002/load
curl http://localhost:3002/load
curl http://localhost:3002/load

# Download gzipped profile (automatically handled by CLI)
curl http://localhost:3002/profile > real-profile.pb

# Generate flamegraph
react-pprof real-profile.pb
```

#### Synthetic Profile Server (simple-server.js)

For testing and demonstration, use the synthetic server that generates compatible pprof data:

```bash
# Start the synthetic server
node simple-server.js

# Download synthetic profile
curl http://localhost:3001/profile > synthetic-profile.pb

# Generate flamegraph
react-pprof synthetic-profile.pb
```

The synthetic server creates realistic function hierarchies and CPU distributions for demonstration purposes.

## Components

This package provides several React components for visualizing pprof profiles. Click on each component name for detailed documentation, props, and usage examples:

### Core Components

- **[FullFlameGraph](src/components/FullFlameGraph.md)** - Complete flame graph with navigation controls, hottest frames bar, and stack details panel
- **[FlameGraph](src/components/FlameGraph.md)** - Core WebGL-powered flame graph visualization component
- **[StackDetails](src/components/StackDetails.md)** - Detailed panel showing stack trace and child frames

### Navigation Components

- **[HottestFramesBar](src/components/HottestFramesBar.md)** - Horizontal bar showing frames sorted by self-time
- **[HottestFramesControls](src/components/HottestFramesControls.md)** - Navigation controls for stepping through hottest frames
- **[FrameDetails](src/components/FrameDetails.md)** - Compact frame information display

### Utility Components

- **[FlameGraphTooltip](src/components/FlameGraphTooltip.md)** - Tooltip component for displaying frame information on hover

### Getting Started

For most use cases, start with **FullFlameGraph** as it provides a complete profiling interface out of the box. Use the individual components when you need more control over the layout and functionality.

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

Both the `<FlameGraph />` and `<FullFlameGraph />` components accept several color properties to configure their appearance:

- `backgroundColor` - Background color of the flame graph
- `textColor` - Color of text labels and UI elements
- `primaryColor` - Color for root nodes or nodes near 100% of their parent's weight
- `secondaryColor` - Color for nodes near 0% of their parent's weight

The flame graph uses a gradient of colors between the primary and secondary colors depending on each frame's weight ratio compared to its parent.

```tsx
// Traditional Red/Orange theme
<FullFlameGraph
  profile={profile}
  primaryColor="#ff4444"
  secondaryColor="#ffcc66"
  backgroundColor="#1e1e1e"
  textColor="#ffffff"
/>

// Green theme
<FullFlameGraph
  profile={profile}
  primaryColor="#2ecc71"
  secondaryColor="#27ae60"
  backgroundColor="#1e1e1e"
  textColor="#ffffff"
/>

// Blue theme
<FullFlameGraph
  profile={profile}
  primaryColor="#2563eb"
  secondaryColor="#7dd3fc"
  backgroundColor="#2c3e50"
  textColor="#ffffff"
/>
```

## Interactions

### Mouse Controls

- **Click Frame**: Zoom in to selected frame
- **Click Empty Space**: Zoom out to root view
- **Hover Frame**: Show tooltip with frame details
- **Mouse Move**: Tooltip follows cursor
- **Mouse Leave**: Hide tooltip

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
