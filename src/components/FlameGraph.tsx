import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { FlameGraphRenderer, FlameNode, FrameData } from '../renderer'
import { Profile } from '../parser'
import { FlameGraphTooltip } from './FlameGraphTooltip'

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
  zoomOnScroll?: boolean
  scrollZoomSpeed?: number
  scrollZoomInverted?: boolean
  selectedFrameId?: string | null
  onFrameClick?: (frame: FrameData | null, stackTrace: FlameNode[], children: FlameNode[]) => void
  onZoomChange?: (zoomLevel: number) => void
  onAnimationComplete?: () => void
}

export const FlameGraph = forwardRef<{ rendererRef: React.RefObject<FlameGraphRenderer> }, FlameGraphProps>(({
  profile,
  width = '100%',
  height,
  primaryColor = '#ff4444',
  secondaryColor = '#ffcc66',
  backgroundColor = '#1e1e1e',
  textColor = '#ffffff',
  fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
  shadowOpacity = 0.3,
  selectedOpacity = 1.0,
  hoverOpacity = 0.9,
  unselectedOpacity = 0.75,
  framePadding = 5,
  zoomOnScroll = false,
  scrollZoomSpeed = 0.05,
  scrollZoomInverted = false,
  selectedFrameId,
  onFrameClick,
  onZoomChange: _onZoomChange,
  onAnimationComplete,
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<FlameGraphRenderer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredFrame, setHoveredFrame] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [hoveredFrameData, setHoveredFrameData] = useState<FlameNode | null>(null)
  const [computedHeight, setComputedHeight] = useState<number | null>(null)
  const [canPan, setCanPan] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [initError, setInitError] = useState<string | null>(null)

  useImperativeHandle(ref, () => ({
    rendererRef: rendererRef as React.RefObject<FlameGraphRenderer>
  }))

  // Initialize renderer when canvas refs are ready
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      return
    }

    const initializeRenderer = async () => {
      try {
        // Clear any previous errors
        setInitError(null)

        // Ensure canvas has valid dimensions before creating WebGL context
        const rect = containerRef.current!.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) {
          return
        }

        const renderer = new FlameGraphRenderer(canvasRef.current!)

        // Check if WebGL initialization failed
        if (!renderer.isInitialized()) {
          throw new Error('Failed to initialize WebGL renderer')
        }

        renderer.setColors(primaryColor, secondaryColor, backgroundColor, textColor)
        renderer.setOpacity(selectedOpacity, hoverOpacity, unselectedOpacity)
        renderer.setFramePadding(framePadding)
        renderer.setFontFamily(fontFamily)
        renderer.setShadowOpacity(shadowOpacity)
        renderer.setScrollZoom(zoomOnScroll, scrollZoomSpeed, scrollZoomInverted, () => {
          setCanPan(renderer.canPan())
        })
        renderer.setAnimationCompleteCallback(onAnimationComplete)
        rendererRef.current = renderer

        // Set initial size - use the props if they're numbers
        if (typeof width === 'number' && typeof height === 'number') {
          renderer.resize(width, height)
        } else {
          const rect = containerRef.current!.getBoundingClientRect()
          renderer.resize(rect.width, rect.height)
        }

        // Set the data and render
        const requiredHeight = renderer.setData(profile)

        // Get the required height from renderer (only for auto-height mode)
        const useExplicitHeight = typeof height === 'number'
        renderer.setHeightMode(useExplicitHeight)

        if (!useExplicitHeight) {
          setComputedHeight(requiredHeight)
        } else {
          setComputedHeight(null)
        }

        // Check if content is scrollable and pannable
        setCanPan(renderer.canPan())

        // Set the root element (main frame) as selected by default - get from renderer's internal data
        const internalData = (renderer as any).data
        if (internalData && internalData.children.length > 0) {
          setSelectedFrame(internalData.children[0].id)
        }

        renderer.render()

        // Update scrollable and pannable state when renderer changes
        setCanPan(renderer.canPan())

        return () => {
          renderer.destroy()
        }
      } catch (error) {
        setInitError(error instanceof Error ? error.message : 'Failed to initialize WebGL renderer')
      }
    }

    initializeRenderer()
  }, [profile, primaryColor, secondaryColor, backgroundColor, textColor, fontFamily])

  // Update colors when they change (without recreating the renderer)
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setColors(primaryColor, secondaryColor, backgroundColor, textColor)
      rendererRef.current.render()
    }
  }, [primaryColor, secondaryColor, backgroundColor, textColor])

  // Update font family when it changes
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setFontFamily(fontFamily)
      rendererRef.current.render()
    }
  }, [fontFamily])

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setShadowOpacity(shadowOpacity)
      rendererRef.current.render()
    }
  }, [shadowOpacity])

  // Handle external frame selection
  useEffect(() => {
    if (rendererRef.current && selectedFrameId !== undefined) {
      rendererRef.current.setFrameStates(selectedFrameId, hoveredFrame)
      setSelectedFrame(selectedFrameId)
      rendererRef.current.render()
    }
  }, [selectedFrameId, hoveredFrame])

  useEffect(() => {
    if (rendererRef.current && canvasRef.current && containerRef.current) {
      rendererRef.current.setFramePadding(framePadding)

      // In auto-height mode, recalculate the required height
      const useExplicitHeight = typeof height === 'number'
      if (!useExplicitHeight) {
        const newRequiredHeight = rendererRef.current.getCalculatedHeight()

        if (newRequiredHeight && newRequiredHeight !== computedHeight) {
          setComputedHeight(newRequiredHeight)

          // Update canvas size
          const dpr = window.devicePixelRatio
          canvasRef.current.height = newRequiredHeight * dpr
          canvasRef.current.style.height = `${newRequiredHeight}px`

          // Tell renderer about new size
          const rect = containerRef.current.getBoundingClientRect()
          rendererRef.current.resize(rect.width, newRequiredHeight)
        }
      }

      rendererRef.current.render()
    }
  }, [framePadding, height, computedHeight])

  // Update scroll zoom settings when props change
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setScrollZoom(zoomOnScroll, scrollZoomSpeed, scrollZoomInverted, () => {
        setCanPan(rendererRef.current!.canPan())
      })
    }
  }, [zoomOnScroll, scrollZoomSpeed, scrollZoomInverted])

  // Update animation complete callback when prop changes
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setAnimationCompleteCallback(onAnimationComplete)
    }
  }, [onAnimationComplete])

  useEffect(() => {
    // Only set up resize observer after renderer exists
    if (!canvasRef.current || !containerRef.current || !rendererRef.current || !profile) {return}

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        let { width: observedWidth, height: observedHeight } = entry.contentRect

        // If props specify explicit dimensions, use those exactly
        if (typeof width === 'number') {
          observedWidth = width
        }

        const useExplicitHeight = typeof height === 'number'
        if (useExplicitHeight) {
          // In explicit height mode, always use the exact height prop
          observedHeight = height
        } else {
          // Auto-height mode: use computed height directly if available
          if (computedHeight !== null && computedHeight > 0) {
            observedHeight = computedHeight
          }
        }


        const dpr = window.devicePixelRatio

        // Set canvas to high-DPI resolution
        canvasRef.current!.width = observedWidth * dpr
        canvasRef.current!.height = observedHeight * dpr

        // Scale the WebGL canvas back down with CSS
        canvasRef.current!.style.width = `${observedWidth}px`
        canvasRef.current!.style.height = `${observedHeight}px`

        // Tell the renderer about the logical size, it will handle device pixel ratio internally
        rendererRef.current!.resize(observedWidth, observedHeight)

        // Update scrollable and pannable state after resize
        setCanPan(rendererRef.current!.canPan())
      }
    })

    resizeObserver.observe(containerRef.current)

    // Trigger initial resize to set up canvas dimensions correctly
    const rect = containerRef.current.getBoundingClientRect()
    let initialWidth = rect.width
    let initialHeight = rect.height

    // Use prop dimensions exactly if specified
    if (typeof width === 'number') {
      initialWidth = width
    }

    const useExplicitHeight = typeof height === 'number'
    if (useExplicitHeight) {
      // In explicit height mode, always use the exact height prop
      initialHeight = height
    } else {
      // Auto-height mode: use computed height if larger than container
      const minHeight = computedHeight !== null ? computedHeight : 0
      if (minHeight > 0 && initialHeight < minHeight) {
        initialHeight = minHeight
      }
    }

    if (initialWidth > 0 && initialHeight > 0) {
      const dpr = window.devicePixelRatio

      canvasRef.current.width = initialWidth * dpr
      canvasRef.current.height = initialHeight * dpr

      canvasRef.current.style.width = `${initialWidth}px`
      canvasRef.current.style.height = `${initialHeight}px`

      rendererRef.current.resize(initialWidth, initialHeight)

      // Update scrollable and pannable state after initial resize
      setCanPan(rendererRef.current.canPan())
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [width, height, profile, computedHeight])

  // Update renderer when frame states change
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setFrameStates(selectedFrame, hoveredFrame)
      // Only trigger render if not currently dragging to avoid interfering with drag updates
      if (!isDragging) {
        rendererRef.current.render()
      }
    }
  }, [selectedFrame, hoveredFrame, isDragging])

  // Update renderer when opacity props change
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setOpacity(selectedOpacity, hoverOpacity, unselectedOpacity)
      rendererRef.current.render()
    }
  }, [selectedOpacity, hoverOpacity, unselectedOpacity])

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current || !canvasRef.current) {return}

    // Don't process click if we're dragging or have dragged
    if (isDragging || rendererRef.current.hasDraggedDuringInteraction()) {
      return
    }

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const result = rendererRef.current.handleClick(x, y)
    if (result) {
      setSelectedFrame(result.frame.id)
      if (onFrameClick) {
        onFrameClick(result.frame, result.stackTrace, result.children)
      }
      // Update scrollable and pannable state after zoom changes
      setTimeout(() => {
        setCanPan(rendererRef.current!.canPan())
      }, 100)
    } else {
      setSelectedFrame(null)
      // Notify parent that selection was cleared
      if (onFrameClick) {
        onFrameClick(null as any, [], [])
      }
      // Update scrollable and pannable state after zoom reset
      setTimeout(() => {
        setCanPan(rendererRef.current!.canPan())
      }, 100)
    }
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current || !canvasRef.current) {return}

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    rendererRef.current.handleMouseDown(x, y)
    setIsDragging(true)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current || !canvasRef.current) {return}

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Handle dragging
    rendererRef.current.handleMouseMove(x, y)

    // Store mouse position for tooltip
    setMousePosition({ x: event.clientX, y: event.clientY })

    // Find the frame under the mouse cursor without triggering zoom
    const frameData = findFrameAtPosition(x, y)

    if (frameData?.id !== hoveredFrame) {
      setHoveredFrame(frameData?.id || null)
      setHoveredFrameData(frameData)
    }
  }

  const handleMouseUp = () => {
    if (!rendererRef.current) {return}
    rendererRef.current.handleMouseUp()
    setIsDragging(false)

    // Trigger a render after dragging ends to update any hover states that were skipped
    setTimeout(() => {
      if (rendererRef.current) {
        rendererRef.current.render()
      }
    }, 0)
  }

  const findFrameAtPosition = (x: number, y: number): FlameNode | null => {
    if (!rendererRef.current || !canvasRef.current) {return null}

    // Convert screen to world coordinates
    const camera = (rendererRef.current as any).camera
    const worldX = (x - camera.x) / camera.scale
    const worldY = y - camera.y

    // Get frames from renderer
    const frames = (rendererRef.current as any).frames

    // Find the deepest (highest depth) frame that contains the point
    let maxDepth = -1
    let foundFrame: FlameNode | null = null

    for (const frame of frames) {
      // frame.x1/x2 are normalized (0-1), convert to viewport coordinates
      const frameX1 = frame.x1 * (rendererRef.current as any).logicalWidth
      const frameX2 = frame.x2 * (rendererRef.current as any).logicalWidth

      if (worldX >= frameX1 && worldX <= frameX2 &&
          worldY >= frame.y1 && worldY <= frame.y2) {
        // Choose the frame with the highest depth (most specific)
        if (frame.node.depth > maxDepth) {
          maxDepth = frame.node.depth
          foundFrame = frame.node
        }
      }
    }

    return foundFrame
  }

  const handleMouseLeave = () => {
    setHoveredFrame(null)
    setHoveredFrameData(null)
    setMousePosition(null)
    handleMouseUp() // Stop any dragging when mouse leaves
    setIsDragging(false)
  }

  // Determine if we should use explicit height or auto-height mode
  const useExplicitHeight = typeof height === 'number'

  // Show error state if WebGL initialization failed
  if (initError) {
    return (
      <div
        ref={containerRef}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: useExplicitHeight ? (typeof height === 'number' ? `${height}px` : height) : '400px',
          position: 'relative',
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: textColor,
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>
          WebGL Initialization Failed
        </div>
        <div style={{ fontSize: '14px', opacity: 0.7, maxWidth: '400px' }}>
          {initError}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.5, marginTop: '10px' }}>
          This browser may not support WebGL or hardware acceleration is disabled.
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: useExplicitHeight ? (typeof height === 'number' ? `${height}px` : height) : (computedHeight !== null ? `${computedHeight}px` : undefined),
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
          cursor: isDragging ? 'grabbing' : (canPan ? 'grab' : 'pointer'),
          touchAction: zoomOnScroll ? 'none' : 'auto', // Prevent touch scrolling
          overscrollBehavior: zoomOnScroll ? 'none' : 'auto' // Prevent overscroll
        }}
      />

      {/* Tooltip */}
      {hoveredFrameData && mousePosition && (
        <FlameGraphTooltip
          frameData={hoveredFrameData}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
          fontFamily={fontFamily}
        />
      )}
    </div>
  )
})

FlameGraph.displayName = 'FlameGraph'
