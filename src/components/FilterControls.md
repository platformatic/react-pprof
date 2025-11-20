# FilterControls

A simple toggle control that filters the flame graph to show only application code by hiding Node.js internals and node_modules dependencies.

## Purpose

The FilterControls component provides a "Show App Code Only" checkbox that helps users focus on application-specific code by filtering out framework and dependency noise from the flame graph visualization.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showAppCodeOnly` | `boolean` | **required** | Whether the filter is currently enabled |
| `onToggle` | `function` | **required** | Callback when the checkbox is toggled |
| `textColor` | `string` | `'#ffffff'` | Text color for the label and checkbox accent |
| `fontSize` | `string` | `'14px'` | Font size for the label text |
| `fontFamily` | `string` | System font stack | Font family for text rendering |

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react'
import { FilterControls } from './FilterControls'

function FlameGraphViewer() {
  const [showAppCodeOnly, setShowAppCodeOnly] = useState(false)

  return (
    <div>
      <FilterControls
        showAppCodeOnly={showAppCodeOnly}
        onToggle={setShowAppCodeOnly}
      />
      <FlameGraph
        profile={profile}
        showAppCodeOnly={showAppCodeOnly}
      />
    </div>
  )
}
```

### Integrated with Full Flame Graph

```tsx
import React, { useState } from 'react'
import { FilterControls } from './FilterControls'
import { FullFlameGraph } from './FullFlameGraph'

function ProfileAnalyzer({ profile }) {
  const [showAppCodeOnly, setShowAppCodeOnly] = useState(false)

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <FilterControls
          showAppCodeOnly={showAppCodeOnly}
          onToggle={setShowAppCodeOnly}
          textColor="#ffffff"
        />
        <span style={{ color: '#888' }}>
          {showAppCodeOnly ? 'Showing application code only' : 'Showing all code'}
        </span>
      </div>
      <FullFlameGraph
        profile={profile}
        showAppCodeOnly={showAppCodeOnly}
      />
    </div>
  )
}
```

### With Custom Styling

```tsx
<FilterControls
  showAppCodeOnly={showAppCodeOnly}
  onToggle={setShowAppCodeOnly}
  textColor="#00ff00"
  fontSize="16px"
  fontFamily="Consolas, monospace"
/>
```

### With Visual Feedback

```tsx
function FilteredProfileView({ profile }) {
  const [showAppCodeOnly, setShowAppCodeOnly] = useState(false)
  const [frameCount, setFrameCount] = useState({ total: 0, visible: 0 })

  return (
    <div>
      <FilterControls
        showAppCodeOnly={showAppCodeOnly}
        onToggle={setShowAppCodeOnly}
      />
      <div style={{ color: '#888', fontSize: '12px' }}>
        {showAppCodeOnly
          ? `Showing ${frameCount.visible} of ${frameCount.total} frames`
          : `Showing all ${frameCount.total} frames`
        }
      </div>
      <FlameGraph
        profile={profile}
        showAppCodeOnly={showAppCodeOnly}
        onFrameCountChange={setFrameCount}
      />
    </div>
  )
}
```

## Filter Behavior

When "Show App Code Only" is enabled, the flame graph hides:

### Node.js Internal Frames
- Any frame with `fileName` starting with `node:internal/`
- Examples:
  - `node:internal/modules/cjs/loader`
  - `node:internal/process/task_queues`
  - `node:internal/timers`

### Node Modules Dependencies
- Any frame with `fileName` containing `/node_modules/`
- Examples:
  - `/app/node_modules/express/lib/router.js`
  - `/app/node_modules/fastify/lib/context.js`
  - `/usr/local/lib/node_modules/pm2/lib/API.js`

### Frames Kept Visible
- Application code (files outside node_modules and Node.js internals)
- Frames without a `fileName` (anonymous functions)
- The root "all" frame (never filtered)

## Collapsed Frames

When frames are filtered out, their values are collapsed into their parent frames:

```
Before filtering:
  main (100ms)
    ├─ express.router (50ms) [node_modules - FILTERED]
    │   └─ myHandler (30ms)
    └─ myOtherFunc (50ms)

After filtering:
  main (100ms)
    ├─ myHandler (30ms)  [promoted to main's child]
    └─ myOtherFunc (50ms)
```

This ensures:
- Total time values remain accurate
- Application code is still visible even when nested inside dependencies
- The flame graph layout is recalculated correctly

## Checkbox States

The checkbox has two states:

### Unchecked (Default)
- Shows all frames including Node.js internals and dependencies
- Provides complete view of the profile
- Useful for debugging framework issues

### Checked
- Shows only application code
- Filters out noise from dependencies
- Helps identify application-specific performance bottlenecks

## Styling

The component uses a minimal, clean design:

```tsx
const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  padding: '8px 0',
}

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  cursor: 'pointer',
  userSelect: 'none',
}

const checkboxStyle = {
  width: '16px',
  height: '16px',
  cursor: 'pointer',
  accentColor: textColor,  // Matches theme
}
```

## Accessibility

- **Semantic HTML**: Uses native `<input type="checkbox">` and `<label>` elements
- **Keyboard Navigation**: Supports Space and Enter to toggle
- **Click Target**: Label is clickable for easier interaction
- **Visual Feedback**: Clear checkbox state indication
- **User Control**: Cannot be selected (user-select: none on label)

## Performance Considerations

- **Stateless Component**: No internal state, fully controlled
- **Minimal Re-renders**: Only re-renders when props change
- **Event Handling**: Single onChange handler
- **Lightweight**: No heavy computations or data processing

## Default State

By design, the filter **always defaults to OFF** (showing all code):
- Gives users complete visibility by default
- Requires explicit action to enable filtering
- Prevents confusion about missing frames
- Follows principle of showing all data unless requested otherwise

## Related Components

- `FullFlameGraph`: Integrates FilterControls with flame graph visualization
- `FlameGraph`: Accepts showAppCodeOnly prop to apply filtering
- `FlameDataProcessor`: Processes the filtering using utility functions

## Integration Pattern

Typical usage integrates with the full flame graph component:

```tsx
<div className="controls-row">
  <HottestFramesControls {...props} />
  <FilterControls
    showAppCodeOnly={showAppCodeOnly}
    onToggle={setShowAppCodeOnly}
  />
</div>
<FlameGraph
  profile={profile}
  showAppCodeOnly={showAppCodeOnly}
/>
```

This provides both frame navigation and filtering controls in a unified interface.
