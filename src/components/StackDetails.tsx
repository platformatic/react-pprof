import React, { useMemo } from 'react'
import { getFrameColorHexBySameDepthRatio } from '../renderer/colors'

// Internal component interfaces
interface EmptyStateProps {
  width: number | string
  height: number | string
  backgroundColor: string
  textColor: string
  fontFamily: string
}

interface SelectedFrameHeaderProps {
  selectedFrame: any
  frameBackgroundColor: string
  frameKey: string
  textColor: string
  fontFamily: string
}

interface FrameMetricsProps {
  frame: any
  selfTimePercentage?: number
}

interface StackTraceFrameProps {
  frame: any
  index: number
  isLast: boolean
  textColor: string
  primaryColor: string
  children: any[]
  stackTrace: any[]
}

interface StackTraceSectionProps {
  stackTrace: any[]
  textColor: string
  primaryColor: string
  backgroundColor: string
  children: any[]
  fontFamily: string
}

interface ChildFrameItemProps {
  child: any
  index: number
  isLast: boolean
  textColor: string
  primaryColor: string
}

interface ChildFramesSectionProps {
  sortedChildren: any[]
  textColor: string
  primaryColor: string
  backgroundColor: string
  fontFamily: string
}

// Internal Components
const EmptyState: React.FC<EmptyStateProps> = ({
  width,
  height,
  backgroundColor,
  textColor,
  fontFamily
}) => (
  <div className="stack-details-container stack-details-empty" style={{
    width,
    height,
    backgroundColor,
    color: textColor,
    padding: '20px',
    fontFamily,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box'
  }}>
    <div className="stack-details-empty-message" style={{ textAlign: 'center', opacity: 0.7 }}>
      Click on a frame in the flamegraph to view stack details
    </div>
  </div>
)

