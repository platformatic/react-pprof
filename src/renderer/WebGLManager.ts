import { getMainShaders, getTextShaders } from './shaders'

/**
 * Manages WebGL context, program creation, and shader compilation
 */
export class WebGLManager {
  #gl: WebGL2RenderingContext | null = null
  #canvas: HTMLCanvasElement
  #program: WebGLProgram | null = null
  #textProgram: WebGLProgram | null = null

  // Uniforms
  #matrixLocation: WebGLUniformLocation | null = null

  // Buffers
  #positionBuffer: WebGLBuffer | null = null
  #colorBuffer: WebGLBuffer | null = null

  // Text buffers
  #textPositionBuffer: WebGLBuffer | null = null
  #textTexCoordBuffer: WebGLBuffer | null = null
  #textColorBuffer: WebGLBuffer | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.#canvas = canvas
  }

  /**
   * Initialize WebGL context and create shader programs
   */
  initialize(): boolean {
    // Try WebGL2 first, fall back to WebGL1
    this.#gl = this.#canvas.getContext('webgl2') || this.#canvas.getContext('webgl') as WebGL2RenderingContext

    if (!this.#gl) {
      // eslint-disable-next-line no-console
      console.error('WebGL not supported')
      return false
    }

    const isWebGL2 = this.#gl instanceof WebGL2RenderingContext

    try {
      this.#createMainProgram(isWebGL2)
      this.#createTextProgram(isWebGL2)
      this.#createBuffers()
      return true
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to initialize WebGL:', error)
      return false
    }
  }

  /**
   * Get the WebGL context
   */
  getContext(): WebGL2RenderingContext | null {
    return this.#gl
  }

  /**
   * Get canvas element
   */
  getCanvas(): HTMLCanvasElement {
    return this.#canvas
  }

  /**
   * Get the main rendering program
   */
  getProgram(): WebGLProgram | null {
    return this.#program
  }

  /**
   * Get the text rendering program
   */
  getTextProgram(): WebGLProgram | null {
    return this.#textProgram
  }

  /**
   * Get uniform locations
   */
  getMatrixLocation(): WebGLUniformLocation | null {
    return this.#matrixLocation
  }

  /**
   * Get buffers for frame rendering
   */
  getFrameBuffers() {
    return {
      position: this.#positionBuffer,
      color: this.#colorBuffer
    }
  }

  /**
   * Get buffers for text rendering
   */
  getTextBuffers() {
    return {
      position: this.#textPositionBuffer,
      texCoord: this.#textTexCoordBuffer,
      color: this.#textColorBuffer
    }
  }

  /**
   * Resize the WebGL viewport
   */
  resize(width: number, height: number): void {
    if (!this.#gl) {return}

    const dpr = window.devicePixelRatio || 1
    this.#canvas.width = width * dpr
    this.#canvas.height = height * dpr
    this.#canvas.style.width = `${width}px`
    this.#canvas.style.height = `${height}px`

    this.#gl.viewport(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Clear the canvas
   */
  clear(backgroundColor: [number, number, number]): void {
    if (!this.#gl) {return}

    this.#gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], 1.0)
    this.#gl.clear(this.#gl.COLOR_BUFFER_BIT)
  }

  /**
   * Set up blending for transparency
   */
  enableBlending(): void {
    if (!this.#gl) {return}

    this.#gl.enable(this.#gl.BLEND)
    this.#gl.blendFunc(this.#gl.SRC_ALPHA, this.#gl.ONE_MINUS_SRC_ALPHA)
  }

  /**
   * Cleanup WebGL resources
   */
  destroy(): void {
    if (!this.#gl) {return}

    // Delete programs
    if (this.#program) {
      this.#gl.deleteProgram(this.#program)
      this.#program = null
    }
    if (this.#textProgram) {
      this.#gl.deleteProgram(this.#textProgram)
      this.#textProgram = null
    }

    // Delete buffers
    if (this.#positionBuffer) {this.#gl.deleteBuffer(this.#positionBuffer)}
    if (this.#colorBuffer) {this.#gl.deleteBuffer(this.#colorBuffer)}
    if (this.#textPositionBuffer) {this.#gl.deleteBuffer(this.#textPositionBuffer)}
    if (this.#textTexCoordBuffer) {this.#gl.deleteBuffer(this.#textTexCoordBuffer)}
    if (this.#textColorBuffer) {this.#gl.deleteBuffer(this.#textColorBuffer)}

    this.#gl = null
  }

  #createMainProgram(isWebGL2: boolean): void {
    if (!this.#gl) {return}

    const { vertex: vertexShaderSource, fragment: fragmentShaderSource } = getMainShaders(isWebGL2)

    const vertexShader = this.#createShader(this.#gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = this.#createShader(this.#gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to create shaders.')
    }

    this.#program = this.#gl.createProgram()
    if (!this.#program) {
      throw new Error('Failed to create WebGL program')
    }

    this.#gl.attachShader(this.#program, vertexShader)
    this.#gl.attachShader(this.#program, fragmentShader)
    this.#gl.linkProgram(this.#program)

    if (!this.#gl.getProgramParameter(this.#program, this.#gl.LINK_STATUS)) {
      const error = this.#gl.getProgramInfoLog(this.#program)
      this.#gl.deleteProgram(this.#program)
      throw new Error('Failed to link WebGL program: ' + error)
    }

    // Get uniform locations
    this.#matrixLocation = this.#gl.getUniformLocation(this.#program, 'u_matrix')

    // Clean up shaders
    this.#gl.deleteShader(vertexShader)
    this.#gl.deleteShader(fragmentShader)
  }

  #createTextProgram(isWebGL2: boolean): void {
    if (!this.#gl) {return}

    const { vertex: vertexShaderSource, fragment: fragmentShaderSource } = getTextShaders(isWebGL2)

    const vertexShader = this.#createShader(this.#gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = this.#createShader(this.#gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) {
      throw new Error('Failed to create text shaders')
    }

    this.#textProgram = this.#gl.createProgram()
    if (!this.#textProgram) {
      throw new Error('Failed to create text program')
    }

    this.#gl.attachShader(this.#textProgram, vertexShader)
    this.#gl.attachShader(this.#textProgram, fragmentShader)
    this.#gl.linkProgram(this.#textProgram)

    if (!this.#gl.getProgramParameter(this.#textProgram, this.#gl.LINK_STATUS)) {
      const error = this.#gl.getProgramInfoLog(this.#textProgram)
      this.#gl.deleteProgram(this.#textProgram)
      throw new Error('Failed to link text program: ' + error)
    }

    // Clean up shaders
    this.#gl.deleteShader(vertexShader)
    this.#gl.deleteShader(fragmentShader)
  }

  #createShader(type: number, source: string): WebGLShader | null {
    if (!this.#gl) {return null}

    const shader = this.#gl.createShader(type)
    if (!shader) {return null}

    this.#gl.shaderSource(shader, source)
    this.#gl.compileShader(shader)

    if (!this.#gl.getShaderParameter(shader, this.#gl.COMPILE_STATUS)) {
      this.#gl.deleteShader(shader)
      throw new Error(`Shader compilation error: ${this.#gl.getShaderInfoLog(shader)}`)
    }

    return shader
  }

  #createBuffers(): void {
    if (!this.#gl) {return}

    // Frame rendering buffers
    this.#positionBuffer = this.#gl.createBuffer()
    this.#colorBuffer = this.#gl.createBuffer()

    // Text rendering buffers
    this.#textPositionBuffer = this.#gl.createBuffer()
    this.#textTexCoordBuffer = this.#gl.createBuffer()
    this.#textColorBuffer = this.#gl.createBuffer()
  }
}
