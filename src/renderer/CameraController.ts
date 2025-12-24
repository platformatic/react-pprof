import { mat3 } from 'gl-matrix'

interface CameraState {
  x: number
  y: number
  scale: number
  targetX: number
  targetY: number
  targetScale: number
}

/**
 * Manages camera transformations, zoom, and pan operations for flame graph
 *
 * Core principles:
 * - Horizontal scaling only (vertical scale always 1)
 * - Root frame always at least viewport width (min scale = 1)
 * - Selected frame centers in viewport and fills viewport width
 * - Proper bounds enforcement
 */
export class CameraController {
  #camera: CameraState = {
    x: 0,
    y: 0,
    scale: 1,
    targetX: 0,
    targetY: 0,
    targetScale: 1
  }

  #viewportWidth: number = 0
  #viewportHeight: number = 0
  #contentHeight: number = 0
  #isFixedHeight: boolean = false

  /**
   * Set the viewport dimensions
   */
  setViewport(width: number, height: number): void {
    this.#viewportWidth = width
    this.#viewportHeight = height
  }

  /**
   * Set whether we're in fixed height mode (draggable) or auto-height mode
   */
  setFixedHeightMode(isFixed: boolean): void {
    this.#isFixedHeight = isFixed
  }

  /**
   * Set the total content height
   */
  setContentHeight(height: number): void {
    this.#contentHeight = height
  }

  /**
   * Get the current camera state
   */
  getCamera(): CameraState {
    return { ...this.#camera }
  }

  /**
   * Get the transformation matrix for rendering
   * Only horizontal scaling applied, vertical scale always 1
   */
  getMatrix(): mat3 {
    // Simple screen space to clip space conversion matrix
    // No camera transformations here - we'll apply those directly to coordinates
    const matrix = mat3.fromValues(
      2 / this.#viewportWidth,  0,  0,
      0,  -2 / this.#viewportHeight,  0,
      -1,  1,  1
    )

    return matrix
  }

  /**
   * Check if vertical scrolling is needed
   */
  isScrollable(): boolean {
    return this.#contentHeight > this.#viewportHeight
  }

  /**
   * Check if the camera can be panned (for UI cursor changes)
   */
  canPan(): boolean {
    return this.#canPan()
  }

  /**
   * Zoom to a specific frame
   * Frame will fill viewport width and be centered
   */
  zoomToFrame(frameX1: number, frameX2: number): void {
    const frameWidth = frameX2 - frameX1
    const frameCenter = (frameX1 + frameX2) / 2


    // Scale so selected frame fills exactly the viewport width
    this.#camera.targetScale = this.#viewportWidth / frameWidth

    // Enforce minimum scale (root frame can't be narrower than viewport)
    this.#camera.targetScale = Math.max(1, this.#camera.targetScale)

    // Center the frame in the viewport
    const viewportCenter = this.#viewportWidth / 2
    this.#camera.targetX = viewportCenter - (frameCenter * this.#camera.targetScale)
    this.#camera.targetY = 0 // Always keep vertical position at 0 (horizontal scaling only)

    // Apply bounds
    this.#applyBounds()
  }

  /**
   * Reset zoom to show full graph
   */
  resetZoom(): void {
    this.#camera.targetX = 0
    this.#camera.targetY = 0
    this.#camera.targetScale = 1
    this.#applyBounds()
  }

  /**
   * Zoom in/out by a factor at a specific point
   */
  zoomAt(zoomFactor: number, centerX: number, centerY: number): void {
    // Calculate new scale
    const newScale = Math.max(1, this.#camera.targetScale * zoomFactor)

    if (newScale === this.#camera.targetScale) {
      return; // No change needed
    }

    // Get current world position of the zoom center
    const worldCenter = this.screenToWorld(centerX, centerY)

    // Update scale
    this.#camera.targetScale = newScale

    // Adjust position so the zoom center stays in the same place
    this.#camera.targetX = centerX - (worldCenter.x * this.#camera.targetScale)
    this.#camera.targetY = centerY - worldCenter.y

    // Apply bounds
    this.#applyBounds()
  }

  /**
   * Pan the camera by the given deltas
   */
  pan(deltaX: number, deltaY: number): void {
    // Calculate what the new position would be
    const newX = this.#camera.x + deltaX
    const newY = this.#camera.y + deltaY

    // Apply bounds constraints to the new position
    const constrainedPosition = this.#calculateBoundedPosition(newX, newY)

    // Update camera position to the constrained position
    this.#camera.x = constrainedPosition.x
    this.#camera.y = constrainedPosition.y

    // Set targets to match current position (stops animation pull)
    this.#camera.targetX = this.#camera.x
    this.#camera.targetY = this.#camera.y
  }

  /**
   * Scroll the camera vertically (for mouse wheel scrolling)
   * Only works in fixed height mode when content is scrollable
   */
  scroll(deltaY: number): void {
    // Only allow scrolling in fixed height mode when content is scrollable
    if (!this.#isFixedHeight || !this.isScrollable()) {
      return
    }

    // Calculate new vertical position
    const newY = this.#camera.y - deltaY

    // Apply bounds constraints
    const constrainedPosition = this.#calculateBoundedPosition(this.#camera.x, newY)

    // Update camera position
    this.#camera.y = constrainedPosition.y
    this.#camera.targetY = this.#camera.y
  }

  /**
   * Update camera animation (call each frame)
   */
  update(): boolean {
    const lerp = 0.15
    let changed = false

    const oldX = this.#camera.x
    const oldY = this.#camera.y
    const oldScale = this.#camera.scale

    this.#camera.x += (this.#camera.targetX - this.#camera.x) * lerp
    this.#camera.y += (this.#camera.targetY - this.#camera.y) * lerp
    this.#camera.scale += (this.#camera.targetScale - this.#camera.scale) * lerp

    // Check if animation is still happening
    if (Math.abs(this.#camera.x - oldX) > 0.1 ||
        Math.abs(this.#camera.y - oldY) > 0.1 ||
        Math.abs(this.#camera.scale - oldScale) > 0.001) {
      changed = true
    }

    // Snap to target when close enough
    if (Math.abs(this.#camera.x - this.#camera.targetX) < 0.5) {
      this.#camera.x = this.#camera.targetX
    }
    if (Math.abs(this.#camera.y - this.#camera.targetY) < 0.5) {
      this.#camera.y = this.#camera.targetY
    }
    if (Math.abs(this.#camera.scale - this.#camera.targetScale) < 0.01) {
      this.#camera.scale = this.#camera.targetScale
    }

    return changed
  }

  /**
   * Convert screen coordinates to world coordinates
   */
  screenToWorld(screenX: number, screenY: number): { x: number; y: number } {
    const worldX = (screenX - this.#camera.x) / this.#camera.scale
    const worldY = screenY - this.#camera.y

    return { x: worldX, y: worldY }
  }

  /**
   * Check if panning should be allowed based on current zoom and content size
   */
  #canPan(): boolean {
    // Check if horizontal panning is possible (when zoomed in)
    const canPanHorizontally = this.#camera.scale > 1

    // Check if vertical panning is possible (in fixed height mode when content is scrollable)
    const canPanVertically = this.#isFixedHeight && this.isScrollable()

    // Allow panning if either direction is pannable
    return canPanHorizontally || canPanVertically
  }

  /**
   * Calculate bounded position given desired x, y coordinates
   */
  #calculateBoundedPosition(desiredX: number, desiredY: number): { x: number; y: number } {
    let boundedX = desiredX
    let boundedY = desiredY

    // Horizontal bounds
    const scaledContentWidth = this.#viewportWidth * this.#camera.scale

    if (this.#camera.scale > 1) {
      // When zoomed in: prevent root from moving beyond viewport edges
      const maxX = 0; // Left edge of root at left edge of viewport
      const minX = this.#viewportWidth - scaledContentWidth; // Right edge of root at right edge of viewport
      boundedX = Math.max(minX, Math.min(maxX, desiredX))
    } else {
      // When at minimum scale: center horizontally (no panning allowed)
      boundedX = 0
    }

    // Vertical bounds
    if (this.#isFixedHeight && this.isScrollable()) {
      // Fixed height mode with scrollable content - allow vertical panning within bounds
      const maxY = 0; // Top of content at top of viewport
      const minY = this.#viewportHeight - this.#contentHeight; // Bottom of content at bottom of viewport
      boundedY = Math.max(minY, Math.min(maxY, desiredY))
    } else {
      // Auto-height mode OR fixed height but not scrollable - no vertical panning
      boundedY = 0
    }

    return { x: boundedX, y: boundedY }
  }

  /**
   * Apply bounds to keep content properly positioned
   */
  #applyBounds(): void {
    // Enforce minimum scale (root frame at least viewport width)
    this.#camera.targetScale = Math.max(1, this.#camera.targetScale)

    // Use the bounded position calculation for target positions
    // We need to temporarily update the scale for bounds calculation
    const originalScale = this.#camera.scale
    this.#camera.scale = this.#camera.targetScale

    const boundedPosition = this.#calculateBoundedPosition(this.#camera.targetX, this.#camera.targetY)
    this.#camera.targetX = boundedPosition.x
    this.#camera.targetY = boundedPosition.y

    // Restore original scale
    this.#camera.scale = originalScale
  }

  /**
   * Set camera position immediately (no animation)
   */
  setImmediate(x: number, y: number, scale: number): void {
    this.#camera.x = this.#camera.targetX = x
    this.#camera.y = this.#camera.targetY = y
    this.#camera.scale = this.#camera.targetScale = scale
    this.#applyBounds()
  }
}
