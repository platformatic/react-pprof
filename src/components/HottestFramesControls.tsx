import React, { useMemo, useEffect, useState } from 'react'
import { Profile } from '../parser'
import { FrameData, FlameNode } from '../renderer'
import { FrameWithSelfTime } from './HottestFramesBar'

export interface HottestFramesControlsProps {
  profile: Profile
  selectedFrame?: FrameData | null
  onFrameSelect?: (frame: FrameData) => void
  textColor?: string
  fontSize?: string
  fontFamily?: string
}

export const HottestFramesControls: React.FC<HottestFramesControlsProps> = ({
  profile,
  selectedFrame,
  onFrameSelect,
  textColor = '#ffffff',
  fontSize = '14px',
  fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Process profile to get sorted frames (reuse logic from HottestFramesBar)
  const sortedFrames = useMemo(() => {
    // This is a simplified version - in production you'd want to share this logic
    // with HottestFramesBar through a custom hook or utility function
    const frameMap = new Map<string, FrameWithSelfTime>()
    
    // Build flame graph structure from profile
    const buildFlameGraph = (profile: Profile) => {
      const samples: Array<{stack: string[], value: number, locations?: any[]}> = []
      let totalValue = 0

      const stringTable = profile.stringTable?.strings || []
      const getString = (index: number | bigint | undefined): string | undefined => {
        if (index === undefined) {return undefined}
        const idx = Number(index)
        return stringTable[idx]
      }

      const functions = new Map()
      const locations = new Map()

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

      for (const sample of profile.sample || []) {
        const value = sample.value?.[0] || 0
        const numericValue = typeof value === 'bigint' ? Number(value) : value
        totalValue += numericValue

        const stack: string[] = []
        const locationInfo: any[] = []

        for (let i = (sample.locationId?.length || 0) - 1; i >= 0; i--) {
          const locId = sample.locationId?.[i]?.toString()
          const loc = locations.get(locId)
          if (loc && loc.functions.length > 0) {
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

    // Build tree structure
    const root: FlameNode = {
      id: 'root',
      name: 'all',
      value: totalValue,
      selfValue: 0, // Will be calculated
      sampleCount: 0,
      selfSampleCount: 0,
      children: [],
      depth: 0,
      x: 0,
      width: 1,
      selfWidth: 0 // Will be calculated
    }

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
          node = {
            id: nodeId,
            name: functionName,
            value: 0,
            selfValue: 0, // Will be calculated
            sampleCount: 0,
            selfSampleCount: 0,
            children: [],
            depth: i + 1,
            x: 0,
            width: 0,
            selfWidth: 0, // Will be calculated
            fileName: location?.filename,
            lineNumber: location?.line
          }
          nodeMap.set(nodeId, node)
          currentParent.children.push(node)
        }
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

    // Collect frames with pre-computed self-time
    const collectFrames = (node: FlameNode) => {
      // Use pre-computed self-time from FlameDataProcessor
      const selfTime = node.selfValue
      if (node.id !== 'root') {
        frameMap.set(node.id, {
          frame: {
            id: node.id,
            name: node.name,
            value: selfTime,
            selfValue: node.selfValue,
            depth: node.id.split('/').length - 1,
            x: 0,
            width: 0,
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
      for (const child of node.children) {
        collectFrames(child)
      }
    }

    collectFrames(root)

    // Sort by self-time
    return Array.from(frameMap.values())
      .sort((a, b) => {
        if (a.selfTime !== b.selfTime) {
          return b.selfTime - a.selfTime
        }
        return b.frame.totalValue - a.frame.totalValue
      })
  }, [profile])

  // Update current index when selected frame changes
  useEffect(() => {
    if (selectedFrame) {
      const index = sortedFrames.findIndex(f => f.nodeId === selectedFrame.id)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    } else {
      // Reset to first frame when selection is cleared
      setCurrentIndex(0)
    }
  }, [selectedFrame, sortedFrames])

  const totalFrames = sortedFrames.length
  const hasFrames = totalFrames > 0
  const hasSelection = selectedFrame !== null
  const isFirstFrame = currentIndex === 0
  const isLastFrame = currentIndex === totalFrames - 1

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

  const handleFirst = () => {
    if (hasFrames && onFrameSelect) {
      setCurrentIndex(0)
      onFrameSelect(sortedFrames[0].frame)
    }
  }

  const handlePrev = () => {
    if (hasFrames && onFrameSelect) {
      // If no frame is selected, start from the first frame
      if (!hasSelection) {
        setCurrentIndex(0)
        onFrameSelect(sortedFrames[0].frame)
      } else if (currentIndex > 0) {
        const newIndex = currentIndex - 1
        setCurrentIndex(newIndex)
        onFrameSelect(sortedFrames[newIndex].frame)
      }
    }
  }

  const handleNext = () => {
    if (hasFrames && onFrameSelect) {
      // If no frame is selected, start from the first frame
      if (!hasSelection) {
        setCurrentIndex(0)
        onFrameSelect(sortedFrames[0].frame)
      } else if (currentIndex < totalFrames - 1) {
        const newIndex = currentIndex + 1
        setCurrentIndex(newIndex)
        onFrameSelect(sortedFrames[newIndex].frame)
      }
    }
  }

  const handleLast = () => {
    if (hasFrames && onFrameSelect) {
      const lastIndex = totalFrames - 1
      setCurrentIndex(lastIndex)
      onFrameSelect(sortedFrames[lastIndex].frame)
    }
  }

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
      <button
        onClick={handleFirst}
        disabled={!hasFrames || isFirstFrame}
        style={buttonStyle(!hasFrames || isFirstFrame)}
        title="First frame"
      >
        ⟨⟨
      </button>

      <button
        onClick={handlePrev}
        disabled={!hasFrames || (hasSelection && isFirstFrame)}
        style={buttonStyle(!hasFrames || (hasSelection && isFirstFrame))}
        title="Previous frame"
      >
        ⟨
      </button>

      <span style={{
        padding: '4px 12px',
        minWidth: '200px',
        textAlign: 'center',
      }}>
        {hasFrames ? (
          hasSelection ? 
            `#${currentIndex + 1} hottest frame, of ${totalFrames}` :
            `${totalFrames} frames (none selected)`
        ) : (
          'No frames available'
        )}
      </span>

      <button
        onClick={handleNext}
        disabled={!hasFrames || (hasSelection && isLastFrame)}
        style={buttonStyle(!hasFrames || (hasSelection && isLastFrame))}
        title="Next frame"
      >
        ⟩
      </button>

      <button
        onClick={handleLast}
        disabled={!hasFrames || isLastFrame}
        style={buttonStyle(!hasFrames || isLastFrame)}
        title="Last frame"
      >
        ⟩⟩
      </button>
    </div>
  )
}