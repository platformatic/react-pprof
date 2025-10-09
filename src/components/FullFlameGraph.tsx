import React, { useState, useMemo, useRef } from 'react'
import { Profile } from '../parser'
import { FrameData, FlameNode, detectProfileMetadata, FlameGraphRenderer } from '../renderer'
import { HottestFramesBar, type FrameWithSelfTime } from './HottestFramesBar'
import { HottestFramesControls } from './HottestFramesControls'
import { FrameDetails } from './FrameDetails'
import { FlameGraph } from './FlameGraph'
import { StackDetails } from './StackDetails'

export interface FullFlameGraphProps {
  profile: Profile
  height?: number
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  fontFamily?: string
  showHottestFrames?: boolean
  showControls?: boolean
  showFrameDetails?: boolean
  showStackDetails?: boolean
  hottestFramesHeight?: number
}

export const FullFlameGraph: React.FC<FullFlameGraphProps> = ({
  profile,
  height = 500,
  primaryColor = '#ff4444',
  secondaryColor = '#ffcc66',
  backgroundColor = '#1e1e1e',
  textColor = '#ffffff',
  fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  showHottestFrames = true,
  showControls = true,
  showFrameDetails = false,
  showStackDetails = true,
  hottestFramesHeight = 10,
}) => {
  const [selectedFrame, setSelectedFrame] = useState<FrameData | null>(null)
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null)
  const [frames, setFrames] = useState<FrameWithSelfTime[]>([])
  const [stackTrace, setStackTrace] = useState<any[]>([])
  const [frameChildren, setFrameChildren] = useState<any[]>([])

  // Reference to FlameGraph's renderer
  const flameGraphRef = useRef<{ rendererRef: React.RefObject<FlameGraphRenderer> }>(null)

  // Detect profile metadata directly from the profile
  const profileMetadata = useMemo(() => {
    if (!profile) {
      return undefined
    }
    return detectProfileMetadata(profile)
  }, [profile])

  // Build a map of all frames for quick lookup
  const frameMap = useMemo(() => {
    const map = new Map<string, any>()
    frames.forEach(f => {
      map.set(f.nodeId, {
        id: f.nodeId,
        name: f.frame.name,
        value: f.frame.totalValue || f.frame.value,
        width: f.frame.width,
        depth: f.frame.depth || f.nodeId.split('/').length - 1,
        fileName: f.frame.fileName,
        lineNumber: f.frame.lineNumber,
        functionName: f.frame.functionName,
      })
    })
    return map
  }, [frames])

  // Helper function to build stack trace from frame ID
  const buildStackTrace = (frameId: string | null): any[] => {
    if (!frameId) {return []}

    // Parse the frame ID to get the stack (e.g., "root/main/server/handler")
    const parts = frameId.split('/')
    const stack: any[] = []

    for (let i = 0; i < parts.length; i++) {
      const currentId = parts.slice(0, i + 1).join('/')
      const frameData = frameMap.get(currentId)

      if (frameData) {
        stack.push(frameData)
      } else {
        // Fallback if frame not in map (shouldn't happen normally)
        stack.push({
          id: currentId,
          name: parts[i],
          depth: i,
          value: 0,
          width: 0,
        })
      }
    }

    return stack
  }

  // Helper function to find children of a frame
  const findFrameChildren = (frameId: string | null): any[] => {
    if (!frameId) {return []}

    // Find all frames that are direct children of the selected frame
    const children: any[] = []
    const parentDepth = frameId.split('/').length

    frameMap.forEach((frameData, nodeId) => {
      // Check if this frame is a direct child
      if (nodeId.startsWith(frameId + '/')) {
        const frameParts = nodeId.split('/')
        if (frameParts.length === parentDepth + 1) {
          children.push(frameData)
        }
      }
    })

    return children
  }

  const handleFrameSelection = (frame: FrameData | null, stack?: any[], children?: any[]) => {
    // Always try to get the most up-to-date frame data from frameMap
    let actualFrame = frame
    if (frame && frameMap.has(frame.id)) {
      // Merge the frame data with the latest data from frameMap
      const mapData = frameMap.get(frame.id)
      actualFrame = {
        ...frame,
        ...mapData,
        // Ensure we preserve the original width from the frame if it exists
        width: frame.width !== undefined ? frame.width : mapData.width
      }
    }

    setSelectedFrame(actualFrame)
    setSelectedFrameId(actualFrame ? actualFrame.id : null)

    // If stack and children are provided (from FlameGraph), use them
    // Otherwise, compute them from the frame ID
    if (stack && children) {
      setStackTrace(stack)
      setFrameChildren(children)
    } else if (actualFrame) {
      setStackTrace(buildStackTrace(actualFrame.id))
      setFrameChildren(findFrameChildren(actualFrame.id))
    } else {
      setStackTrace([])
      setFrameChildren([])
    }
  }

  const handleNavigationChange = (_index: number, sortedFrames: FrameWithSelfTime[]) => {
    setFrames(sortedFrames)
  }

  // Build the complete flame graph structure to get all frames
  const allFramesFlat = useMemo(() => {
    const allNodes: FlameNode[] = []
    
    // Helper function to traverse the flame graph tree
    const traverse = (node: FlameNode) => {
      if (!node) {return}
      allNodes.push(node)
      if (node.children && node.children.length > 0) {
        node.children.forEach(traverse)
      }
    }
    
    // Build flame graph structure from profile (similar to how FlameGraph does it)
    const buildFlameGraph = () => {
      const root: FlameNode = {
        id: 'root',
        name: 'root',
        value: 0,
        selfValue: 0,
        sampleCount: 0,
        selfSampleCount: 0,
        children: [],
        depth: 0,
        x: 0,
        width: 1,
        selfWidth: 0
      }

      // Use the correct value index from profile metadata
      const valueIndex = profileMetadata?.sampleTypeIndex ?? 0

      // Process each sample in the profile
      if (profile && profile.sample) {
        profile.sample.forEach((sample: any) => {
          if (!sample.locationId || sample.locationId.length === 0) {return}

          let currentNode = root
          const value = sample.value?.[valueIndex] || 1
          root.value += value
          root.sampleCount += 1  // Count each sample
          
          // Build the stack for this sample
          const stack: string[] = []
          sample.locationId.forEach((locationId: any) => {
            const location = profile.location?.find((loc: any) => loc.id === locationId)
            if (location && location.line && location.line.length > 0) {
              const func = profile.function?.find((f: any) => f.id === location.line?.[0]?.functionId)
              if (func) {
                const nameIndex = Number(func.name)
                const funcName = (profile.stringTable as any)?.[nameIndex] || `func_${func.id}`
                stack.push(funcName)
              }
            }
          })
          
          // Traverse/create the tree based on the stack
          stack.reverse().forEach((funcName, depth) => {
            let child = currentNode.children.find(c => c.name === funcName)
            if (!child) {
              const nodeId = currentNode.id === 'root'
                ? funcName
                : `${currentNode.id}/${funcName}`
              child = {
                id: nodeId,
                name: funcName,
                value: 0,
                selfValue: 0,
                sampleCount: 0,
                selfSampleCount: 0,
                children: [],
                depth: depth + 1,
                x: 0,
                width: 0,
                selfWidth: 0
              }
              currentNode.children.push(child)
            }
            child.value += value
            child.sampleCount += 1  // Count each sample that passes through this node
            currentNode = child
          })
        })
      }
      
      // Calculate x and width for each node
      const calculatePositions = (node: FlameNode, x: number = 0, parentWidth: number = 1) => {
        node.x = x
        node.width = parentWidth

        if (node.children.length > 0) {
          const totalValue = node.children.reduce((sum, child) => sum + child.value, 0)
          let currentX = x

          node.children.forEach(child => {
            const childWidth = (child.value / totalValue) * parentWidth
            calculatePositions(child, currentX, childWidth)
            currentX += childWidth
          })
        }
      }

      // Calculate self values and self sample counts
      const calculateSelfValues = (node: FlameNode) => {
        // Calculate self value (node's value minus children's value)
        const childrenTotalValue = node.children.reduce((sum, child) => sum + child.value, 0)
        node.selfValue = Math.max(0, node.value - childrenTotalValue)

        // Calculate self width as percentage of root
        node.selfWidth = node.selfValue / (root.value || 1)

        // Calculate self sample count (samples that end at this frame)
        const childrenTotalSamples = node.children.reduce((sum, child) => sum + child.sampleCount, 0)
        node.selfSampleCount = Math.max(0, node.sampleCount - childrenTotalSamples)

        // Recursively process children
        node.children.forEach(calculateSelfValues)
      }

      calculatePositions(root)
      calculateSelfValues(root)
      return root
    }
    
    const flameRoot = buildFlameGraph()
    traverse(flameRoot)

    return allNodes
  }, [profile, profileMetadata])

  // Find the current frame based on selection
  const currentFrame = frames.find(f => selectedFrame && f.nodeId === selectedFrame.id)

  return (
    <div style={{
      backgroundColor,
      padding: '20px',
      borderRadius: '4px',
      position: 'relative',
    }}>
      {showHottestFrames && (
        <div style={{ marginBottom: '10px' }}>
          <HottestFramesBar
            profile={profile}
            height={hottestFramesHeight}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            backgroundColor={backgroundColor}
            textColor={textColor}
            selectedFrame={selectedFrame}
            onFrameSelect={handleFrameSelection}
            onNavigationChange={handleNavigationChange}
          />
        </div>
      )}

      {(showControls || showFrameDetails) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          minHeight: '40px',
        }}>
          {showControls && (
            <div style={{ flex: '0 0 auto' }}>
              <HottestFramesControls
                profile={profile}
                selectedFrame={selectedFrame}
                onFrameSelect={handleFrameSelection}
                textColor={textColor}
              />
            </div>
          )}

          {showFrameDetails && (
            <div style={{ flex: '1 1 auto', textAlign: 'right' }}>
              <FrameDetails
                frame={currentFrame ? currentFrame.frame : null}
                selfTime={currentFrame ? currentFrame.selfTime : undefined}
                textColor={textColor}
                fontFamily={fontFamily}
                profileMetadata={profileMetadata}
              />
            </div>
          )}
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <FlameGraph
          ref={flameGraphRef}
          profile={profile}
          height={height}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          backgroundColor={backgroundColor}
          textColor={textColor}
          fontFamily={fontFamily}
          selectedFrameId={selectedFrameId}
          onFrameClick={handleFrameSelection}
        />

        {/* StackDetails overlay */}
        {showStackDetails && selectedFrame && (
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '400px',
            height: '100%',
            backgroundColor: `${backgroundColor}F0`,
            boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',  // Changed from overflowY: 'auto' to prevent double scrollbars
            zIndex: 10,
            boxSizing: 'border-box',  // Include padding in width calculation
          }}>
            {/* Close button */}
            <button
              onClick={() => handleFrameSelection(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: `1px solid ${textColor}40`,
                color: textColor,
                width: '24px',
                height: '24px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                zIndex: 11,
                opacity: 0.7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
              title="Close details"
            >
              ×
            </button>
            <div style={{
              height: '100%',
              boxSizing: 'border-box'
            }}>
              <StackDetails
                selectedFrame={selectedFrame}
                stackTrace={stackTrace}
                children={frameChildren}
                backgroundColor={backgroundColor}
                textColor={textColor}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                width="100%"
                height="100%"
                allFrames={allFramesFlat}
                profileMetadata={profileMetadata}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
