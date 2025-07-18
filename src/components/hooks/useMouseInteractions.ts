import { useState, useCallback } from 'react'
import { FlameGraphRenderer, FlameNode } from '../../renderer'

interface MouseInteractionCallbacks {
  onFrameClick?: (frame: any, stackTrace: FlameNode[], children: FlameNode[]) => void
  onZoomChange?: (zoomLevel: number) => void
}

interface MouseInteractionResult {
  handleClick: (event: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void
  handleMouseUp: () => void
  handleMouseLeave: () => void
  isDragging: boolean
  hoveredFrame: string | null
  selectedFrame: string | null
  mousePosition: { x: number; y: number } | null
  hoveredFrameData: FlameNode | null
}

/**
 * Custom hook for handling mouse interactions with the flame graph
 */
export function useMouseInteractions(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  rendererRef: React.RefObject<FlameGraphRenderer | null>,
  callbacks: MouseInteractionCallbacks,
  onScrollableChange: (scrollable: boolean) => void
): MouseInteractionResult {
  const [hoveredFrame, setHoveredFrame] = useState<string | null>(null)
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)
  const [hoveredFrameData, setHoveredFrameData] = useState<FlameNode | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const findFrameAtPosition = useCallback((x: number, y: number): FlameNode | null => {
    if (!rendererRef.current || !canvasRef.current) return null

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
  }, [rendererRef, canvasRef])

  const handleClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const result = rendererRef.current.handleClick(x, y)
    if (result) {
      setSelectedFrame(result.frame.id)
      if (callbacks.onFrameClick) {
        callbacks.onFrameClick(result.frame, result.stackTrace, result.children)
      }
      // Update scrollable state after zoom changes
      setTimeout(() => onScrollableChange(rendererRef.current!.isScrollable()), 100)
    } else {
      setSelectedFrame(null)
      // Update scrollable state after zoom reset
      setTimeout(() => onScrollableChange(rendererRef.current!.isScrollable()), 100)
    }
  }, [rendererRef, canvasRef, callbacks.onFrameClick, onScrollableChange])

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    rendererRef.current.handleMouseDown(x, y)
    setIsDragging(true)
  }, [rendererRef, canvasRef])

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!rendererRef.current || !canvasRef.current) return

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
  }, [rendererRef, canvasRef, findFrameAtPosition, hoveredFrame])

  const handleMouseUp = useCallback(() => {
    if (!rendererRef.current) return
    rendererRef.current.handleMouseUp()
    setIsDragging(false)
  }, [rendererRef])

  const handleMouseLeave = useCallback(() => {
    setHoveredFrame(null)
    setHoveredFrameData(null)
    setMousePosition(null)
    handleMouseUp(); // Stop any dragging when mouse leaves
    setIsDragging(false)
  }, [handleMouseUp])

  return {
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging,
    hoveredFrame,
    selectedFrame,
    mousePosition,
    hoveredFrameData
  }
}