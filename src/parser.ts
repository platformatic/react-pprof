// Simple Profile fetcher and decoder
import { Profile } from 'pprof-format'

// Re-export Profile type from pprof-format
export { Profile } from 'pprof-format'

/**
 * Load and parse a pprof file from a URL, returning the Profile object
 */
export async function fetchProfile(url: string): Promise<Profile> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`)
  }

  const buffer = await response.arrayBuffer()

  return Profile.decode(new Uint8Array(buffer))
}
