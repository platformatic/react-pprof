import { Profile } from 'pprof-format'

// FlameNode and FrameData types belong here since this class owns them
export interface FlameNode {
  id: string
  name: string
  value: number
  children: FlameNode[]
  parent?: FlameNode
  depth: number
  x: number
  width: number
  fileName?: string
  lineNumber?: number
}

export interface FrameData {
  id: string
  name: string
  value: number
  depth: number
  x: number
  width: number
  functionName: string
  fileName?: string
  lineNumber?: number
  totalValue: number
}

interface PprofSample {
  stack: string[]
  value: number
  locations?: Array<{functionName: string; filename?: string; line?: number}>
}

interface ParsedProfile {
  samples: PprofSample[]
  totalValue: number
}

/**
 * Processes Profile data and converts it to FlameNode structure
 */
export class FlameDataProcessor {
  #data: FlameNode | null = null
  #framePadding = 5

  /**
   * Convert Profile to FlameNode structure
   */
  processProfile(profile: Profile): FlameNode {
    this.#data = this.#profileToFlameGraph(profile)
    return this.#data
  }

  /**
   * Get the processed flame graph data
   */
  getData(): FlameNode | null {
    return this.#data
  }

  /**
   * Set frame padding
   */
  setFramePadding(padding: number): void {
    this.#framePadding = padding
  }

  /**
   * Get frame padding
   */
  getFramePadding(): number {
    return this.#framePadding
  }

  /**
   * Get maximum depth of the flame graph
   */
  getMaxDepth(): number {
    if (!this.#data) return 0

    let maxDepth = 0
    this.#traverseFlameGraph(this.#data, (node) => {
      maxDepth = Math.max(maxDepth, node.depth)
    })

