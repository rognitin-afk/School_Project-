import type { CandidatesMap } from '../types'

const CANDIDATES_URL = '/candidates.json'

/**
 * Fetch candidates. Currently loads from public JSON.
 * Later: replace with API that reads from MongoDB, e.g. GET /api/candidates
 */
export async function fetchCandidates(): Promise<CandidatesMap> {
  const res = await fetch(CANDIDATES_URL)
  if (!res.ok) throw new Error('Failed to load candidates')
  const data = await res.json()
  return data as CandidatesMap
}
