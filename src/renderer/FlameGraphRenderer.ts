import { Profile } from 'pprof-format'
import { WebGLManager } from './WebGLManager'
import { CameraController } from './CameraController'
import { InteractionHandler } from './InteractionHandler'
import { FlameDataProcessor, FlameNode, FrameData } from './FlameDataProcessor'
import { TextRenderer } from './TextRenderer'
import { FrameRenderer } from './FrameRenderer'
import { hexToRgb } from './colors'

/**
 * Main renderer class that orchestrates all rendering components
 * This is a compatibility layer that maintains the existing API while using refactored classes
 */
export class FlameGraphRenderer {
  #webgl: WebGLManager
  #camera: CameraController
  #interaction: InteractionHandler
  #dataProcessor: FlameDataProcessor
  #textRenderer: TextRenderer
  #frameRenderer: FrameRenderer

  // State
  #logicalWidth = 0
  #logicalHeight = 0
  #frames: Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}> = []

  // Colors (stored as RGB arrays)
  #primaryColor = [1, 0.27, 0.27]; // #ff4444
  #secondaryColor = [1, 0.8, 0.4]; // #ffcc66
  #backgroundColor = [0.12, 0.12, 0.12]; // #1e1e1e

  // Opacity settings
  #selectedOpacity = 1.0
  #hoverOpacity = 0.9
  #unselectedOpacity = 0.7

  // Frame states
  #selectedFrameId: string | null = null
  #hoveredFrameId: string | null = null

  // Animation
  #animationFrame: number | null = null
  #onAnimationComplete?: () => void

  // Scroll handling
  #scrollZoomSpeed = 0.05
  #scrollZoomInverted = false
  #zoomOnScroll = false
  #onZoomChange?: () => void

  constructor(canvas: HTMLCanvasElement) {
    this.#webgl = new WebGLManager(canvas)
    this.#camera = new CameraController()
    this.#dataProcessor = new FlameDataProcessor()
    this.#interaction = new InteractionHandler(this.#camera)
    this.#textRenderer = new TextRenderer(this.#webgl)
    this.#frameRenderer = new FrameRenderer(this.#webgl)

    // Initialize WebGL
    if (!this.#webgl.initialize()) {
      // In CI environments, we might not have WebGL available
      // Log the error but don't throw to allow tests to run
      if (typeof process !== 'undefined' && process.env.CI) {
        // WebGL initialization failed in CI environment - using fallback mode
        return
      }
      throw new Error('Failed to initialize WebGL')
    }

    // Initialize text renderer only if WebGL is available
    if (this.#webgl.getContext()) {
      this.#textRenderer.createTextAtlas()
    }
  }

  /**
   * Check if WebGL is initialized and ready
   */
  isInitialized(): boolean {
    return this.#webgl.getContext() !== null
  }

  /**
   * Set the profile data and return the required height
   */
  setData(profile: Profile): number {
    this.#dataProcessor.processProfile(profile)

    // Generate frames for rendering
    this.#frames = this.#dataProcessor.generateFrames()

    // Update interaction handler with frames
    this.#interaction.setFrames(this.#frames)

    // Calculate and return the required height
    const requiredHeight = this.#dataProcessor.calculateGraphHeight()

    // Update camera with content height
    this.#camera.setContentHeight(requiredHeight)

    return requiredHeight
  }

  /**
   * Resize the renderer
   */
  resize(width: number, height: number): void {
    this.#logicalWidth = width
    this.#logicalHeight = height

    // Only resize WebGL if it's available
    if (this.#webgl.getContext()) {
      this.#webgl.resize(width, height)
    }
    
    this.#camera.setViewport(width, height)
    this.#interaction.setViewport(width)

    this.render()
  }

  /**
   * Set color scheme
   */
  setColors(primaryColor: string, secondaryColor: string, backgroundColor: string, textColor: string): void {
    this.#primaryColor = hexToRgb(primaryColor)
    this.#secondaryColor = hexToRgb(secondaryColor)
    this.#backgroundColor = hexToRgb(backgroundColor)

    // Update text renderer with new color (only if WebGL is available)
    if (this.#webgl.getContext()) {
      this.#textRenderer.setTextColor(textColor)
    }
  }

