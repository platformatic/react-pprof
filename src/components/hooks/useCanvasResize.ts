import { useEffect } from 'react'
import { FlameGraphRenderer } from '../../renderer'

interface ResizeConfig {
  width?: number | string
  height?: number | string
  computedHeight: number | null
  profile: any; // Profile dependency for re-initialization
}

/**
 * Custom hook for handling canvas resize operations
 */
export function useCanvasResize(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  rendererRef: React.RefObject<FlameGraphRenderer | null>,
  config: ResizeConfig,
  onScrollableChange: (scrollable: boolean) => void
): void {
  const { width, height, computedHeight, profile } = config

  useEffect(() => {
    // Only set up resize observer after renderer exists
    if (!canvasRef.current || !containerRef.current || !rendererRef.current || !profile) {
      return
    }

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

        // Update scrollable state after resize
        onScrollableChange(rendererRef.current!.isScrollable())
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

      // Update scrollable state after initial resize
      onScrollableChange(rendererRef.current.isScrollable())
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [width, height, profile, computedHeight])
}