import React from 'react'
import { FlameNode, ProfileMetadata, formatValue, formatPercentage, formatSampleCount, getMetricLabel, getTotalValueLabel, getSelfValueLabel } from '../renderer'

export interface FlameGraphTooltipProps {
  frameData: FlameNode
  mouseX: number
  mouseY: number
  fontFamily?: string
  profileMetadata?: ProfileMetadata
}

export const FlameGraphTooltip: React.FC<FlameGraphTooltipProps> = ({
  frameData,
  mouseX,
  mouseY,
  fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  profileMetadata
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
        backgroundColor: 'white',
        color: 'black',
        padding: '12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontFamily,
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        maxWidth: '250px',
        wordBreak: 'break-word',
        pointerEvents: 'none'
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        {frameData.name}
      </div>
      <hr style={{
        margin: '8px 0 12px 0',
        border: 'none',
        borderTop: '1px solid #e8e8e8'
      }} />
      <div style={{ marginBottom: '6px' }}>
        <span style={{ color: '#666', fontSize: '11px' }}>{profileMetadata ? getMetricLabel(profileMetadata) : 'Samples'}:</span>
        <span style={{ marginLeft: '8px', fontWeight: '500' }}>{formatSampleCount(frameData.value)}</span>
      </div>
      <div style={{ marginBottom: '6px' }}>
        <span style={{ color: '#666', fontSize: '11px' }}>{profileMetadata ? getTotalValueLabel(profileMetadata) : 'Total Time'}:</span>
        <span style={{ marginLeft: '8px', fontWeight: '500' }}>{profileMetadata ? formatValue(frameData.value, profileMetadata) : `${(frameData.width * 100).toFixed(2)}%`}</span>
        <span style={{ marginLeft: '4px', color: '#999', fontSize: '10px' }}>({formatPercentage(frameData.width)})</span>
      </div>
      <div style={{ marginBottom: '6px' }}>
        <span style={{ color: '#666', fontSize: '11px' }}>{profileMetadata ? getSelfValueLabel(profileMetadata) : 'Self Time'}:</span>
        <span style={{ marginLeft: '8px', fontWeight: '500' }}>{profileMetadata ? formatValue(frameData.selfValue || 0, profileMetadata) : `${((frameData.selfWidth || 0) * 100).toFixed(2)}%`}</span>
        <span style={{ marginLeft: '4px', color: '#999', fontSize: '10px' }}>({formatPercentage(frameData.selfWidth || 0)})</span>
      </div>
      <div>
        <span style={{ color: '#666', fontSize: '11px' }}>Depth:</span>
        <span style={{ marginLeft: '8px', fontWeight: '500' }}>{frameData.depth}</span>
      </div>
    </div>
  )
}
