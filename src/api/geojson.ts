import type { GeoJsonData } from '../types'

const GEOJSON_URL = '/new.geojson'

/**
 * Fetch Nepal constituencies GeoJSON. Currently from public folder.
 * Later: can be served from backend/MongoDB or CDN if needed.
 */
export async function fetchGeoJson(): Promise<GeoJsonData> {
  const res = await fetch(GEOJSON_URL)
  if (!res.ok) throw new Error('Failed to load map data')
  const data = await res.json()
  return data as GeoJsonData
}
