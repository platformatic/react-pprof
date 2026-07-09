# SearchControls

A search box for finding frames in the flame graph by function name or file name, with previous/next navigation through the matches.

## Purpose

The SearchControls component lets users locate specific functions in large profiles. Typing a query shows how many frames match, and the navigation buttons (or Enter / Shift+Enter) cycle through the matches hottest-first, selecting each frame in the flame graph so it is highlighted and its stack details are shown.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `frames` | `FlameNode[]` | **required** | All frames in the flame graph to search through |
| `selectedFrame` | `FrameData \| null` | `undefined` | The currently selected frame, used to track the match position |
| `onFrameSelect` | `function` | `undefined` | Callback when a matching frame is selected |
| `onMatchesChange` | `function` | `undefined` | Callback with the IDs of all matching frames whenever the query changes (`null` when the query is empty); used to highlight matches in the flame graph |
| `textColor` | `string` | `'#ffffff'` | Text color for the input, buttons, and match count |
| `fontSize` | `string` | `'14px'` | Font size for text |
| `fontFamily` | `string` | System font stack | Font family for text rendering |
| `placeholder` | `string` | `'Search frames'` | Placeholder text for the search input |

## Behavior

- Matching is a case-insensitive substring test against each frame's function name and file name.
- While a query is active, all matching frames are highlighted in the flame graph: matches render at full opacity and non-matching frames are dimmed.
- Matches are ordered by total value (hottest first), so the first match is the most significant frame.
- **Enter** selects the next match, **Shift+Enter** the previous one, wrapping around at either end.
- **Escape** clears the query.
- The match counter shows `N of M` when the current selection is one of the matches, or the total match count otherwise.

## Usage Examples

### Basic Usage

```tsx
import React, { useState } from 'react'
import { SearchControls } from './SearchControls'

function FlameGraphViewer({ allFrames }) {
  const [selectedFrame, setSelectedFrame] = useState(null)

  return (
    <div>
      <SearchControls
        frames={allFrames}
        selectedFrame={selectedFrame}
        onFrameSelect={setSelectedFrame}
      />
      <FlameGraph
        profile={profile}
        selectedFrameId={selectedFrame ? selectedFrame.id : null}
      />
    </div>
  )
}
```

### Within FullFlameGraph

SearchControls is rendered automatically by `FullFlameGraph` unless disabled:

```tsx
<FullFlameGraph profile={profile} showSearch={false} />
```
