import { CameraController } from './CameraController.js'
import { FlameNode, FrameData } from './FlameDataProcessor.js'

interface InteractionFrame {
  node: FlameNode
  x1: number
  x2: number
  y1: number
  y2: number
}

/**
 * Handles mouse interactions, click detection, and drag operations
 */
export class InteractionHandler {
  #isDragging = false
  #hasDragged = false
  #dragStartX = 0
  #dragStartY = 0
  #lastMouseX = 0
  #lastMouseY = 0
  readonly #dragThreshold = 5; // pixels of movement before considering it a drag

  #cameraController: CameraController
  #frames: InteractionFrame[] = []
  #logicalWidth = 0
  #selectedFrameId: string | null = null

  constructor(cameraController: CameraController) {
    this.#cameraController = cameraController
  }

  /**
   * Set the viewport dimensions
   */
  setViewport(width: number): void {
    this.#logicalWidth = width
  }

  /**
   * Set the frames for interaction
   */
  setFrames(frames: InteractionFrame[]): void {
    this.#frames = frames
  }

  /**
   * Set the selected frame ID
   */
  setSelectedFrame(frameId: string | null, triggerZoom: boolean = true): void {
    this.#selectedFrameId = frameId

    // Only trigger zoom if requested (to avoid conflicts with click handler)
    if (triggerZoom) {
      if (frameId === null) {
        // If no frame is selected, zoom out to root
        this.#cameraController.resetZoom()
      } else {
        // Find and zoom to the selected frame
        const frameData = this.#frames.find(f => f.node.id === frameId)
        if (frameData) {
          const frameX1 = frameData.x1 * this.#logicalWidth
          const frameX2 = frameData.x2 * this.#logicalWidth
          this.#cameraController.zoomToFrame(frameX1, frameX2)
        }
      }
    }
  }

  /**
   * Handle mouse down event
   */
  handleMouseDown(x: number, y: number): void {
    this.#isDragging = true
    this.#hasDragged = false
    this.#dragStartX = x
    this.#dragStartY = y
    this.#lastMouseX = x
    this.#lastMouseY = y
  }

