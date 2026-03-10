import type { ConstituencyCandidatesMap } from '../types'

const CONSTITUENCY_CANDIDATES_URL = '/constituency-candidates.json'

/**
 * Fetch full candidate lists per constituency.
 * Fallbacks to an empty object if file is missing.
 */
export async function fetchConstituencyCandidates(): Promise<ConstituencyCandidatesMap> {
  const res = await fetch(CONSTITUENCY_CANDIDATES_URL)
  if (!res.ok) return {}
  const data = await res.json()
  return data as ConstituencyCandidatesMap
}