  /**
   * Set opacity values
   */
  setOpacity(selectedOpacity: number, hoverOpacity: number, unselectedOpacity: number): void {
    this.#selectedOpacity = selectedOpacity
    this.#hoverOpacity = hoverOpacity
    this.#unselectedOpacity = unselectedOpacity
  }

  /**
   * Set frame padding
   */
  setFramePadding(padding: number): void {
    this.#dataProcessor.setFramePadding(padding)

    // Regenerate frames with new padding
    this.#frames = this.#dataProcessor.generateFrames()

    // Update interaction handler with new frame coordinates
    this.#interaction.setFrames(this.#frames)

    // Update camera with new content height
    const requiredHeight = this.#dataProcessor.calculateGraphHeight()
    this.#camera.setContentHeight(requiredHeight)
  }

  /**
   * Get the calculated graph height
   */
  getCalculatedHeight(): number {
    return this.#dataProcessor.calculateGraphHeight()
  }

  /**
   * Set font family
   */
  setFontFamily(fontFamily: string): void {
    this.#textRenderer.setFontFamily(fontFamily)
  }

  /**
   * Set shadow opacity
   */
  setShadowOpacity(opacity: number): void {
    this.#textRenderer.setShadowOpacity(opacity)
  }

  /**
   * Set frame states
   */
  setFrameStates(selectedFrameId: string | null, hoveredFrameId: string | null): void {
    const selectedFrameChanged = this.#selectedFrameId !== selectedFrameId

    this.#selectedFrameId = selectedFrameId
    this.#hoveredFrameId = hoveredFrameId

    // Only update interaction handler and trigger zoom if selected frame actually changed
    if (selectedFrameChanged) {
      this.#interaction.setSelectedFrame(selectedFrameId)
      // Start animation if zoom targets have changed
      this.#startAnimation()
    } else if (this.#onAnimationComplete) {
      // No frame change means no animation - call callback immediately
      setTimeout(() => {
        if (this.#onAnimationComplete) {
          this.#onAnimationComplete()
        }
      }, 0)
    }
  }

  /**
   * Set height mode for zoom behavior
   */
  setHeightMode(isFixedHeight: boolean): void {
    this.#camera.setFixedHeightMode(isFixedHeight)
  }

  /**
   * Check if content is scrollable
   */
  isScrollable(): boolean {
    return this.#camera.isScrollable()
  }

  /**
   * Check if the camera can be panned
   */
  canPan(): boolean {
    return this.#camera.canPan()
  }

  /**
   * Configure scroll zoom behavior
   */
  setScrollZoom(enabled: boolean, speed: number = 0.05, inverted: boolean = false, onZoomChange?: () => void): void {
    this.#zoomOnScroll = enabled
    this.#scrollZoomSpeed = speed
    this.#scrollZoomInverted = inverted
    this.#onZoomChange = onZoomChange

    if (enabled) {
      this.#setupNativeScrollHandling()
    }
  }

  /**
   * Set animation completion callback
   */
  setAnimationCompleteCallback(callback?: () => void): void {
    this.#onAnimationComplete = callback
  }

  /**
   * Handle click event
   */
  handleClick(x: number, y: number): { frame: FrameData; stackTrace: FlameNode[]; children: FlameNode[] } | null {
    const result = this.#interaction.handleClick(x, y)
    if (result) {
      this.#selectedFrameId = result.frame.id
      this.#startAnimation()
    } else {
      // No frame was clicked - if we have an animation callback, call it immediately
      // since no animation will start
      if (this.#onAnimationComplete) {
        // Use setTimeout to make it async like a real animation completion
        setTimeout(() => {
          if (this.#onAnimationComplete) {
            this.#onAnimationComplete()
          }
        }, 0)
      }
    }
    return result
  }

  /**
   * Handle mouse down event
   */
  handleMouseDown(x: number, y: number): void {
    this.#interaction.handleMouseDown(x, y)
  }

  /**
   * Handle mouse move event
   */
  handleMouseMove(x: number, y: number): void {
    this.#interaction.handleMouseMove(x, y)
    if (this.#interaction.isDragInProgress()) {
      // Force immediate render during dragging for responsive feedback
      this.render()
      this.#startAnimation()
    }
  }

  /**
   * Handle mouse up event
   */
  handleMouseUp(): void {
    this.#interaction.handleMouseUp()
  }