  /**
   * Handle mouse move event
   */
  handleMouseMove(x: number, y: number): void {
    if (!this.#isDragging) {return}

    const deltaX = x - this.#lastMouseX
    const deltaY = y - this.#lastMouseY

    // Check if we've moved enough to consider this a drag
    if (!this.#hasDragged) {
      const totalDistance = Math.sqrt(
        Math.pow(x - this.#dragStartX, 2) + Math.pow(y - this.#dragStartY, 2)
      )
      if (totalDistance > this.#dragThreshold) {
        this.#hasDragged = true
      }
    }

    // Apply camera movement if dragging
    if (this.#hasDragged) {
      this.#cameraController.pan(deltaX, deltaY)
    }

    this.#lastMouseX = x
    this.#lastMouseY = y
  }

  /**
   * Handle mouse up event
   */
  handleMouseUp(): void {
    this.#isDragging = false
    // Don't reset #hasDragged here - let the click handler check it and reset it
  }

  /**
   * Handle click event
   */
  handleClick(x: number, y: number): { frame: FrameData; stackTrace: FlameNode[]; children: FlameNode[] } | null {
    // Check if this was actually a drag by measuring distance from start
    const totalDistance = Math.sqrt(
      Math.pow(x - this.#dragStartX, 2) + Math.pow(y - this.#dragStartY, 2)
    )

    // Don't process click if user dragged (either flag was set or distance exceeds threshold)
    if (this.#hasDragged || totalDistance > this.#dragThreshold) {
      this.#hasDragged = false
      return null
    }

    // Convert screen coordinates to world coordinates
    const { x: worldX, y: worldY } = this.#cameraController.screenToWorld(x, y)

    // Find clicked frame
    let clickedFrame: FlameNode | null = null
    let maxDepth = -1

    // Find the deepest (highest depth) frame that contains the click point
    for (const frame of this.#frames) {
      // frame.x1/x2 are normalized (0-1), convert to viewport coordinates
      const frameX1 = frame.x1 * this.#logicalWidth
      const frameX2 = frame.x2 * this.#logicalWidth

      if (worldX >= frameX1 && worldX <= frameX2 &&
          worldY >= frame.y1 && worldY <= frame.y2) {
        // Choose the frame with the highest depth (most specific)
        if (frame.node.depth > maxDepth) {
          maxDepth = frame.node.depth
          clickedFrame = frame.node
        }
      }
    }

    if (clickedFrame) {
      // If clicking the already selected frame, zoom out to root
      if (this.#selectedFrameId === clickedFrame.id) {
        this.#cameraController.resetZoom()
        this.setSelectedFrame(null, false); // Don't trigger zoom, we already did it
        return null
      }

      // Zoom to the clicked frame
      this.setSelectedFrame(clickedFrame.id, false); // Don't trigger zoom, we'll do it manually

      // Find frame bounds for zooming
      const frameData = this.#frames.find(f => f.node.id === clickedFrame!.id)
      if (frameData) {
        const frameX1 = frameData.x1 * this.#logicalWidth
        const frameX2 = frameData.x2 * this.#logicalWidth
        this.#cameraController.zoomToFrame(frameX1, frameX2)
      }

      const stackTrace = this.#getStackTrace(clickedFrame.id)
      const children = this.#getFrameChildren(clickedFrame.id)

      return {
        frame: {
          id: clickedFrame.id,
          name: clickedFrame.name,
          value: clickedFrame.value,
          selfValue: clickedFrame.selfValue,
          depth: clickedFrame.depth,
          x: clickedFrame.x,
          width: clickedFrame.width,
          selfWidth: clickedFrame.selfWidth,
          functionName: clickedFrame.name,
          fileName: clickedFrame.fileName,
          lineNumber: clickedFrame.lineNumber,
          totalValue: this.#calculateTotalValue(clickedFrame)
        },
        stackTrace,
        children
      }
    }

    // Clicked on empty space - reset zoom
    this.#cameraController.resetZoom()
    this.#selectedFrameId = null
    return null
  }

  /**
   * Check if currently dragging
   */
  isDragInProgress(): boolean {
    return this.#isDragging && this.#hasDragged
  }

  /**
   * Check if dragging has occurred since the last mouse down
   */
  hasDraggedDuringInteraction(): boolean {
    return this.#hasDragged
  }

  /**
   * Get the selected frame ID
   */
  getSelectedFrameId(): string | null {
    return this.#selectedFrameId
  }

  /**
   * Get stack trace for a frame
   */
  #getStackTrace(frameId: string): FlameNode[] {
    const frame = this.#findFrameById(frameId)
    if (!frame) {return []}

    const stack: FlameNode[] = []
    let current: FlameNode | undefined = frame

    while (current) {
      stack.unshift(current)
      current = current.parent
    }

    return stack
  }

  /**
   * Get children of a frame
   */
  #getFrameChildren(frameId: string): FlameNode[] {
    const frame = this.#findFrameById(frameId)
    return frame ? frame.children : []
  }

  /**
   * Find a frame by ID
   */
  #findFrameById(id: string): FlameNode | null {
    for (const frame of this.#frames) {
      const found = this.#searchFrameTree(frame.node, id)
      if (found) {return found}
    }
    return null
  }

  /**
   * Search for a frame in the tree
   */
  #searchFrameTree(node: FlameNode, id: string): FlameNode | null {
    if (node.id === id) {return node}

    for (const child of node.children) {
      const found = this.#searchFrameTree(child, id)
      if (found) {return found}
    }

    return null
  }

  /**
   * Calculate total value for a frame and its children
   */
  #calculateTotalValue(frame: FlameNode): number {
    let total = frame.value
    for (const child of frame.children) {
      total += this.#calculateTotalValue(child)
    }
    return total
  }
}
