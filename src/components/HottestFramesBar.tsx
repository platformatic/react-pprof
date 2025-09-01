import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Profile } from '../parser'
import { FrameData, FlameNode } from '../renderer'

export interface HottestFramesBarProps {
  profile: Profile
  width?: number | string
  height?: number
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  selectedFrame?: FrameData | null
  onFrameSelect?: (frame: FrameData | null) => void
  onNavigationChange?: (index: number, frames: FrameWithSelfTime[]) => void
}

export interface FrameWithSelfTime {
  frame: FrameData
  selfTime: number
  nodeId: string
}

export const HottestFramesBar: React.FC<HottestFramesBarProps> = ({
  profile,
  width = '100%',
  height = 10,
  primaryColor = '#ff4444',
  secondaryColor = '#ffcc66',
  backgroundColor = '#1e1e1e',
  textColor = '#ffffff',
  selectedFrame,
  onFrameSelect,
  onNavigationChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Process profile to get frames sorted by self-time
  const sortedFrames = useMemo(() => {
    const frameMap = new Map<string, FrameWithSelfTime>()

    // We need to build the same flame graph structure as the FlameGraph component
    // to ensure frame IDs match
    const buildFlameGraph = (profile: Profile) => {
      const samples: Array<{stack: string[], value: number, locations?: any[]}> = []
      let totalValue = 0

      // Extract function names from string table
      const stringTable = profile.stringTable?.strings || []

      // Helper function to safely get string from table
      const getString = (index: number | bigint | undefined): string | undefined => {
        if (index === undefined) {
          return undefined
        }
        const idx = Number(index)
        return stringTable[idx]
      }

      // Build function and location lookup tables
      const functions = new Map()
      const locations = new Map()

      // Build function lookup table
      for (const func of profile.function || []) {
        if (func.id && func.name) {
          const name = getString(func.name) || `func_${func.id}`
          const filename = getString(func.filename)

          functions.set(func.id.toString(), {
            name,
            filename,
            startLine: func.startLine
          })
        }
      }

      // Build location lookup table
      for (const location of profile.location || []) {
        if (location.id) {
          const locInfo: any = { functions: [] }

          for (const line of location.line || []) {
            const funcId = line.functionId?.toString()
            const func = functions.get(funcId)

            if (func) {
              locInfo.functions.push({
                functionName: func.name,
                filename: func.filename,
                line: line.line ? Number(line.line) : undefined
              })
            }
          }

          locations.set(location.id.toString(), locInfo)
        }
      }

      // Process samples
      for (const sample of profile.sample || []) {
        const value = sample.value?.[0] || 0
        const numericValue = typeof value === 'bigint' ? Number(value) : value
        totalValue += numericValue

        // Build the stack from locationIds
        const stack: string[] = []
        const locationInfo: any[] = []

        // In pprof format, locationIds are stored from leaf to root
        // We need to reverse to get root to leaf for building the flame graph tree
        for (let i = (sample.locationId?.length || 0) - 1; i >= 0; i--) {
          const locId = sample.locationId?.[i]?.toString()
          const loc = locations.get(locId)

          if (loc && loc.functions.length > 0) {
            // Use the first function at this location
            const func = loc.functions[0]
            stack.push(func.functionName)
            locationInfo.push(func)
          }
        }

        if (stack.length > 0) {
          samples.push({
            stack,
            value: numericValue,
            locations: locationInfo
          })
        }
      }

      return { samples, totalValue }
    }

    const { samples, totalValue } = buildFlameGraph(profile)

    // Create flame graph nodes similar to FlameDataProcessor
    const root: FlameNode = {
      id: 'root',
      name: 'all',
      value: totalValue,
      selfValue: 0, // Will be calculated
      x: 0,
      width: 1,
      selfWidth: 0, // Will be calculated
      depth: 0,
      children: []
    }

    // Build tree structure
    const nodeMap = new Map<string, FlameNode>()
    nodeMap.set('root', root)

    for (const sample of samples) {
      let currentParent = root
      let currentPath = 'root'

      for (let i = 0; i < sample.stack.length; i++) {
        const functionName = sample.stack[i]
        const nodeId = `${currentPath}/${functionName}`
        const location = sample.locations?.[i]

        let node = nodeMap.get(nodeId)

        if (!node) {
          // Create new node
          node = {
            id: nodeId,
            name: functionName,
            value: 0,
            selfValue: 0, // Will be calculated
            x: 0,
            width: 0,
            selfWidth: 0, // Will be calculated
            depth: i + 1,
            children: [],
            parent: currentParent,
            fileName: location?.filename,
            lineNumber: location?.line
          }

          nodeMap.set(nodeId, node)
          currentParent.children.push(node)
        }

        // Accumulate sample value
        node.value += sample.value

        currentParent = node
        currentPath = nodeId
      }
    }

    // Calculate self-time values for all nodes
    const calculateSelfTimes = (node: FlameNode) => {
      const childrenTotalValue = node.children.reduce((sum, child) => sum + child.value, 0)
      node.selfValue = Math.max(0, node.value - childrenTotalValue)
      node.selfWidth = node.selfValue / root.value
      
      // Recursively process children
      node.children.forEach(calculateSelfTimes)
    }
    
    calculateSelfTimes(root)

    // Collect all frames with their pre-computed self-time
    const collectFrames = (node: FlameNode) => {
      // Use pre-computed self-time from FlameDataProcessor
      const selfTime = node.selfValue

      // Include ALL frames except root, even with zero self-time
      if (node.id !== 'root') {
        frameMap.set(node.id, {
          frame: {
            id: node.id,
            name: node.name,
            value: selfTime,
            selfValue: node.selfValue,
            depth: node.depth,
            x: 0, // Will be calculated later
            width: 0, // Will be calculated later
            selfWidth: node.selfWidth,
            functionName: node.name,
            fileName: node.fileName,
            lineNumber: node.lineNumber,
            totalValue: node.value,
          },
          selfTime: selfTime,
          nodeId: node.id
        })
      }

      // Recursively collect from children
      for (const child of node.children) {
        collectFrames(child)
      }
    }

    collectFrames(root)

    // Sort frames by self-time (descending), then by total value for frames with 0 self-time
    const sorted = Array.from(frameMap.values())
      .sort((a, b) => {
        // First sort by self-time
        if (a.selfTime !== b.selfTime) {
          return b.selfTime - a.selfTime
        }
        // For frames with equal self-time (including 0), sort by total value
        return b.frame.totalValue - a.frame.totalValue
      })

    // Calculate widths for visualization
    // Frames with self-time get proportional width
    // Frames with 0 self-time get minimal visible width
    const minWidth = 0.002 // Minimum width to be visible
    const framesWithSelfTime = sorted.filter(f => f.selfTime > 0)
    const framesWithoutSelfTime = sorted.filter(f => f.selfTime === 0)

    const totalSelfTime = framesWithSelfTime.reduce((sum, f) => sum + f.selfTime, 0)
    const spaceForZeroFrames = Math.min(0.2, framesWithoutSelfTime.length * minWidth) // Max 20% for zero frames
    const spaceForNonZeroFrames = 1 - spaceForZeroFrames

    let cumulativeX = 0

    // Assign widths to frames with self-time
    framesWithSelfTime.forEach(f => {
      f.frame.x = cumulativeX
      f.frame.width = totalSelfTime > 0 ? (f.selfTime / totalSelfTime) * spaceForNonZeroFrames : 0
      cumulativeX += f.frame.width
    })

    // Assign minimal widths to frames without self-time
    framesWithoutSelfTime.forEach(f => {
      f.frame.x = cumulativeX
      f.frame.width = framesWithoutSelfTime.length > 0 ? spaceForZeroFrames / framesWithoutSelfTime.length : 0
      cumulativeX += f.frame.width
    })

    return sorted
  }, [profile])

  // Update selected index when external frame is selected or unselected
  useEffect(() => {
    if (selectedFrame) {
      const index = sortedFrames.findIndex(f => f.nodeId === selectedFrame.id)
      if (index !== -1) {
        setSelectedIndex(index)
      }
    }
  }, [selectedFrame, sortedFrames])

  // Notify parent of navigation changes
  useEffect(() => {
    if (onNavigationChange && sortedFrames.length > 0) {
      onNavigationChange(selectedIndex, sortedFrames)
    }
  }, [selectedIndex, sortedFrames, onNavigationChange])

  const handleBarClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width

    // Find which frame was clicked
    let clickedIndex = -1
    let cumulativeX = 0

    for (let i = 0; i < sortedFrames.length; i++) {
      const frame = sortedFrames[i]
      if (x >= cumulativeX && x < cumulativeX + frame.frame.width) {
        clickedIndex = i
        break
      }
      cumulativeX += frame.frame.width
    }

    if (clickedIndex !== -1) {
      const clickedFrame = sortedFrames[clickedIndex]

      // If clicking on an already selected frame, unselect it
      if (selectedFrame && clickedFrame.nodeId === selectedFrame.id) {
        // Clear selection
        if (onFrameSelect) {
          onFrameSelect(null)
        }
      } else {
        // Select the clicked frame
        setSelectedIndex(clickedIndex)
        if (onFrameSelect) {
          onFrameSelect(clickedFrame.frame)
        }
      }
    }
  }, [sortedFrames, onFrameSelect, selectedFrame])

  const handleBarMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width

    // Find which frame is hovered
    let hoveredIdx = -1
    let cumulativeX = 0

    for (let i = 0; i < sortedFrames.length; i++) {
      const frame = sortedFrames[i]
      if (x >= cumulativeX && x < cumulativeX + frame.frame.width) {
        hoveredIdx = i
        break
      }
      cumulativeX += frame.frame.width
    }

    setHoveredIndex(hoveredIdx)
  }, [sortedFrames])

  const handleBarMouseLeave = useCallback(() => {
    setHoveredIndex(null)
  }, [])

  // Helper to interpolate between colors
  const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hex2rgb = (hex: string): [number, number, number] => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return [r, g, b]
    }

    const rgb2hex = (r: number, g: number, b: number): string => {
      const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0')
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`
    }

    const [r1, g1, b1] = hex2rgb(color1)
    const [r2, g2, b2] = hex2rgb(color2)

    const r = r1 + (r2 - r1) * factor
    const g = g1 + (g2 - g1) * factor
    const b = b1 + (b2 - b1) * factor

    return rgb2hex(r, g, b)
  }

  if (sortedFrames.length === 0) {
    return null
  }

  return (
    <div
      style={{
        width,
        height: `${height}px`,
        position: 'relative',
        cursor: 'pointer',
        backgroundColor,
        border: `1px solid ${textColor}33`,
        borderRadius: '2px',
        overflow: 'hidden',
      }}
      onClick={handleBarClick}
      onMouseMove={handleBarMouseMove}
      onMouseLeave={handleBarMouseLeave}
    >
      {sortedFrames.map((frameData, index) => {
        const colorFactor = index / Math.max(1, sortedFrames.length - 1)
        const frameColor = interpolateColor(primaryColor, secondaryColor, colorFactor)
        // Only highlight as selected if it matches the external selection
        const isSelected = selectedFrame && frameData.nodeId === selectedFrame.id
        const isHovered = index === hoveredIndex
        // Show current navigation position with a border when no external selection
        const isCurrentPosition = index === selectedIndex && !selectedFrame

        return (
          <div
            key={frameData.nodeId}
            style={{
              position: 'absolute',
              left: `${frameData.frame.x * 100}%`,
              width: `${frameData.frame.width * 100}%`,
              height: '100%',
              backgroundColor: frameColor,
              opacity: isSelected ? 1 : (isHovered ? 0.9 : 0.7),
              borderRight: frameData.frame.width > 0.001 ? `1px solid ${backgroundColor}` : 'none',
              borderTop: isCurrentPosition ? `2px solid ${textColor}` : 'none',
              borderBottom: isCurrentPosition ? `2px solid ${textColor}` : 'none',
              transition: 'opacity 0.1s ease',
              boxSizing: 'border-box',
            }}
            title={`${frameData.frame.name} (self: ${frameData.selfTime.toFixed(2)}, total: ${frameData.frame.totalValue.toFixed(2)})`}
          />
        )
      })}
    </div>
  )
}

// Export helper function to navigate through frames
export const useHottestFramesNavigation = (
  sortedFrames: FrameWithSelfTime[],
  onFrameSelect?: (frame: FrameData | null) => void
) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleFirst = useCallback(() => {
    setSelectedIndex(0)
    if (sortedFrames.length > 0 && onFrameSelect) {
      onFrameSelect(sortedFrames[0].frame)
    }
  }, [sortedFrames, onFrameSelect])

  const handlePrev = useCallback(() => {
    const newIndex = Math.max(0, selectedIndex - 1)
    setSelectedIndex(newIndex)
    if (sortedFrames[newIndex] && onFrameSelect) {
      onFrameSelect(sortedFrames[newIndex].frame)
    }
  }, [selectedIndex, sortedFrames, onFrameSelect])

  const handleNext = useCallback(() => {
    const newIndex = Math.min(sortedFrames.length - 1, selectedIndex + 1)
    setSelectedIndex(newIndex)
    if (sortedFrames[newIndex] && onFrameSelect) {
      onFrameSelect(sortedFrames[newIndex].frame)
    }
  }, [selectedIndex, sortedFrames, onFrameSelect])

  const handleLast = useCallback(() => {
    const lastIndex = sortedFrames.length - 1
    setSelectedIndex(lastIndex)
    if (sortedFrames[lastIndex] && onFrameSelect) {
      onFrameSelect(sortedFrames[lastIndex].frame)
    }
  }, [sortedFrames, onFrameSelect])

  return {
    selectedIndex,
    setSelectedIndex,
    handleFirst,
    handlePrev,
    handleNext,
    handleLast,
  }
}
