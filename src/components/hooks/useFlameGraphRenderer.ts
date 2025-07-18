import { useRef, useEffect, useState } from 'react'
import { FlameGraphRenderer } from '../../renderer'
import { Profile } from '../../parser'

interface RendererConfig {
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
}

interface UseFlameGraphRendererResult {
  rendererRef: React.RefObject<FlameGraphRenderer | null>
  computedHeight: number | null
  isScrollable: boolean
  initialize: (canvas: HTMLCanvasElement, container: HTMLElement) => boolean
}

/**
 * Custom hook for managing FlameGraph renderer lifecycle and configuration
 */
export function useFlameGraphRenderer(config: RendererConfig): UseFlameGraphRendererResult {
  const rendererRef = useRef<FlameGraphRenderer | null>(null)
  const [computedHeight, setComputedHeight] = useState<number | null>(null)
  const [isScrollable, setIsScrollable] = useState(false)

  const {
    profile,
    width,
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
    framePadding = 2
  } = config

  const initialize = (canvas: HTMLCanvasElement, container: HTMLElement): boolean => {
    try {
      // Ensure canvas has valid dimensions before creating WebGL context
      const rect = container.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) {
        return false
      }

      const renderer = new FlameGraphRenderer(canvas)

      // Configure renderer
      renderer.setColors(primaryColor, secondaryColor, backgroundColor, textColor)
      renderer.setOpacity(selectedOpacity, hoverOpacity, unselectedOpacity)
      renderer.setFramePadding(framePadding)
      renderer.setFontFamily(fontFamily)
      renderer.setShadowOpacity(shadowOpacity)
      rendererRef.current = renderer

      // Set initial size
      if (typeof width === 'number' && typeof height === 'number') {
        renderer.resize(width, height)
      } else {
        renderer.resize(rect.width, rect.height)
      }

      // Set the data and render
      const requiredHeight = renderer.setData(profile)

      // Handle auto-height mode
      const useExplicitHeight = typeof height === 'number'
      if (!useExplicitHeight) {
        setComputedHeight(requiredHeight)
      } else {
        setComputedHeight(null)
      }

      // Check if content is scrollable
      setIsScrollable(renderer.isScrollable())

      // Set the root element as selected by default
      const internalData = (renderer as any).data
      if (internalData && internalData.children.length > 0) {
        // This would be handled by the parent component's frame state management
      }

      renderer.render()
      setIsScrollable(renderer.isScrollable())

      return true
    // eslint-disable-next-line no-unused-vars
    } catch (_) {
      // eslint-disable-next-line no-console
      console.warn('Failed to start flamegraph renderer')
      return false
    }
  }

  // Update renderer configuration when props change
  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setColors(primaryColor, secondaryColor, backgroundColor, textColor)
      rendererRef.current.render()
    }
  }, [primaryColor, secondaryColor, backgroundColor, textColor])

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

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setFramePadding(framePadding)
      rendererRef.current.render()
    }
  }, [framePadding])

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setOpacity(selectedOpacity, hoverOpacity, unselectedOpacity)
      rendererRef.current.render()
    }
  }, [selectedOpacity, hoverOpacity, unselectedOpacity])

  // Cleanup
  useEffect(() => {
    return () => {
      if (rendererRef.current) {
        rendererRef.current.destroy()
      }
    }
  }, [])

  return {
    rendererRef,
    computedHeight,
    isScrollable,
    initialize
  }
}
