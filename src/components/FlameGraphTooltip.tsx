import React from 'react'
import { FlameNode } from '../renderer'

export interface FlameGraphTooltipProps {
  frameData: FlameNode
  mouseX: number
  mouseY: number
  primaryColor?: string
  textColor?: string
}

export const FlameGraphTooltip: React.FC<FlameGraphTooltipProps> = ({
  frameData,
  mouseX,
  mouseY,
  primaryColor = '#ff4444',
  textColor = '#ffffff'
}) => {
  const calculateTooltipPosition = (mouseX: number, mouseY: number) => {
    const tooltipWidth = 250
    const tooltipHeight = 120
    const offset = 10
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Default position (below and to the right of cursor)
    let left = mouseX + offset
    let top = mouseY + offset
    
    // Check if tooltip would overflow right edge
    if (left + tooltipWidth > viewportWidth) {
      left = mouseX - tooltipWidth - offset // Position to the left
    }
    
    // Check if tooltip would overflow bottom edge
    if (top + tooltipHeight > viewportHeight) {
      top = mouseY - tooltipHeight - offset // Position above cursor
    }
    
    // Ensure tooltip doesn't go off left edge
    if (left < 0) {
      left = offset
    }
    
    // Ensure tooltip doesn't go off top edge
    if (top < 0) {
      top = offset
    }
    
    return { left, top }
  }

  return (
    <div
      className="flamegraph-tooltip"
      style={{
        position: 'fixed',
        ...calculateTooltipPosition(mouseX, mouseY),
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: textColor,
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontFamily: 'monospace',
        border: `1px solid ${primaryColor}`,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        maxWidth: '250px',
        wordBreak: 'break-word',
        pointerEvents: 'none'
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <strong style={{ color: primaryColor }}>Function:</strong>
        <div style={{ marginLeft: '8px' }}>{frameData.name}</div>
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong style={{ color: primaryColor }}>Value:</strong>
        <span style={{ marginLeft: '8px' }}>{frameData.value.toLocaleString()}</span>
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong style={{ color: primaryColor }}>Width:</strong>
        <span style={{ marginLeft: '8px' }}>{(frameData.width * 100).toFixed(2)}%</span>
      </div>
      <div>
        <strong style={{ color: primaryColor }}>Depth:</strong>
        <span style={{ marginLeft: '8px' }}>{frameData.depth}</span>
      </div>
    </div>
  )
}