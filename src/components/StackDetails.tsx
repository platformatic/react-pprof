import React, { useMemo } from 'react'
import { getFrameColorHexBySameDepthRatio } from '../renderer/colors'


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
        boxSizing: 'border-box'  // Include padding in width/height calculation
      }}>
        <div className="stack-details-empty-message" style={{ textAlign: 'center', opacity: 0.7 }}>
          Click on a frame in the flamegraph to view stack details
        </div>
      </div>
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
      boxSizing: 'border-box'  // Include padding in width/height calculation
    }}>
      {/* Header */}
      <div className="stack-details-header">
        <h3 style={{
          margin: '0 0 10px 0',
          color: textColor,
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
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
            key={`${frameKey}-${frameBackgroundColor}`}  // Force re-render with unique key
            style={{
              backgroundColor: frameBackgroundColor,
              color: textColor,  // Use textColor prop which defaults to white, matching FlameGraph frames
              padding: '4px 8px',
              borderRadius: '3px',
              fontWeight: 'bold',
              transition: 'background-color 0.2s ease',
              flex: 1,
              marginLeft: '4px',
              textShadow: '1px 1px 0 rgba(0, 0, 0, 0.5)'  // 1px drop shadow to match FlameGraph frames
            }}>
            {selectedFrame.name ? (typeof selectedFrame.name === 'object' ? JSON.stringify(selectedFrame.name) : selectedFrame.name) : 'Unnamed'}
          </div>
        </div>
      </div>

      {/* Stack Trace */}
      <div className="stack-trace-section">
        <hr style={{
          border: 'none',
          borderTop: `1px solid ${textColor}`,
        }} />
        <h4 className="stack-trace-header" style={{
          margin: '0 5px',
          color: textColor,
          fontSize: '14px',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
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
            // Ensure frame is an object and not something else
            if (!frame || typeof frame !== 'object') {
              return null
            }
            return (
              <div key={frame.id || `frame-${index}`} className="stack-frame" style={{
                marginBottom: index === stackTrace.length - 1 ? '0' : '16px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2px'
                }}>
                  <span style={{
                    color: index === stackTrace.length - 1 ? primaryColor : textColor,
                    fontWeight: index === stackTrace.length - 1 ? 'bold' : 'normal'
                  }}>
                    {index > 0 ? '→ ' : ''}{typeof frame.name === 'object' ? JSON.stringify(frame.name) : (frame.name || 'Unnamed')}
                  </span>
                </div>
              <div className="stack-frame-details" style={{
                fontSize: '12px',
                opacity: 0.7
              }}>
                {!!frame.fileName && (
                  <span>{typeof frame.fileName === 'object' ? JSON.stringify(frame.fileName) : frame.fileName}:{typeof frame.lineNumber === 'object' ? JSON.stringify(frame.lineNumber) : frame.lineNumber}</span>
                )}
                {frame.fileName ? ' • ' : ''}
                <span>Value: {typeof frame.value === 'object' ? JSON.stringify(frame.value) : (frame.value?.toLocaleString() || '0')}</span>
                {' • '}
                <span>Width: {typeof frame.width === 'object' ? JSON.stringify(frame.width) : ((frame.width || 0) * 100).toFixed(2)}%</span>
              </div>
            </div>
            )
          })}
        </div>
      </div>

      {/* Children */}
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
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif'
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
              // Ensure child is an object and not something else
              if (!child || typeof child !== 'object') {
                return null
              }
              return (
                <div key={child.id || `child-${index}`} className="child-frame" style={{
                marginBottom: index === sortedChildren.length - 1 ? '0' : '12px',
                paddingBottom: index === sortedChildren.length - 1 ? '0' : '8px',
                borderBottom: index === sortedChildren.length - 1 ? 'none' : `1px solid ${primaryColor}10`
              }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ color: textColor }}>{typeof child.name === 'object' ? JSON.stringify(child.name) : child.name}</strong>
                </div>
                <div className="child-frame-details" style={{ fontSize: '12px', opacity: 0.7 }}>
                  {!!child.fileName && (
                    <span>{typeof child.fileName === 'object' ? JSON.stringify(child.fileName) : child.fileName}:{typeof child.lineNumber === 'object' ? JSON.stringify(child.lineNumber) : child.lineNumber}</span>
                  )}
                  {child.fileName ? ' • ' : ''}
                  <span>Value: {typeof child.value === 'object' ? JSON.stringify(child.value) : (child.value?.toLocaleString() || '0')}</span>
                  {' • '}
                  <span>Width: {typeof child.width === 'object' ? JSON.stringify(child.width) : ((child.width || 0) * 100).toFixed(2)}%</span>
                </div>
              </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
