// GeoJSON feature properties from new.geojson
export interface ConstituencyFeatureProperties {
  DISTRICT: string
  FIRST_STAT: number
  HOR_CODE: string
}

export interface ConstituencyFeature {
  type: 'Feature'
  properties: ConstituencyFeatureProperties
  geometry: { type: string; coordinates: number[][] | number[][][] }
}

export interface GeoJsonData {
  type: 'FeatureCollection'
  features: ConstituencyFeature[]
}

// Candidate from candidates.json (or future API/MongoDB)
export interface Candidate {
  name: string
  constituency?: string
  district?: string
  provinceCode?: number
  provinceName?: string
  image?: string
  bio?: string
  age?: number
  education?: string
  party?: string
  role?: string
  pastWins?: string[]
  keyPromises?: string[]
}

// Past election result per constituency (for overlay)
export interface ElectionResult {
  party: string
  partyId?: string
  turnoutPercent?: number
}

export type ElectionResultsMap = Record<string, ElectionResult>

export type CandidatesMap = Record<string, Candidate>

export type ConstituencyCandidatesMap = Record<string, Candidate[]>

// Hierarchy for filters: province -> districts -> constituency codes
export interface HierarchyDistrict {
  constituencies: string[]
}

export interface HierarchyProvince {
  name: string
  districts: Record<string, HierarchyDistrict>
}

export type Hierarchy = Record<string, HierarchyProvince>

// Sidebar display props (from map click or selection)
export interface SidebarProps {
  DISTRICT: string
  FIRST_STAT: number
  HOR_CODE: string
}
