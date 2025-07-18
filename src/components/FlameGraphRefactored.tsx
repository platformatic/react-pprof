import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { FlameGraphRenderer, FlameNode } from '../renderer'
import { Profile } from '../parser'
import { 
  useFlameGraphRenderer, 
  useCanvasResize, 
  useMouseInteractions, 
  useTooltip 
} from './hooks'

export interface FlameGraphProps {
  profile: Profile
  width?: number | string
  height?: number | string
  primaryColor?: string
  secondaryColor?: string
  backgroundColor?: string
  textColor?: string
  fontFamily?: string
  shadowOpacity?: number
  selectedOpacity?: number
  hoverOpacity?: number
  unselectedOpacity?: number
  framePadding?: number
  onFrameClick?: (frame: any, stackTrace: FlameNode[], children: FlameNode[]) => void
  onZoomChange?: (zoomLevel: number) => void
}

export const FlameGraphRefactored = forwardRef<{ rendererRef: React.RefObject<FlameGraphRenderer> }, FlameGraphProps>(({
  profile,
  width = '100%',
  height,
  primaryColor = '#ff4444',
  secondaryColor = '#ffcc66',
  backgroundColor = '#1e1e1e',
  textColor = '#ffffff',
  fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  shadowOpacity = 0.3,
  selectedOpacity = 1.0,
  hoverOpacity = 0.9,
  unselectedOpacity = 0.75,
  framePadding = 2,
  onFrameClick,
  onZoomChange: _onZoomChange,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  // Use custom hooks to manage complexity
  const { rendererRef, computedHeight, initialize } = useFlameGraphRenderer({
    profile,
    width,
    height,
    primaryColor,
    secondaryColor,
    backgroundColor,
    textColor,
    fontFamily,
    shadowOpacity,
    selectedOpacity,
    hoverOpacity,
    unselectedOpacity,
    framePadding
  })

  const { 
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging,
    mousePosition,
    hoveredFrameData
  } = useMouseInteractions(
    canvasRef,
    rendererRef,
    { onFrameClick, onZoomChange: _onZoomChange },
    setIsScrollable
  )

  const { tooltipData } = useTooltip(
    mousePosition,
    hoveredFrameData
  )

  useCanvasResize(
    canvasRef,
    containerRef,
    rendererRef,
    { width, height, computedHeight, profile },
    setIsScrollable
  )

  // Initialize renderer when refs are ready
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    
    const success = initialize(canvasRef.current, containerRef.current)
    if (success) {
      // Set initial selected frame
      const internalData = (rendererRef.current as any)?.data
      if (internalData && internalData.children.length > 0) {
        // Initial frame selection would be handled by mouse interactions
      }
    }
  }, [initialize, profile])

  // Update renderer when frame states change
  useEffect(() => {
    if (rendererRef.current) {
      // Frame state updates are now handled within the mouse interactions hook
      rendererRef.current.render()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    rendererRef: rendererRef as React.RefObject<FlameGraphRenderer>
  }))

  // Determine effective height for container
  const useExplicitHeight = typeof height === 'number'
  const containerHeight = useExplicitHeight 
    ? (typeof height === 'number' ? `${height}px` : height)
    : (computedHeight !== null ? `${computedHeight}px` : undefined)

  return (
    <div
      ref={containerRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: containerHeight,
        position: 'relative',
        backgroundColor
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: isDragging ? 'grabbing' : (isScrollable ? 'grab' : 'pointer')
        }}
      />

      {/* Tooltip */}
      {tooltipData && (
        <div
          style={{
            position: 'fixed',
            left: tooltipData.position.left,
            top: tooltipData.position.top,
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
            <div style={{ marginLeft: '8px' }}>{tooltipData.frameData.name}</div>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: primaryColor }}>Value:</strong>
            <span style={{ marginLeft: '8px' }}>{tooltipData.frameData.value.toLocaleString()}</span>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ color: primaryColor }}>Width:</strong>
            <span style={{ marginLeft: '8px' }}>{(tooltipData.frameData.width * 100).toFixed(2)}%</span>
          </div>
          <div>
            <strong style={{ color: primaryColor }}>Depth:</strong>
            <span style={{ marginLeft: '8px' }}>{tooltipData.frameData.depth}</span>
          </div>
        </div>
      )}
    </div>
  )
})

FlameGraphRefactored.displayName = 'FlameGraphRefactored'