const SelectedFrameHeader: React.FC<SelectedFrameHeaderProps> = ({
  selectedFrame,
  frameBackgroundColor,
  frameKey,
  textColor,
  fontFamily
}) => (
  <div className="stack-details-header">
    <h3 style={{
      margin: '0 0 10px 0',
      color: textColor,
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily
    }}>
      Stack Details
    </h3>
    <div style={{
      fontSize: '12px',
      paddingBottom: '10px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <span style={{ opacity: 0.7 }}>Selected frame: </span>
      <div
        key={`${frameKey}-${frameBackgroundColor}`}
        style={{
          backgroundColor: frameBackgroundColor,
          color: textColor,
          padding: '4px 8px',
          borderRadius: '3px',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease',
          flex: 1,
          marginLeft: '4px',
          textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'
        }}>
        {selectedFrame.name ? (typeof selectedFrame.name === 'object' ? JSON.stringify(selectedFrame.name) : selectedFrame.name) : 'Unnamed'}
      </div>
    </div>
  </div>
)

const FrameMetrics: React.FC<FrameMetricsProps> = ({ frame, selfTimePercentage }) => (
  <div className="stack-frame-details" style={{
    fontSize: '12px',
    opacity: 0.7
  }}>
    {!!frame.fileName && (
      <span>{typeof frame.fileName === 'object' ? JSON.stringify(frame.fileName) : frame.fileName}:{typeof frame.lineNumber === 'object' ? JSON.stringify(frame.lineNumber) : frame.lineNumber}</span>
    )}
    {frame.fileName ? ' • ' : ''}
    <span>Samples: {typeof frame.value === 'object' ? JSON.stringify(frame.value) : (frame.value?.toLocaleString() || '0')}</span>
    {' • '}
    <span>Total Time: {typeof frame.width === 'object' ? JSON.stringify(frame.width) : ((frame.width || 0) * 100).toFixed(2)}%</span>
    {selfTimePercentage !== undefined && (
      <>
        {' • '}
        <span>Self Time: {selfTimePercentage.toFixed(2)}%</span>
      </>
    )}
  </div>
)

const StackTraceFrame: React.FC<StackTraceFrameProps> = ({
  frame,
  index,
  isLast,
  textColor,
  primaryColor,
  children: _children,
  stackTrace: _stackTrace
}) => {
  // Use pre-computed self-time from FlameNode
  const selfTimePercentage = ((frame.selfWidth || 0) * 100)

  return (
    <div key={frame.id || `frame-${index}`} className="stack-frame" style={{
      marginBottom: isLast ? '0' : '16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2px'
      }}>
        <span style={{
          color: isLast ? primaryColor : textColor,
          fontWeight: isLast ? 'bold' : 'normal'
        }}>
          {index > 0 ? '→ ' : ''}{typeof frame.name === 'object' ? JSON.stringify(frame.name) : (frame.name || 'Unnamed')}
        </span>
      </div>
      <FrameMetrics frame={frame} selfTimePercentage={selfTimePercentage} />
    </div>
  )
}

const StackTraceSection: React.FC<StackTraceSectionProps> = ({
  stackTrace,
  textColor,
  primaryColor,
  backgroundColor,
  children,
  fontFamily
}) => (
  <div className="stack-trace-section">
    <hr style={{
      border: 'none',
      borderTop: `1px solid ${textColor}`,
    }} />
    <h4 className="stack-trace-header" style={{
      margin: '0 5px',
      color: textColor,
      fontSize: '14px',
      fontFamily,
      fontWeight: 'bold'
    }}>
      Stack Trace (Root → Selected)
    </h4>
    <div className="stack-trace-content" style={{
      backgroundColor: `${backgroundColor}CC`,
      border: `1px solid ${primaryColor}10`,
      borderRadius: '4px',
      padding: '12px'
    }}>
      {stackTrace.map((frame, index) => {
        if (!frame || typeof frame !== 'object') {
          return null
        }
        return (
          <StackTraceFrame
            key={frame.id || `frame-${index}`}
            frame={frame}
            index={index}
            isLast={index === stackTrace.length - 1}
            textColor={textColor}
            primaryColor={primaryColor}
            children={children}
            stackTrace={stackTrace}
          />
        )
      })}
    </div>
  </div>
)

const ChildFrameItem: React.FC<ChildFrameItemProps> = ({
  child,
  index,
  isLast,
  textColor,
  primaryColor
}) => {
  // Use pre-computed self-time from FlameNode
  const selfTimePercentage = ((child.selfWidth || 0) * 100)

  return (
    <div key={child.id || `child-${index}`} className="child-frame" style={{
      marginBottom: isLast ? '0' : '12px',
      paddingBottom: isLast ? '0' : '8px',
      borderBottom: isLast ? 'none' : `1px solid ${primaryColor}10`
    }}>
      <div style={{ marginBottom: '4px' }}>
        <strong style={{ color: textColor }}>{typeof child.name === 'object' ? JSON.stringify(child.name) : child.name}</strong>
      </div>
      <FrameMetrics frame={child} selfTimePercentage={selfTimePercentage} />
    </div>
  )
}

const ChildFramesSection: React.FC<ChildFramesSectionProps> = ({
  sortedChildren,
  textColor,
  primaryColor,
  backgroundColor,
  fontFamily
}) => (
  <div className="child-frames-section">
    <hr style={{
      border: 'none',
      borderTop: `1px solid ${textColor}`,
    }} />
    <h4 className="child-frames-header" style={{
      margin: '0 5px',
      color: textColor,
      fontSize: '14px',
      fontWeight: 'bold',
      fontFamily
    }}>
      Child Frames ({sortedChildren.length})
    </h4>
    <div className="child-frames-content" style={{
      backgroundColor: `${backgroundColor}CC`,
      border: `1px solid ${primaryColor}10`,
      borderRadius: '4px',
      padding: '12px'
    }}>
      {sortedChildren.length === 0 ? (
        <div style={{ opacity: 0.7, fontStyle: 'italic' }}>
          No child frames (leaf node)
        </div>
      ) : (
        sortedChildren.map((child, index) => {
          if (!child || typeof child !== 'object') {
            return null
          }
          return (
            <ChildFrameItem
              key={child.id || `child-${index}`}
              child={child}
              index={index}
              isLast={index === sortedChildren.length - 1}
              textColor={textColor}
              primaryColor={primaryColor}
            />
          )
        })
      )}
    </div>
  </div>
)

export interface StackDetailsProps {
  selectedFrame: any | null
  stackTrace?: any[]
  children?: any[]
  backgroundColor?: string
  textColor?: string
  primaryColor?: string
  secondaryColor?: string
  fontFamily?: string
  width?: number | string
  height?: number | string
  allFrames?: any[] // All frames in the profile for accurate color calculation
}

export const StackDetails: React.FC<StackDetailsProps> = ({
  selectedFrame,
  stackTrace = [],
  children = [],
  backgroundColor = '#1e1e1e',
  textColor = '#ffffff',
  primaryColor = '#ff4444',
  secondaryColor: _secondaryColor = '#ffcc66',
  fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  width = '100%',
  height = 'auto',
  allFrames = []
}) => {
  // Sort children by descending weight (value)
  const sortedChildren = useMemo(() => {
    return [...children].sort((a, b) => b.value - a.value)
  }, [children])

  // Create a stable key from the selected frame to force recomputation
  const frameKey = selectedFrame ? `${selectedFrame.id}-${selectedFrame.depth}-${selectedFrame.value}` : 'none'

  // Use state to force DOM updates
  const [frameBackgroundColor, setFrameBackgroundColor] = React.useState(primaryColor)

  // Compute and update frame color when dependencies change
  React.useEffect(() => {
    if (!selectedFrame) {
      setFrameBackgroundColor(primaryColor)
      return
    }

    // FlameGraph colors are based on the frame's relative size at the same depth level
    // Using the exact same algorithm as the FlameGraph renderer
    let computedColor = primaryColor

    // Calculate total value at this frame's depth level
    if (selectedFrame.id && selectedFrame.depth !== undefined) {
      // Use allFrames if available, otherwise fall back to stackTrace
      const framesToSearch = allFrames.length > 0 ? allFrames : stackTrace
      
      // Find all frames at the same depth level
      const framesAtDepth = framesToSearch.filter(f => f && f.depth === selectedFrame.depth)
      const totalValueAtDepth = framesAtDepth.reduce((sum, f) => sum + (f.value || 0), 0)

      if (totalValueAtDepth > 0 && selectedFrame.value) {
        // Use the shared color computation function
        computedColor = getFrameColorHexBySameDepthRatio(
          primaryColor,
          _secondaryColor,
          selectedFrame.value,
          totalValueAtDepth
        )
      }
    }

    setFrameBackgroundColor(computedColor)
  }, [selectedFrame, stackTrace, frameKey, primaryColor, _secondaryColor, allFrames])

  if (!selectedFrame) {
    return (
      <EmptyState
        width={width}
        height={height}
        backgroundColor={backgroundColor}
        textColor={textColor}
        fontFamily={fontFamily}
      />
    )
  }

  return (
    <div className="stack-details-container stack-details-with-frame" style={{
      width,
      height,
      backgroundColor,
      color: textColor,
      padding: '20px',
      fontFamily,
      fontSize: '14px',
      overflow: 'auto',
      boxSizing: 'border-box'
    }}>
      <SelectedFrameHeader
        selectedFrame={selectedFrame}
        frameBackgroundColor={frameBackgroundColor}
        frameKey={frameKey}
        textColor={textColor}
        fontFamily={fontFamily}
      />

      <StackTraceSection
        stackTrace={stackTrace}
        textColor={textColor}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        children={children}
        fontFamily={fontFamily}
      />

      <ChildFramesSection
        sortedChildren={sortedChildren}
        textColor={textColor}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        fontFamily={fontFamily}
      />
    </div>
  )
}
