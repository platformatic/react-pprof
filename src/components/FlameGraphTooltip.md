# FlameGraphTooltip

A floating tooltip component that displays frame information when hovering over flame graph frames.

## Purpose

The FlameGraphTooltip component provides contextual information about flame graph frames in a fixed-position overlay. It automatically positions itself to avoid viewport boundaries and displays key frame metrics.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frameData` | `FlameNode` | **required** | The flame node data to display |
| `mouseX` | `number` | **required** | Mouse X position in screen coordinates |
| `mouseY` | `number` | **required** | Mouse Y position in screen coordinates |
| `fontFamily` | `string` | System font stack | Font family for tooltip text |

## Usage Examples

### Basic Usage

```tsx
import { FlameGraphTooltip } from './FlameGraphTooltip'
import { FlameNode } from '../renderer'

function MyFlameGraph() {
  const [mousePos, setMousePos] = useState<{x: number, y: number} | null>(null)
  const [hoveredFrame, setHoveredFrame] = useState<FlameNode | null>(null)

  return (
    <div>
      {/* Flame graph canvas */}
      <canvas
        onMouseMove={(e) => {
          setMousePos({ x: e.clientX, y: e.clientY })
          // Logic to find frame at cursor position...
        }}
      />
      
      {/* Tooltip */}
      {hoveredFrame && mousePos && (
        <FlameGraphTooltip
          frameData={hoveredFrame}
          mouseX={mousePos.x}
          mouseY={mousePos.y}
        />
      )}
    </div>
  )
}
```

### With Custom Font

```tsx
<FlameGraphTooltip
  frameData={frameData}
  mouseX={clientX}
  mouseY={clientY}
  fontFamily="Consolas, 'Courier New', monospace"
/>
```

## Key Features

- **Smart Positioning**: Automatically adjusts position to stay within viewport bounds
- **Non-Interactive**: Uses `pointer-events: none` to avoid interfering with mouse interactions
- **Fixed Positioning**: Uses screen coordinates for accurate placement
- **Responsive Layout**: Adjusts position when close to edges
- **Clean Styling**: Modern card-like appearance with shadows

## Display Information

The tooltip shows the following frame information:

1. **Frame Name**: The function or method name
2. **Value**: The frame's sample count or value
3. **Width**: The frame's proportional width as a percentage
4. **Depth**: The frame's depth level in the call stack

## Positioning Logic

The tooltip implements intelligent positioning:

- **Default**: Appears below and to the right of the cursor (+10px offset)
- **Right Edge**: Flips to the left side when it would overflow the viewport
- **Bottom Edge**: Appears above the cursor when it would overflow vertically
- **Corner Cases**: Ensures tooltip stays within viewport bounds with minimum margins

## Styling

The component features:
- White background with subtle border
- Drop shadow for depth
- 250px maximum width with word wrapping
- Hierarchical information layout with separators
- Responsive text sizing (12px body, 11px labels)

## Technical Details

- Uses `position: fixed` for screen-coordinate positioning
- Implements viewport boundary detection with `window.innerWidth/innerHeight`
- Non-blocking rendering with high z-index (1000)
- Handles long frame names with `word-break: break-word`

## Related Components

- `FlameGraph`: The main component that uses this tooltip
- `FullFlameGraph`: Complete implementation showing tooltip integration