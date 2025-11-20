import { Profile } from 'pprof-format'
import { ProfileMetadata, detectProfileMetadata } from './ProfileMetadata.js'
import { filterAndRecalculate } from '../utils/frameFilters.js'

// FlameNode and FrameData types belong here since this class owns them
export interface FlameNode {
  id: string
  name: string
  value: number
  selfValue: number
  sampleCount: number  // Count of samples/allocations
  selfSampleCount: number  // Count of samples/allocations for this frame only
  children: FlameNode[]
  parent?: FlameNode
  depth: number
  x: number
  width: number
  selfWidth: number
  fileName?: string
  lineNumber?: number
}

export interface FrameData {
  id: string
  name: string
  value: number
  selfValue: number
  depth: number
  x: number
  width: number
  selfWidth: number
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
  #profileMetadata: ProfileMetadata | null = null

  /**
   * Convert Profile to FlameNode structure
   */
  processProfile(profile: Profile, showAppCodeOnly: boolean = false): FlameNode {
    // Detect profile metadata first
    this.#profileMetadata = detectProfileMetadata(profile)
    const rawData = this.#profileToFlameGraph(profile)

    // Apply filtering if requested
    this.#data = showAppCodeOnly ? filterAndRecalculate(rawData, showAppCodeOnly) : rawData

    return this.#data
  }

  /**
   * Get the processed flame graph data
   */
  getData(): FlameNode | null {
    return this.#data
  }

  /**
   * Get the profile metadata
   */
  getProfileMetadata(): ProfileMetadata | null {
    return this.#profileMetadata
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
    if (!this.#data) {return 0}

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
    if (!this.#data) {return 0}
    
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
    
    if (!this.#data) {return frames}

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
  getFrameChildren(frameId: string): FlameNode[] {
    const frame = this.findFrameById(frameId)
    return frame ? frame.children : []
  }

  /**
   * Find a frame by ID
   */
  findFrameById(id: string): FlameNode | null {
    if (!this.#data) {return null}
    
    return this.#searchFrameTree(this.#data, id)
  }

  /**
   * Get self-time value for a specific frame
   */
  getFrameSelfTime(frameId: string): number {
    const frame = this.findFrameById(frameId)
    return frame?.selfValue || 0
  }

  /**
   * Get self-time as percentage of total profile time for a specific frame
   */
  getFrameSelfTimePercentage(frameId: string): number {
    const frame = this.findFrameById(frameId)
    return frame?.selfWidth || 0
  }

  #profileToFlameGraph(profile: Profile): FlameNode {
    const samples: PprofSample[] = []
    let totalValue = 0

    // Extract function names from string table
    const stringTable = profile.stringTable?.strings || []

    // Helper function to safely get string from table
    const getString = (index: number | bigint | undefined): string | undefined => {
      if (index === undefined) {return undefined}
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
    // Use the correct value index based on profile metadata (skip count, use actual metric)
    const valueIndex = this.#profileMetadata?.sampleTypeIndex ?? 0
    for (const sample of profile.sample || []) {
      if (sample.locationId && sample.value && sample.value.length > valueIndex) {
        const value = Number(sample.value[valueIndex] || 0)
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
      selfValue: 0, // Will be calculated later
      sampleCount: samples.length,  // Total number of samples
      selfSampleCount: 0, // Will be calculated later
      x: 0,
      width: 1,
      selfWidth: 0, // Will be calculated later
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
            selfValue: 0, // Will be calculated later
            sampleCount: 0,
            selfSampleCount: 0, // Will be calculated later
            x: 0,
            width: 0,
            selfWidth: 0, // Will be calculated later
            depth: i + 1,
            children: [],
            parent: currentParent,
            fileName: location?.filename,
            lineNumber: location?.line
          }

          nodeMap.set(nodeId, node)
          currentParent.children.push(node)
        }

        // Accumulate sample value - this is correct for flame graphs
        node.value += sample.value
        node.sampleCount += 1  // Each sample increments the count

        currentParent = node
        currentPath = nodeId
      }
    }

    // Calculate positions and widths
    this.#calculateLayout(root)

    // Calculate self-time values and percentages
    this.#calculateSelfTimes(root)

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


  /**
   * Calculate self-time values and percentages for all nodes in the tree
   */
  #calculateSelfTimes(root: FlameNode): void {
    const traverse = (node: FlameNode) => {
      // Calculate self-time value (node's time minus children's time)
      const childrenTotalValue = node.children.reduce((sum, child) => sum + child.value, 0)
      node.selfValue = Math.max(0, node.value - childrenTotalValue)

      // Calculate self-time as percentage of total profile time
      node.selfWidth = node.selfValue / root.value

      // Calculate self sample count (samples that end at this frame)
      const childrenTotalSamples = node.children.reduce((sum, child) => sum + child.sampleCount, 0)
      node.selfSampleCount = Math.max(0, node.sampleCount - childrenTotalSamples)

      // Recursively process children
      node.children.forEach(traverse)
    }

    traverse(root)
  }

  #traverseFlameGraph(node: FlameNode, callback: (node: FlameNode) => void): void {
    callback(node)
    for (const child of node.children) {
      this.#traverseFlameGraph(child, callback)
    }
  }

  #searchFrameTree(node: FlameNode, id: string): FlameNode | null {
    if (node.id === id) {return node}
    
    for (const child of node.children) {
      const found = this.#searchFrameTree(child, id)
      if (found) {return found}
    }
    
    return null
  }
}