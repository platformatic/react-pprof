import { useMemo } from 'react'
import { FlameNode } from '../../renderer'

interface TooltipPosition {
  left: number
  top: number
}

interface TooltipData {
  position: TooltipPosition
  frameData: FlameNode
}

interface UseTooltipResult {
  tooltipData: TooltipData | null
}

/**
 * Custom hook for managing tooltip positioning and data
 */
export function useTooltip(
  mousePosition: { x: number; y: number } | null,
  hoveredFrameData: FlameNode | null
): UseTooltipResult {
  const tooltipPosition = useMemo(() => {
    if (!mousePosition || !hoveredFrameData) {return null}

    const tooltipWidth = 250
    const tooltipHeight = 120
    const offset = 10

    // Get viewport dimensions
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Default position: bottom-right of cursor
    let left = mousePosition.x + offset
    let top = mousePosition.y + offset

    // Check if tooltip would overflow right edge
    if (left + tooltipWidth > viewportWidth) {
      left = mousePosition.x - tooltipWidth - offset; // Position to the left
    }

    // Check if tooltip would overflow bottom edge
    if (top + tooltipHeight > viewportHeight) {
      top = mousePosition.y - tooltipHeight - offset; // Position above cursor
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
  }, [mousePosition, hoveredFrameData])

  const tooltipData = useMemo(() => {
    if (!hoveredFrameData || !tooltipPosition) {return null}

    return {
      position: tooltipPosition,
      frameData: hoveredFrameData
    }
  }, [hoveredFrameData, tooltipPosition])

  return {
    tooltipData
  }
}