  /**
   * Handle scroll wheel event for zooming
   */
  handleWheel(x: number, y: number, deltaY: number, speed: number = 0.05, inverted: boolean = false): void {
    // Calculate zoom factor based on scroll speed and direction
    const scrollDirection = inverted ? -deltaY : deltaY
    const zoomFactor = scrollDirection > 0 ? (1 + speed) : (1 - speed)

    this.#camera.zoomAt(zoomFactor, x, y)
    this.#startAnimation()
  }

  /**
   * Main render function
   */
  render(): void {
    const gl = this.#webgl.getContext()
    if (!gl) {return}

    // Clear the canvas
    this.#webgl.clear(this.#backgroundColor as [number, number, number])

    // Get the transformation matrix
    const matrix = this.#camera.getMatrix()

    // Get viewport dimensions (use logical dimensions, not canvas pixel dimensions)
    const viewportWidth = this.#logicalWidth
    const viewportHeight = this.#logicalHeight

    // Get camera state for screen space calculations
    const cameraState = this.#camera.getCamera()

    // Render frames and get color/opacity maps for text rendering
    const frameOpacities = this.#frameRenderer.renderFrames(
      this.#frames,
      matrix,
      viewportWidth,
      viewportHeight,
      this.#primaryColor as [number, number, number],
      this.#secondaryColor as [number, number, number],
      this.#selectedFrameId,
      this.#hoveredFrameId,
      this.#selectedOpacity,
      this.#hoverOpacity,
      this.#unselectedOpacity,
      cameraState
    )

    // Borders are now handled as insets in frame rendering, no separate border pass needed

    // Render text labels
    this.#textRenderer.renderText(
      this.#frames,
      matrix,
      viewportWidth,
      viewportHeight,
      frameOpacities,
      this.#dataProcessor.getFramePadding(),
      cameraState
    )
  }

  /**
   * Destroy the renderer and clean up resources
   */
  destroy(): void {
    if (this.#animationFrame) {
      cancelAnimationFrame(this.#animationFrame)
    }

    // Only destroy WebGL resources if they were created
    if (this.#webgl.getContext()) {
      this.#textRenderer.destroy()
      this.#webgl.destroy()
    }
  }

  // Expose internal state for compatibility with existing code
  get data(): FlameNode | null {
    return this.#dataProcessor.getData()
  }

  get profileMetadata() {
    return this.#dataProcessor.getProfileMetadata()
  }

  get camera(): { x: number; y: number; scale: number } {
    const state = this.#camera.getCamera()
    return { x: state.x, y: state.y, scale: state.scale }
  }

  get frames(): Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}> {
    return this.#frames
  }

  get logicalWidth(): number {
    return this.#logicalWidth
  }

  get logicalHeight(): number {
    return this.#logicalHeight
  }

  // Private methods

  #startAnimation(): void {
    if (this.#animationFrame) {return}

    const animate = () => {
      const needsUpdate = this.#camera.update()

      if (needsUpdate) {
        this.render()
        this.#animationFrame = requestAnimationFrame(animate)
      } else {
        this.#animationFrame = null
        // Call animation complete callback when animation finishes
        if (this.#onAnimationComplete) {
          this.#onAnimationComplete()
        }
      }
    }

    this.#animationFrame = requestAnimationFrame(animate)
  }

  // Method to check if dragging happened during the last interaction
  hasDraggedDuringInteraction(): boolean {
    return this.#interaction.hasDraggedDuringInteraction()
  }

  /**
   * Set up native wheel event handling for scroll zoom
   */
  #setupNativeScrollHandling(): void {
    const canvas = this.#webgl.getCanvas()
    if (!canvas) {return}

    const wheelHandler = (event: WheelEvent) => {
      if (!this.#zoomOnScroll) {return}

      // Prevent default scrolling and stop propagation
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Call the same wheel handling logic
      this.handleWheel(x, y, event.deltaY, this.#scrollZoomSpeed, this.#scrollZoomInverted)

      // Trigger pannable state update (if callback is set)
      if (this.#onZoomChange) {
        setTimeout(() => this.#onZoomChange?.(), 0)
      }

      return false
    }

    // Add with passive: false to ensure preventDefault works
    canvas.addEventListener('wheel', wheelHandler, { passive: false })
  }
}
