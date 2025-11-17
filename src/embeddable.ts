import { readFile } from 'fs/promises'
import { join } from 'path'

export interface EmbeddableFlameGraphOptions {
  title?: string
  filename?: string
  primaryColor?: string
  secondaryColor?: string
  height?: number | string
}

export interface EmbeddableFlameGraphResult {
  html: string
  script: string
}

export interface EmbeddableFlameGraphBundle {
  bundle: string
}

let cachedBundle: string | null = null

/**
 * Get the reusable flamegraph bundle code (cached after first call)
 * This should be included once in your page
 *
 * @returns The flamegraph bundle JavaScript code
 */
export async function getFlamegraphBundle (): Promise<EmbeddableFlameGraphBundle> {
  if (cachedBundle) {
    return { bundle: cachedBundle }
  }

  // Read the JavaScript bundle
  const bundlePath = join(import.meta.dirname, '..', 'cli-build', 'flamegraph.js')
  cachedBundle = await readFile(bundlePath, 'utf8')

  return { bundle: cachedBundle }
}

/**
 * Generate embeddable HTML and JavaScript for a flamegraph from raw pprof data
 * Uses a function-based API that can be called multiple times for different graphs
 *
 * @param profileBuffer - Raw pprof binary data (Buffer or Uint8Array)
 * @param options - Configuration options for the flamegraph
 * @returns Object containing separate HTML and script strings for embedding
 */
export async function generateEmbeddableFlameGraph (
  profileBuffer: Buffer | Uint8Array,
  options: EmbeddableFlameGraphOptions = {}
): Promise<EmbeddableFlameGraphResult> {
  const {
    title = 'Profile',
    filename = 'profile.pb',
    primaryColor = '#ff4444',
    secondaryColor = '#ffcc66'
  } = options

  // Convert Buffer to Uint8Array if needed
  const uint8Array = profileBuffer instanceof Buffer
    ? new Uint8Array(profileBuffer)
    : profileBuffer

  // Generate unique ID for this graph instance
  const containerId = `react-pprof-${Math.random().toString(36).substr(2, 9)}`
  const rootId = `${containerId}-root`

  // Generate the array literal for the profile data
  const arrayLiteral = `new Uint8Array([${Array.from(uint8Array).join(',')}])`

  // Create the render call script (doesn't use globals)
  const script = `
(function() {
  if (typeof window.renderReactPprofFlameGraph === 'undefined') {
    console.error('react-pprof bundle not loaded. Include the bundle script before calling render.');
    return;
  }

  const profileData = ${arrayLiteral}.buffer;

  window.renderReactPprofFlameGraph('${rootId}', {
    profileData: profileData,
    filename: ${JSON.stringify(filename)},
    title: ${JSON.stringify(title)},
    primaryColor: ${JSON.stringify(primaryColor)},
    secondaryColor: ${JSON.stringify(secondaryColor)}
  });
})();
`

  // Create the HTML container with unique IDs
  // Use flex: 1 to fill the parent container properly
  const html = `
<div id="${containerId}" style="display: flex; flex-direction: column; flex: 1; min-height: 0; background-color: #1e1e1e; color: #ffffff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <div id="${rootId}" style="display: flex; flex-direction: column; flex: 1; min-height: 0;">
    <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 18px;">
      Loading profile...
    </div>
  </div>
</div>
`

  return { html, script }
}
