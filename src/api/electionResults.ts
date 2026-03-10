import type { ElectionResultsMap } from '../types'

const ELECTION_RESULTS_URL = '/election-results.json'

/**
 * Fetch past election results (winner party + turnout per constituency).
 * Used for election overlay and turnout heatmap.
 */
export async function fetchElectionResults(): Promise<ElectionResultsMap> {
  const res = await fetch(ELECTION_RESULTS_URL)
  if (!res.ok) return {}
  const data = await res.json()
  return data as ElectionResultsMap
}
