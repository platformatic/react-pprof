import React, { useMemo } from 'react'

export interface StackDetailsProps {
  selectedFrame: any | null
  stackTrace?: any[]
  children?: any[]
  backgroundColor?: string
  textColor?: string
  primaryColor?: string
  secondaryColor?: string
  width?: number | string
  height?: number | string
}

export const StackDetails: React.FC<StackDetailsProps> = ({
  selectedFrame,
  stackTrace = [],
  children = [],
  backgroundColor = '#1e1e1e',
  textColor = '#ffffff',
  primaryColor = '#ff4444',
  secondaryColor = '#ffcc66',
  width = '100%',
  height = 'auto'
}) => {
  // Sort children by descending weight (value)
  const sortedChildren = useMemo(() => {
    return [...children].sort((a, b) => b.value - a.value)
  }, [children])

  if (!selectedFrame) {
    return (
      <div className="stack-details-container stack-details-empty" style={{
        width,
        height,
        backgroundColor,
        color: textColor,
        padding: '20px',
        borderRadius: '8px',
        fontFamily: 'SF Mono, Monaco, Cascadia Code, Roboto Mono, Courier New, monospace',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${primaryColor}20`
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
      borderRadius: '8px',
      fontFamily: 'SF Mono, Monaco, Cascadia Code, Roboto Mono, Courier New, monospace',
      fontSize: '14px',
      border: `1px solid ${primaryColor}20`,
      overflow: 'auto'
    }}>
      {/* Header */}
      <div className="stack-details-header" style={{ marginBottom: '20px' }}>
        <h3 style={{ 
          margin: '0 0 10px 0', 
          color: primaryColor,
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          Stack Details
        </h3>
        <div style={{ 
          fontSize: '12px', 
          opacity: 0.7,
          borderBottom: `1px solid ${primaryColor}20`,
          paddingBottom: '10px'
        }}>
          Selected frame: {selectedFrame.name}
        </div>
      </div>

      {/* Stack Trace */}
      <div className="stack-trace-section" style={{ marginBottom: '30px' }}>
        <h4 className="stack-trace-header" style={{ 
          margin: '0 0 15px 0', 
          color: secondaryColor,
          fontSize: '14px',
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
          {stackTrace.map((frame, index) => (
            <div key={frame.id} className="stack-frame" style={{ 
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
                  {index > 0 && '→ '}{frame.name}
                </span>
              </div>
              <div className="stack-frame-details" style={{ 
                fontSize: '12px', 
                opacity: 0.7
              }}>
                {frame.fileName && (
                  <span>{frame.fileName}:{frame.lineNumber}</span>
                )}
                {frame.fileName && ' • '}
                <span>Value: {frame.value?.toLocaleString()}</span>
                {' • '}
                <span>Width: {((frame.width || 0) * 100).toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Children */}
      <div className="child-frames-section">
        <h4 className="child-frames-header" style={{ 
          margin: '0 0 15px 0', 
          color: secondaryColor,
          fontSize: '14px',
          fontWeight: 'bold'
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
            sortedChildren.map((child, index) => (
              <div key={child.id} className="child-frame" style={{ 
                marginBottom: index === sortedChildren.length - 1 ? '0' : '12px',
                paddingBottom: index === sortedChildren.length - 1 ? '0' : '8px',
                borderBottom: index === sortedChildren.length - 1 ? 'none' : `1px solid ${primaryColor}10`
              }}>
                <div style={{ marginBottom: '4px' }}>
                  <strong style={{ color: primaryColor }}>{child.name}</strong>
                </div>
                <div className="child-frame-details" style={{ fontSize: '12px', opacity: 0.7 }}>
                  {child.fileName && (
                    <span>{child.fileName}:{child.lineNumber}</span>
                  )}
                  {child.fileName && ' • '}
                  <span>Value: {child.value?.toLocaleString()}</span>
                  {' • '}
                  <span>Width: {((child.width || 0) * 100).toFixed(2)}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}