import React, { useEffect, useMemo, useState } from 'react'
import { FrameData, FlameNode } from '../renderer/index.js'

export interface SearchControlsProps {
  frames: FlameNode[]
  selectedFrame?: FrameData | null
  onFrameSelect?: (frame: FrameData | null) => void
  onMatchesChange?: (matchedFrameIds: string[] | null) => void
  textColor?: string
  fontSize?: string
  fontFamily?: string
  placeholder?: string
}

const toFrameData = (node: FlameNode): FrameData => ({
  id: node.id,
  name: node.name,
  value: node.value,
  selfValue: node.selfValue,
  depth: node.depth,
  x: node.x,
  width: node.width,
  selfWidth: node.selfWidth,
  functionName: node.name,
  fileName: node.fileName,
  lineNumber: node.lineNumber,
  totalValue: node.value,
  sampleCount: node.sampleCount,
})

export const SearchControls: React.FC<SearchControlsProps> = ({
  frames,
  selectedFrame,
  onFrameSelect,
  onMatchesChange,
  textColor = '#ffffff',
  fontSize = '14px',
  fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  placeholder = 'Search frames',
}) => {
  const [query, setQuery] = useState('')

  // Find frames matching the query (case-insensitive substring on
  // function name or file name), hottest first
  const matches = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) {
      return []
    }

    return frames
      .filter(node => {
        if (node.id === 'root') {
          return false
        }
        return (
          node.name.toLowerCase().includes(trimmed) ||
          (node.fileName ? node.fileName.toLowerCase().includes(trimmed) : false)
        )
      })
      .sort((a, b) => b.value - a.value)
  }, [frames, query])

  // Report the current matches so the flame graph can highlight them;
  // null means no active search
  useEffect(() => {
    if (onMatchesChange) {
      onMatchesChange(query.trim() ? matches.map(node => node.id) : null)
    }
  }, [matches, query, onMatchesChange])

  const totalMatches = matches.length
  // Derive the position from the current selection so it stays in sync
  // when the selection changes elsewhere (click, hottest-frames nav, ...)
  const currentIndex = selectedFrame
    ? matches.findIndex(node => node.id === selectedFrame.id)
    : -1

  const selectMatch = (index: number) => {
    if (onFrameSelect && matches[index]) {
      onFrameSelect(toFrameData(matches[index]))
    }
  }

  const handleNext = () => {
    if (totalMatches === 0) {return}
    selectMatch(currentIndex === -1 ? 0 : (currentIndex + 1) % totalMatches)
  }

  const handlePrev = () => {
    if (totalMatches === 0) {return}
    selectMatch(currentIndex === -1 ? totalMatches - 1 : (currentIndex - 1 + totalMatches) % totalMatches)
  }

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.shiftKey) {
        handlePrev()
      } else {
        handleNext()
      }
    } else if (event.key === 'Escape') {
      setQuery('')
    }
  }

  const hasQuery = query.trim().length > 0
  const buttonsDisabled = totalMatches === 0

  const buttonStyle = (disabled: boolean) => ({
    background: 'transparent',
    border: `1px solid ${textColor}`,
    color: textColor,
    padding: '4px 8px',
    borderRadius: '2px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    fontSize,
    fontFamily,
  })

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      color: textColor,
      fontSize,
      fontFamily,
      padding: '8px 0',
    }}>
      <input
        type="search"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label="Search frames"
        style={{
          background: 'transparent',
          border: `1px solid ${textColor}`,
          color: textColor,
          padding: '4px 8px',
          borderRadius: '2px',
          fontSize,
          fontFamily,
          width: '180px',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      <button
        onClick={handlePrev}
        disabled={buttonsDisabled}
        style={buttonStyle(buttonsDisabled)}
        title="Previous match"
      >
        ⟨
      </button>

      <button
        onClick={handleNext}
        disabled={buttonsDisabled}
        style={buttonStyle(buttonsDisabled)}
        title="Next match"
      >
        ⟩
      </button>

      {hasQuery && (
        <span style={{
          minWidth: '90px',
          opacity: 0.85,
        }}>
          {totalMatches === 0
            ? 'No matches'
            : currentIndex === -1
              ? `${totalMatches} match${totalMatches === 1 ? '' : 'es'}`
              : `${currentIndex + 1} of ${totalMatches}`}
        </span>
      )}
    </div>
  )
}
