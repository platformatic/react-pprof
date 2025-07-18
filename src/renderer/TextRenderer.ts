import { mat3 } from 'gl-matrix'
import { WebGLManager } from './WebGLManager'
import { FlameNode } from './FlameDataProcessor'

interface CharMetrics {
  x: number
  y: number
  width: number
  height: number
}

/**
 * Handles all text rendering for the flame graph
 *
 * Core principles:
 * - Text rendered in screen space coordinates (fixed size)
 * - Text anchored to left edge of frames with padding
 * - Text does not scale with horizontal zoom
 */
export class TextRenderer {
  #webgl: WebGLManager
  #textAtlasTexture: WebGLTexture | null = null
  #charMetrics: Map<string, CharMetrics> = new Map()
  #atlasWidth = 0
  #atlasHeight = 0
  #fontSize = 11
  #fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  #atlasScale = Math.max(2, window.devicePixelRatio)
  #textColor = '#ffffff'
  #shadowOpacity = 0.3

  constructor(webgl: WebGLManager) {
    this.#webgl = webgl
    // Create text atlas immediately
    this.createTextAtlas()
  }

  /**
   * Set the font family and recreate text atlas
   */
  setFontFamily(fontFamily: string): void {
    this.#fontFamily = fontFamily
    this.createTextAtlas()
  }

  /**
   * Set the text color and recreate text atlas
   */
  setTextColor(color: string): void {
    this.#textColor = color
    this.createTextAtlas()
  }

  /**
   * Set shadow opacity for text rendering
   */
  setShadowOpacity(opacity: number): void {
    this.#shadowOpacity = opacity
  }

  /**
   * Create a texture atlas containing all printable ASCII characters
   */
  createTextAtlas(): void {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fontSize = this.#fontSize * this.#atlasScale
    ctx.font = `${fontSize}px ${this.#fontFamily}`
    ctx.fillStyle = this.#textColor
    ctx.textBaseline = 'alphabetic'

    // Characters to include in atlas
    const chars = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

    // Measure character dimensions with proper font metrics
    const charWidths: number[] = []
    let maxCharWidth = 0

    // Get font metrics for proper character cell sizing
    const testMetrics = ctx.measureText('Mg'); // Use chars with ascender and descender
    const actualLineHeight = Math.ceil(testMetrics.actualBoundingBoxAscent + testMetrics.actualBoundingBoxDescent)
    const maxCharHeight = Math.max(fontSize, actualLineHeight + 4); // Add some padding

    for (const char of chars) {
      const metrics = ctx.measureText(char)
      const width = Math.ceil(metrics.width)
      charWidths.push(width)
      maxCharWidth = Math.max(maxCharWidth, width)
    }

    // Calculate atlas dimensions
    const charsPerRow = Math.ceil(Math.sqrt(chars.length))
    this.#atlasWidth = charsPerRow * maxCharWidth
    this.#atlasHeight = Math.ceil(chars.length / charsPerRow) * maxCharHeight

    // Set canvas size
    canvas.width = this.#atlasWidth
    canvas.height = this.#atlasHeight

    // Re-set font properties after canvas resize
    ctx.font = `${fontSize}px ${this.#fontFamily}`
    ctx.fillStyle = this.#textColor
    ctx.textBaseline = 'alphabetic'

    // Draw characters and store metrics
    this.#charMetrics.clear()
    let x = 0
    let y = 0
    let charIndex = 0

    // Calculate baseline position within each character cell (reuse existing testMetrics)
    const ascent = Math.ceil(testMetrics.actualBoundingBoxAscent || fontSize * 0.8)

    for (const char of chars) {
      const actualWidth = charWidths[charIndex]

      // Draw character at baseline position (leaving room for descenders)
      ctx.fillText(char, x, y + ascent)

      // Store both texture coordinates and actual character dimensions
      this.#charMetrics.set(char, {
        x: x / this.#atlasWidth,
        y: y / this.#atlasHeight,
        width: actualWidth / this.#atlasWidth,  // Actual character width for rendering
        height: maxCharHeight / this.#atlasHeight
      })

