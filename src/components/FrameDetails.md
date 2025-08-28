# FrameDetails

A compact component that displays essential information about a selected frame in a single line format.

## Purpose

The FrameDetails component provides a concise view of frame information, typically used as a header or status display showing the currently selected frame's key metrics.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frame` | `FrameData \| null` | **required** | The frame data to display, or null for empty state |
| `selfTime` | `number` | - | Optional override for self-time value |
| `textColor` | `string` | `'#ffffff'` | Text color for the display |
| `fontSize` | `string` | `'12px'` | Font size for the text |
| `fontFamily` | `string` | System font stack | Font family for text rendering |

## Usage Examples

### Basic Usage

```tsx
import { FrameDetails } from './FrameDetails'
import { FrameData } from '../renderer'

function ProfileViewer({ selectedFrame }: { selectedFrame: FrameData | null }) {
  return (
    <div>
      <h2>Profile Analysis</h2>
      <FrameDetails frame={selectedFrame} />
    </div>
  )
}
```

### With Custom Styling

```tsx
<FrameDetails
  frame={selectedFrame}
  textColor="#e2e8f0"
  fontSize="14px"
  fontFamily="Consolas, monospace"
/>
```

### With Override Self-Time

```tsx
// When you have calculated a custom self-time value
<FrameDetails
  frame={selectedFrame}
  selfTime={calculatedSelfTime}
  textColor="#fbbf24"
  fontSize="13px"
/>
```

### Empty State Handling

```tsx
// Component gracefully handles null frame
<FrameDetails frame={null} /> // Renders empty div
```

## Display Format

When a frame is selected, the component displays information in this format:

```
[FunctionName] (filename.go:123) self: 42.50, total: 156.75
```

Where:
- **Function Name**: Bold display of `frame.functionName` or fallback to `frame.name`
- **File Location**: Optional filename and line number in parentheses
- **Self Time**: Time spent in this frame excluding children
- **Total Time**: Total time including all children

## Key Features

- **Compact Display**: Single-line format ideal for headers or status bars
- **Smart Fallbacks**: Uses `functionName` if available, otherwise `frame.name`
- **Optional Elements**: File location only shown if available
- **Empty State**: Returns empty div when no frame is selected
- **Self-Time Override**: Allows custom self-time calculation to be displayed
- **Responsive Text**: Configurable font size and styling

## State Handling

The component handles three states:

1. **No Frame**: Returns `<div />` when `frame` is null
2. **Frame with File Info**: Shows function name, file, line number, and metrics
3. **Frame without File Info**: Shows function name and metrics only

## Data Dependencies

The component expects the frame object to have:

- `functionName` or `name`: The function identifier
- `fileName` (optional): Source file name
- `lineNumber` (optional): Source line number  
- `value`: Self-time value (unless overridden by `selfTime` prop)
- `totalValue`: Total time including children

## Styling Options

All styling is configurable via props:
- `textColor`: Controls text color
- `fontSize`: Sets text size  
- `fontFamily`: Defines font stack
- Built-in opacity (0.8) for subtle appearance
- Bold weight for function names

## Related Components

- `FullFlameGraph`: Uses this component in the controls section
- `StackDetails`: More detailed frame information display
- `HottestFramesBar`: Works with frame selection to drive this display