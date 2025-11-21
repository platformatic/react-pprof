import { FlameNode } from '../renderer/FlameDataProcessor'

/**
 * Checks if a frame represents Node.js internal code
 * @param fileName The file name from the flame node
 * @returns true if this is a Node.js internal frame
 */
export function isNodeInternal(fileName: string | undefined): boolean {
  if (!fileName) {
    return false
  }
  return fileName.startsWith('node:internal/')
}

/**
 * Checks if a frame represents code from node_modules
 * @param fileName The file name from the flame node
 * @returns true if this is a node_modules dependency frame
 */
export function isNodeModule(fileName: string | undefined): boolean {
  if (!fileName) {
    return false
  }
  return fileName.includes('/node_modules/')
}

/**
 * Determines if a frame should be shown when "Show App Code Only" is enabled
 * @param fileName The file name from the flame node
 * @returns true if this frame should be visible (is application code)
 */
export function shouldShowFrame(fileName: string | undefined): boolean {
  return !isNodeInternal(fileName) && !isNodeModule(fileName)
}

/**
 * Recursively filters a FlameNode tree to show only application code.
 * Filtered frames are collapsed - their values are added to their parent.
 *
 * @param node The FlameNode to filter
 * @param showAppCodeOnly If true, filter out Node.js internals and node_modules
 * @returns The filtered node, or null if the entire subtree should be filtered
 */
export function filterFlameTree(
  node: FlameNode,
  showAppCodeOnly: boolean
): FlameNode | null {
  // If filtering is disabled, return the node as-is
  if (!showAppCodeOnly) {
    return node
  }

  // Never filter the root "all" node
  if (node.depth === 0) {
    const filteredChildren = node.children
      .map(child => filterFlameTree(child, showAppCodeOnly))
      .filter((child): child is FlameNode => child !== null)

    return {
      ...node,
      children: filteredChildren,
    }
  }

  // Check if this node should be filtered
  const shouldKeepNode = shouldShowFrame(node.fileName)

  // Recursively filter children
  const filteredChildren = node.children
    .map(child => filterFlameTree(child, showAppCodeOnly))
    .filter((child): child is FlameNode => child !== null)

  // If this node should be filtered out
  if (!shouldKeepNode) {
    // If this node has no visible children, filter it entirely
    if (filteredChildren.length === 0) {
      return null
    }

    // If this node has visible children, we need to promote them
    // This is a collapsed frame - return children to be merged at parent level
    // For now, we'll keep the frame but mark it differently
    // Actually, let's remove the frame and let children be adopted by parent
    return null
  }

  // This node should be kept - return it with filtered children
  return {
    ...node,
    children: filteredChildren,
  }
}

/**
 * Filters a FlameNode tree and recalculates values and positions.
 * This is the main entry point for applying the "Show App Code Only" filter.
 *
 * @param root The root FlameNode
 * @param showAppCodeOnly If true, filter out Node.js internals and node_modules
 * @returns A new FlameNode tree with filtering applied
 */
export function filterAndRecalculate(
  root: FlameNode,
  showAppCodeOnly: boolean
): FlameNode {
  // First pass: filter the tree
  const filtered = filterFlameTree(root, showAppCodeOnly)

  if (!filtered) {
    // Should never happen for root, but handle gracefully
    return root
  }

  // Second pass: recalculate values by collapsing filtered nodes
  const recalculated = recalculateValues(filtered)

  // Third pass: recalculate positions and widths
  return recalculateLayout(recalculated)
}

/**
 * Recalculates values in the tree, collapsing filtered nodes into their parents
 */
function recalculateValues(node: FlameNode): FlameNode {
  // Base case: leaf node
  if (node.children.length === 0) {
    return node
  }

  // Recursively recalculate children
  const recalculatedChildren = node.children.map(recalculateValues)

  // Calculate total value from children
  const totalChildValue = recalculatedChildren.reduce(
    (sum, child) => sum + child.value,
    0
  )

  // Calculate total sample count from children
  const totalChildSamples = recalculatedChildren.reduce(
    (sum, child) => sum + child.sampleCount,
    0
  )

  return {
    ...node,
    children: recalculatedChildren,
    value: Math.max(node.value, totalChildValue),
    sampleCount: Math.max(node.sampleCount, totalChildSamples),
  }
}

/**
 * Recalculates layout (x positions and widths) for the filtered tree
 */
function recalculateLayout(node: FlameNode): FlameNode {
  // Start from the root and recalculate all positions
  return recalculateNodeLayout(node, 0, node.value)
}

/**
 * Recursively recalculates layout for a node and its children
 */
function recalculateNodeLayout(
  node: FlameNode,
  startX: number,
  totalValue: number
): FlameNode {
  const nodeWidth = totalValue > 0 ? node.value / totalValue : 0

  let currentX = startX
  const recalculatedChildren = node.children.map(child => {
    const childWidth = totalValue > 0 ? child.value / totalValue : 0
    const recalculated = recalculateNodeLayout(child, currentX, totalValue)
    currentX += childWidth
    return recalculated
  })

  return {
    ...node,
    x: startX,
    width: nodeWidth,
    children: recalculatedChildren,
  }
}