    return maxDepth
  }

  /**
   * Get frame height including padding
   */
  getFrameHeight(): number {
    // Base this on typical font size (11px) + padding to match horizontal spacing
    const baseFontSize = 11
    return baseFontSize + this.#framePadding * 2
  }

  /**
   * Calculate total graph height
   */
  calculateGraphHeight(): number {
    if (!this.#data) return 0
    
    const maxDepth = this.getMaxDepth()
    const frameHeight = this.getFrameHeight()
    // Add 1 because depth is 0-indexed (depth 0, 1, 2 = 3 frames)
    return (maxDepth + 1) * frameHeight
  }

  /**
   * Generate frame layout for rendering
   */
  generateFrames(): Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}> {
    const frames: Array<{node: FlameNode, x1: number, x2: number, y1: number, y2: number}> = []
    
    if (!this.#data) return frames

    const frameHeight = this.getFrameHeight()

    this.#traverseFlameGraph(this.#data, (node) => {
      const y1 = node.depth * frameHeight
      const y2 = y1 + frameHeight

      frames.push({
        node,
        x1: node.x,
        x2: node.x + node.width,
        y1,
        y2
      })
    })

    return frames
  }

  /**
   * Get stack trace for a frame
   */
  getStackTrace(frameId: string): FlameNode[] {
    const frame = this.findFrameById(frameId)
    if (!frame) return []

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
  getFrameChildren(frameId: string): FlameNode[] {
    const frame = this.findFrameById(frameId)
    return frame ? frame.children : []
  }

  /**
   * Find a frame by ID
   */
  findFrameById(id: string): FlameNode | null {
    if (!this.#data) return null
    
    return this.#searchFrameTree(this.#data, id)
  }

  #profileToFlameGraph(profile: Profile): FlameNode {
    const samples: PprofSample[] = []
    let totalValue = 0

    // Extract function names from string table
    const stringTable = profile.stringTable?.strings || []

    // Helper function to safely get string from table
    const getString = (index: number | bigint | undefined): string | undefined => {
      if (index === undefined) return undefined
      const idx = Number(index)
      return stringTable[idx]
    }

    // Extract locations and functions
    const locations = new Map()
    const functions = new Map()

    // Build function lookup table
    for (const func of profile.function || []) {
      if (func.id && func.name) {
        const name = getString(func.name) || `func_${func.id}`
        const filename = getString(func.filename)

        functions.set(func.id.toString(), {
          name,
          filename,
          startLine: Number(func.startLine || 0)
        })
      }
    }

    // Build location lookup table
    for (const location of profile.location || []) {
      if (location.id && location.line && location.line.length > 0) {
        const line = location.line[0]
        const funcId = line.functionId?.toString()
        const func = functions.get(funcId || '')

        locations.set(location.id.toString(), {
          functionName: func?.name || `loc_${location.id}`,
          filename: func?.filename,
          line: Number(line.line || 0)
        })
      }
    }

    // Process samples
    for (const sample of profile.sample || []) {
      if (sample.locationId && sample.value && sample.value.length > 0) {
        const value = Number(sample.value[0] || 0)
        totalValue += value

        // Build stack trace from location IDs
        const stack: string[] = []
        const locationDetails: Array<{functionName: string; filename?: string; line?: number}> = []

        for (const locId of sample.locationId) {
          const location = locations.get(locId.toString())
          if (location) {
            stack.push(location.functionName)
            locationDetails.push(location)
          }
        }

        // Reverse stack to get root-to-leaf order
        stack.reverse()
        locationDetails.reverse()

        samples.push({
          stack,
          value,
          locations: locationDetails
        })
      }
    }

    return this.#samplesToFlameGraph({ samples, totalValue })
  }

  #samplesToFlameGraph(parsedProfile: ParsedProfile): FlameNode {
    const { samples, totalValue } = parsedProfile

    // Create root node
    const root: FlameNode = {
      id: 'root',
      name: 'all',
      value: totalValue,
      x: 0,
      width: 1,
      depth: 0,
      children: []
    }

    // Build tree structure by aggregating samples
    const nodeMap = new Map<string, FlameNode>()
    nodeMap.set('root', root)

    for (const sample of samples) {
      let currentParent = root
      let currentPath = 'root'

      for (let i = 0; i < sample.stack.length; i++) {
        const functionName = sample.stack[i]
        const nodeId = `${currentPath}/${functionName}`
        const location = sample.locations?.[i]

        let node = nodeMap.get(nodeId)

        if (!node) {
          // Create new node
          node = {
            id: nodeId,
            name: functionName,
            value: 0,
            x: 0,
            width: 0,
            depth: i + 1,
            children: [],
            parent: currentParent,
            fileName: location?.filename,
            lineNumber: location?.line
          }

          nodeMap.set(nodeId, node)
          currentParent.children.push(node)
        }

        // Accumulate sample value
        node.value += sample.value

        currentParent = node
        currentPath = nodeId
      }
    }

    // Calculate positions and widths
    this.#calculateLayout(root)

    return root
  }

  #calculateLayout(node: FlameNode): void {
    if (node.children.length === 0) {
      return
    }

    // Sort children by value (descending) for consistent layout
    node.children.sort((a, b) => b.value - a.value)

    let xOffset = 0
    const parentWidth = node.width
    const parentX = node.x

    for (const child of node.children) {
      // Calculate child width as proportion of parent based on value (no gaps in layout)
      child.width = (child.value / node.value) * parentWidth
      child.x = parentX + xOffset

      xOffset += child.width

      // Recursively calculate layout for children
      this.#calculateLayout(child)
    }
  }

  #traverseFlameGraph(node: FlameNode, callback: (node: FlameNode) => void): void {
    callback(node)
    for (const child of node.children) {
      this.#traverseFlameGraph(child, callback)
    }
  }

  #searchFrameTree(node: FlameNode, id: string): FlameNode | null {
    if (node.id === id) return node
    
    for (const child of node.children) {
      const found = this.#searchFrameTree(child, id)
      if (found) return found
    }
    
    return null
  }
}