      // Move to next position using grid spacing
      x += maxCharWidth
      if (x + maxCharWidth > this.#atlasWidth) {
        x = 0
        y += maxCharHeight
      }
      charIndex++
    }

    // Create WebGL texture
    const gl = this.#webgl.getContext()
    if (!gl) return

    if (this.#textAtlasTexture) {
      gl.deleteTexture(this.#textAtlasTexture)
    }

    this.#textAtlasTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.#textAtlasTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  }

  /**
   * Render text for all visible frames in screen space coordinates
   */
  renderText(
    frames: Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}>,
    matrix: mat3,
    viewportWidth: number,
    viewportHeight: number,
    logicalWidth: number,
    frameColors: Map<string, [number, number, number]>,
    frameOpacities: Map<string, number>,
    framePadding: number = 2,
    camera: { x: number; y: number; scale: number }
  ): void {
    const gl = this.#webgl.getContext()
    const textProgram = this.#webgl.getTextProgram()

    if (!gl || !textProgram || !this.#textAtlasTexture || frames.length === 0) return

    // Switch to text shader program
    gl.useProgram(textProgram)

    // Bind text atlas texture
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.#textAtlasTexture)
    const textureLocation = gl.getUniformLocation(textProgram, 'u_texture')
    gl.uniform1i(textureLocation, 0)

    // Use the same matrix as frames since we're now in screen space
    const textMatrix = matrix

    // Set uniforms
    const matrixLocation = gl.getUniformLocation(textProgram, 'u_matrix')
    const textureSizeLocation = gl.getUniformLocation(textProgram, 'u_textureSize')
    const shadowOpacityLocation = gl.getUniformLocation(textProgram, 'u_shadowOpacity')

    gl.uniformMatrix3fv(matrixLocation, false, textMatrix)
    gl.uniform2f(textureSizeLocation, this.#atlasWidth, this.#atlasHeight)
    gl.uniform1f(shadowOpacityLocation, this.#shadowOpacity)

    // Build vertex data
    const positions: number[] = []
    const texCoords: number[] = []
    const colors: number[] = []

    const minFrameWidthForText = 16; // Minimum pixel width to show text (before padding)


    for (const frame of frames) {
      const { node, x1, x2, y1, y2 } = frame

      // Convert normalized coordinates to screen coordinates with camera applied
      const screenX1 = (x1 * viewportWidth * camera.scale) + camera.x
      const screenX2 = (x2 * viewportWidth * camera.scale) + camera.x
      const screenY1 = y1 + camera.y
      const screenY2 = y2 + camera.y
      const screenFrameWidth = screenX2 - screenX1
      const screenFrameHeight = screenY2 - screenY1

      // More permissive culling for text
      if (screenX2 < -100 || screenX1 > viewportWidth + 100) continue
      if (screenY2 < -100 || screenY1 > viewportHeight + 100) continue
      if (screenFrameWidth < minFrameWidthForText + framePadding * 2) continue
      if (screenFrameHeight < this.#fontSize + framePadding * 2) continue

      // Calculate text position in screen coordinates with padding on all edges
      // If frame overhangs left edge, position text at screen left edge + padding instead
      const textX = Math.max(framePadding, screenX1 + framePadding)
      const textY = screenY1 + framePadding + (screenFrameHeight - this.#fontSize - framePadding * 2) / 2

      // Adjust max text width based on actual text position
      const availableWidth = (screenX2 - Math.max(0, screenX1)) - framePadding
      const maxTextWidth = Math.max(0, availableWidth - framePadding)

      // Get text to render
      const text = this.truncateText(node.name, maxTextWidth)
      if (text.length === 0) continue

      // Get text color - use the configured text color
      const frameOpacity = frameOpacities.get(node.id) || 1
      const textColorRgb = this.#hexToRgb(this.#textColor)

      // Distance from right edge to fade text
      const fadeZoneWidth = 15; // pixels

      // Render shadow first (if shadow opacity > 0)
      if (this.#shadowOpacity > 0) {
        let shadowX = textX + 1; // 1px shadow offset
        let shadowY = textY + 1

        for (const char of text) {
          const metrics = this.#charMetrics.get(char)
          if (!metrics) continue

          const charWidth = (metrics.width * this.#atlasWidth) / this.#atlasScale
          const charHeight = (metrics.height * this.#atlasHeight) / this.#atlasScale

          // Calculate fade-out alpha for shadow based on distance from right edge
          const rightEdge = textX + maxTextWidth
          const shadowRightEdge = shadowX + charWidth

          // Skip if shadow character is completely beyond the frame
          if (shadowX > rightEdge) break

          // Calculate fade alpha for shadow
          let shadowFadeAlpha = 1.0
          if (shadowRightEdge > rightEdge - fadeZoneWidth) {
            const distanceIntoFade = shadowRightEdge - (rightEdge - fadeZoneWidth)
            shadowFadeAlpha = Math.max(0, 1.0 - (distanceIntoFade / fadeZoneWidth))
          }

          // Add shadow character quad
          positions.push(
            shadowX, shadowY,
            shadowX + charWidth, shadowY,
            shadowX, shadowY + charHeight,
            shadowX + charWidth, shadowY,
            shadowX + charWidth, shadowY + charHeight,
            shadowX, shadowY + charHeight
          )

          // Add texture coordinates
          texCoords.push(
            metrics.x, metrics.y,
            metrics.x + metrics.width, metrics.y,
            metrics.x, metrics.y + metrics.height,
            metrics.x + metrics.width, metrics.y,
            metrics.x + metrics.width, metrics.y + metrics.height,
            metrics.x, metrics.y + metrics.height
          )

          // Add shadow colors (black with shadow opacity and fade)
          const finalShadowAlpha = this.#shadowOpacity * frameOpacity * shadowFadeAlpha
          for (let i = 0; i < 6; i++) {
            colors.push(0, 0, 0, finalShadowAlpha)
          }

          shadowX += charWidth
        }
      }

      // Render main text
      let charX = textX
      for (const char of text) {
        const metrics = this.#charMetrics.get(char)
        if (!metrics) continue

        // Convert normalized atlas coordinates back to screen space font size
        const charWidth = (metrics.width * this.#atlasWidth) / this.#atlasScale
        const charHeight = (metrics.height * this.#atlasHeight) / this.#atlasScale

        // Calculate fade-out alpha based on distance from right edge
        const rightEdge = textX + maxTextWidth
        const charRightEdge = charX + charWidth

        // Skip if character is completely beyond the frame
        if (charX > rightEdge) break

        // Calculate fade alpha: 1.0 at full visibility, 0.0 at right edge
        let fadeAlpha = 1.0
        if (charRightEdge > rightEdge - fadeZoneWidth) {
          const distanceIntoFade = charRightEdge - (rightEdge - fadeZoneWidth)
          fadeAlpha = Math.max(0, 1.0 - (distanceIntoFade / fadeZoneWidth))
        }

        // Add two triangles for the character quad (screen coordinates)
        positions.push(
          charX, textY,
          charX + charWidth, textY,
          charX, textY + charHeight,
          charX + charWidth, textY,
          charX + charWidth, textY + charHeight,
          charX, textY + charHeight
        )

        // Add texture coordinates using stored metrics
        texCoords.push(
          metrics.x, metrics.y,
          metrics.x + metrics.width, metrics.y,
          metrics.x, metrics.y + metrics.height,
          metrics.x + metrics.width, metrics.y,
          metrics.x + metrics.width, metrics.y + metrics.height,
          metrics.x, metrics.y + metrics.height
        )

        // Add colors with fade alpha
        const finalAlpha = frameOpacity * fadeAlpha
        for (let i = 0; i < 6; i++) {
          colors.push(textColorRgb[0], textColorRgb[1], textColorRgb[2], finalAlpha)
        }

        charX += charWidth
      }
    }

    if (positions.length === 0) return

    // Create and bind vertex buffers
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(textProgram, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const texCoordBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texCoords), gl.STATIC_DRAW)

    const texCoordLocation = gl.getAttribLocation(textProgram, 'a_texCoord')
    gl.enableVertexAttribArray(texCoordLocation)
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0)

    const colorBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

    const colorLocation = gl.getAttribLocation(textProgram, 'a_color')
    gl.enableVertexAttribArray(colorLocation)
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0)

    // Enable blending for text
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    // Draw text
    gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2)

    // Clean up and restore state
    gl.deleteBuffer(positionBuffer)
    gl.deleteBuffer(texCoordBuffer)
    gl.deleteBuffer(colorBuffer)

    // Disable vertex attribute arrays that were used for text
    gl.disableVertexAttribArray(positionLocation)
    gl.disableVertexAttribArray(texCoordLocation)
    gl.disableVertexAttribArray(colorLocation)

    gl.disable(gl.BLEND)
  }

  /**
   * Truncate text to fit within the given pixel width
   */
  truncateText(text: string, maxWidth: number): string {
    if (maxWidth <= 0) return ''

    let totalWidth = 0
    let result = ''

    for (const char of text) {
      const metrics = this.#charMetrics.get(char)
      if (!metrics) continue

      const charWidth = (metrics.width * this.#atlasWidth) / this.#atlasScale
      if (totalWidth + charWidth > maxWidth) {
        // Try to add ellipsis if there's room
        const ellipsisMetrics = this.#charMetrics.get('…') || this.#charMetrics.get('...')
        if (ellipsisMetrics && result.length > 0) {
          const ellipsisWidth = (ellipsisMetrics.width * this.#atlasWidth) / this.#atlasScale
          if (totalWidth - charWidth + ellipsisWidth <= maxWidth) {
            result = result.slice(0, -1) + '…'
          }
        }
        break
      }

      result += char
      totalWidth += charWidth
    }

    return result
  }

  /**
   * Convert hex color to RGB array
   */
  #hexToRgb(hex: string): [number, number, number] {
    // Remove # if present
    hex = hex.replace('#', '')

    // Parse hex values
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    return [r, g, b]
  }

  /**
   * Get contrasting text color for a given background color
   */
  #getContrastColor(bgColor: [number, number, number]): [number, number, number] {
    // Calculate luminance
    const [r, g, b] = bgColor
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b

    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? [0, 0, 0] : [1, 1, 1]
  }

  /**
   * Destroy the text renderer and clean up resources
   */
  destroy(): void {
    const gl = this.#webgl.getContext()
    if (gl && this.#textAtlasTexture) {
      gl.deleteTexture(this.#textAtlasTexture)
      this.#textAtlasTexture = null
    }
  }
}
