# StackDetails

A detailed panel component that displays comprehensive information about a selected frame, including its complete stack trace and direct child frames.

## Purpose

The StackDetails component provides an in-depth view of frame relationships within the call stack. It shows the complete path from root to the selected frame and lists all direct children, making it ideal for detailed performance analysis.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `selectedFrame` | `any \| null` | **required** | The currently selected frame data |
| `stackTrace` | `any[]` | `[]` | Array of frames from root to selected frame |
| `children` | `any[]` | `[]` | Array of direct child frames |
| `backgroundColor` | `string` | `'#1e1e1e'` | Background color of the panel |
| `textColor` | `string` | `'#ffffff'` | Text color for content |
| `primaryColor` | `string` | `'#ff4444'` | Primary theme color |
| `secondaryColor` | `string` | `'#ffcc66'` | Secondary theme color |
| `fontFamily` | `string` | System font stack | Font family for text |
| `width` | `number \| string` | `'100%'` | Width of the panel |
| `height` | `number \| string` | `'auto'` | Height of the panel |
| `allFrames` | `any[]` | `[]` | All frames for accurate color calculation |

## Usage Examples

### Basic Usage

```tsx
import { StackDetails } from './StackDetails'

function ProfilePanel({ selectedFrame, stackTrace, children }) {
  return (
    <StackDetails
      selectedFrame={selectedFrame}
      stackTrace={stackTrace}
      children={children}
    />
  )
}
```

### With Custom Styling

```tsx
<StackDetails
  selectedFrame={selectedFrame}
  stackTrace={stackTrace}
  children={children}
  backgroundColor="#0f172a"
  textColor="#f1f5f9"
  primaryColor="#3b82f6"
  secondaryColor="#10b981"
  width="400px"
  height="600px"
/>
```

### As Overlay Panel

```tsx
function FlameGraphWithDetails({ profile, selectedFrame }) {
  return (
    <div style={{ position: 'relative' }}>
      <FlameGraph profile={profile} />
      
      {selectedFrame && (
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '400px',
          height: '100%',
          backgroundColor: '#1e1e1eF0',
          boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.3)'
        }}>
          <StackDetails
            selectedFrame={selectedFrame}
            stackTrace={stackTrace}
            children={children}
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  )
}
```

## Panel Structure

### Header Section
- **Title**: "Stack Details" heading
- **Selected Frame**: Color-coded frame name matching flame graph colors
- **Dynamic Coloring**: Frame color calculated using same algorithm as flame graph

### Stack Trace Section  
- **Title**: "Stack Trace (Root → Selected)"
- **Frame List**: Complete path from root to selected frame
- **Highlighted Selection**: Selected frame shown in primary color
- **Frame Details**: Each frame shows:
  - Function name
  - File name and line number (if available)
  - Value (sample count)
  - Width percentage

### Children Section
- **Title**: "Child Frames" with count
- **Sorted List**: Children ordered by value (descending)
- **Leaf Detection**: Shows "No child frames (leaf node)" for leaf frames
- **Child Details**: Each child shows:
  - Function name (bold)
  - File location
  - Value and width metrics

## Empty State

When no frame is selected, displays:
- Centered message: "Click on a frame in the flamegraph to view stack details"
- Maintains consistent styling and dimensions
- Uses semi-transparent text for subtle appearance

## Color Integration

The component integrates with flame graph colors:

- **Dynamic Frame Color**: Uses `getFrameColorHexBySameDepthRatio()` function
- **Depth-Based Calculation**: Colors match flame graph frame colors exactly
- **Real-Time Updates**: Colors update when frame selection changes
- **Fallback Colors**: Uses primary color when calculation unavailable

## Data Handling

### Robust Data Processing
- **Type Safety**: Handles various data types and formats
- **JSON Fallback**: Displays JSON for complex object values
- **Safe Navigation**: Null-safe access to all properties
- **Flexible Input**: Works with different frame data structures

### Frame Information Display
For each frame, shows:
- **Name**: Function or method name (with JSON fallback)
- **Location**: File path and line number
- **Metrics**: Value (formatted with locale) and percentage width
- **Hierarchy**: Visual indication of stack relationships

## Visual Features

### Layout
- **Scrollable Content**: Auto-overflow for long lists
- **Sectioned Design**: Clear separation between stack trace and children
- **Consistent Spacing**: Proper margins and padding throughout
- **Responsive Text**: Scales with container size

### Styling Elements
- **Card Design**: Subtle background and border for content sections
- **Hover Effects**: Interactive elements with transitions
- **Typography Hierarchy**: Different sizes and weights for information levels
- **Color Coding**: Strategic use of colors for emphasis and organization

## Performance Optimizations

- **Color Memoization**: Expensive color calculations are cached
- **Effect Optimization**: Uses React.useEffect for color updates only when necessary
- **Efficient Sorting**: Children sorted once using useMemo
- **State Management**: Minimal re-renders through careful state updates

## Accessibility Features

- **Semantic HTML**: Proper heading structure and landmarks
- **CSS Classes**: Descriptive class names for testing and styling
- **Screen Reader Support**: Meaningful text content and structure
- **Keyboard Navigation**: Standard scrolling and interaction patterns

## Integration Points

### With FullFlameGraph
- Typically used as an overlay panel
- Receives processed stack trace and children data
- Coordinates with flame graph selection state

### Data Dependencies
- **Stack Trace**: Expects ordered array from root to selected
- **Children**: Expects direct child frames with value property
- **All Frames**: Optional but recommended for accurate coloring

## Technical Implementation

- **React Hooks**: Uses useState and useEffect for color management
- **Type Flexibility**: Handles various data formats gracefully
- **Error Boundaries**: Graceful handling of malformed data
- **Style Isolation**: Self-contained styling without external dependencies

## Related Components

- `FullFlameGraph`: Primary container that uses this component
- `FlameGraph`: Provides frame selection that drives this display
- `FrameDetails`: Complementary compact frame information
- `HottestFramesBar` and `HottestFramesControls`: Alternative navigation methods