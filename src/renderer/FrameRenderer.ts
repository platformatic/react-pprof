import { mat3 } from 'gl-matrix'
import { WebGLManager } from './WebGLManager'
import { FlameNode } from './FlameDataProcessor'

/**
 * Handles rendering of flame graph frames with proper inset borders
 * 
 * Core principles:
 * - Frames touch edge-to-edge with no gaps
 * - Inset borders provide visual separation without affecting size
 * - Borders are rendered at constant 0.5px in screen space
 */
export class FrameRenderer {
  #webgl: WebGLManager

  constructor(webgl: WebGLManager) {
    this.#webgl = webgl
  }

  /**
   * Render all visible frames with proper colors and inset borders
   */
  renderFrames(
    frames: Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}>,
    matrix: mat3,
    logicalWidth: number,
    viewportWidth: number,
    viewportHeight: number,
    primaryColor: [number, number, number],
    secondaryColor: [number, number, number],
    selectedFrameId: string | null,
    hoveredFrameId: string | null,
    selectedOpacity: number,
    hoverOpacity: number,
    unselectedOpacity: number,
    maxDepth: number,
    rootValue: number,
    camera: { x: number; y: number; scale: number }
  ): { frameColors: Map<string, [number, number, number]>; frameOpacities: Map<string, number> } {
    const gl = this.#webgl.getContext()
    const frameProgram = this.#webgl.getProgram()
    
    
    if (!gl || !frameProgram || frames.length === 0) {
      return { frameColors: new Map(), frameOpacities: new Map() }
    }

    // Switch to frame shader program and clear any previous state
    gl.useProgram(frameProgram)
    
    // Disable all vertex attribute arrays first to ensure clean state
    for (let i = 0; i < 16; i++) {
      gl.disableVertexAttribArray(i)
    }

    // Set uniforms
    const matrixLocation = gl.getUniformLocation(frameProgram, 'u_matrix')
    gl.uniformMatrix3fv(matrixLocation, false, matrix)

    // Build vertex data
    const positions: number[] = []
    const colors: number[] = []
    
    // Track colors and opacities for text rendering
    const frameColors = new Map<string, [number, number, number]>()
    const frameOpacities = new Map<string, number>()

    // Calculate border inset for visual separation
    const borderInsetX = 0.5; // 0.5px border in screen space
    const borderInsetY = 0.5; // 0.5px border
    



    for (const frame of frames) {
      const { node, x1, x2, y1, y2 } = frame
      
      // Convert normalized coordinates to screen coordinates with camera applied
      const screenX1 = (x1 * viewportWidth * camera.scale) + camera.x
      const screenX2 = (x2 * viewportWidth * camera.scale) + camera.x
      const screenY1 = y1 + camera.y
      const screenY2 = y2 + camera.y
      
      // Simple culling - skip frames that are clearly outside viewport
      if (screenX2 < -50 || screenX1 > viewportWidth + 50) continue
      if (screenY2 < -50 || screenY1 > viewportHeight + 50) continue

      // Calculate frame color based on relative size within its depth level
      const color = this.#calculateFrameColor(
        node,
        frames,
        primaryColor,
        secondaryColor,
        maxDepth,
        rootValue
      )
      
      // Calculate opacity based on frame state
      let opacity = unselectedOpacity
      if (node.id === selectedFrameId) {
        opacity = selectedOpacity
      } else if (node.id === hoveredFrameId) {
        opacity = hoverOpacity
      }
      
      // Store for text rendering
      frameColors.set(node.id, color)
      frameOpacities.set(node.id, opacity)
      
      // Add frame rectangle vertices with inset border (using screen coordinates)
      // Frames fill edge-to-edge, but visual border is inset
      positions.push(
        screenX1 + borderInsetX, screenY1 + borderInsetY,
        screenX2 - borderInsetX, screenY1 + borderInsetY,
        screenX1 + borderInsetX, screenY2 - borderInsetY,
        screenX2 - borderInsetX, screenY1 + borderInsetY,
        screenX2 - borderInsetX, screenY2 - borderInsetY,
        screenX1 + borderInsetX, screenY2 - borderInsetY
      )
      
      // Add colors with opacity for each vertex
      for (let i = 0; i < 6; i++) {
        colors.push(color[0], color[1], color[2], opacity)
      }
    }

    if (positions.length === 0) {
      return { frameColors, frameOpacities }
    }

    // Get attribute locations first
    const positionLocation = gl.getAttribLocation(frameProgram, 'a_position')
    const colorLocation = gl.getAttribLocation(frameProgram, 'a_color')
    
    if (positionLocation < 0 || colorLocation < 0) {
      return { frameColors, frameOpacities }
    }

    // Create vertex buffers
    const positionBuffer = gl.createBuffer()
    const colorBuffer = gl.createBuffer()

    // Upload position data
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)
    
    // Upload color data  
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

    // Enable blending for alpha
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Bind position buffer and set up attribute RIGHT before drawing
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Bind color buffer and set up attribute RIGHT before drawing
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.enableVertexAttribArray(colorLocation)
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0)

    // Draw frames immediately
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2)

    // Clean up
    gl.disableVertexAttribArray(positionLocation)
    gl.disableVertexAttribArray(colorLocation)
    gl.deleteBuffer(positionBuffer)
    gl.deleteBuffer(colorBuffer)
    gl.disable(gl.BLEND)

    return { frameColors, frameOpacities }
  }

  /**
   * Calculate frame color based on relative size within the same depth level
   */
  #calculateFrameColor(
    node: FlameNode,
    allFrames: Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}>,
    primaryColor: [number, number, number],
    secondaryColor: [number, number, number],
    maxDepth: number,
    rootValue: number
  ): [number, number, number] {
    // Find all frames at the same depth level
    const framesAtSameDepth = allFrames.filter(frame => frame.node.depth === node.depth)
    
    if (framesAtSameDepth.length === 0) {
      return primaryColor
    }
    
    // Calculate total value at this depth level
    const totalValueAtDepth = framesAtSameDepth.reduce((sum, frame) => sum + frame.node.value, 0)
    
    // Calculate this frame's relative size within its depth level
    const relativeSize = totalValueAtDepth > 0 ? node.value / totalValueAtDepth : 0
    
    // Apply quadratic scale for better color differentiation
    // Square the ratio to emphasize differences - small ratios become even smaller
    const quadraticSize = relativeSize * relativeSize
    
    // Blend factor: large frames = 0 (primary), small frames = 1 (secondary)
    const blendFactor = 1 - quadraticSize
    
    // Interpolate between primary and secondary color based on relative size
    const color: [number, number, number] = [
      primaryColor[0] * (1 - blendFactor) + secondaryColor[0] * blendFactor,
      primaryColor[1] * (1 - blendFactor) + secondaryColor[1] * blendFactor,
      primaryColor[2] * (1 - blendFactor) + secondaryColor[2] * blendFactor
    ]
    
    return color
  }
}