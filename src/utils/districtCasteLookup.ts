import casteRaw from '../data/casteEthnicityByDistrict.json'
import casteNepalFallback from '../data/casteEthnicityNepal.json'
import { PROVINCE_NAMES } from '../constants'
import type { Hierarchy } from '../types'

export type CasteEthnicityRow = {
  caste: string
  total: number
  male: number
  female: number
}

export type CasteDataProvenance = 'census-table' | 'summed-districts' | 'national-excerpt-json'

export type ResolvedDistrictCaste = {
  displayName: string
  data: CasteEthnicityRow[]
  provenance?: CasteDataProvenance
}

type JsonEntry = { district: string; data: CasteEthnicityRow[] }

/** Census file: exact `district` string → entry (includes Nepal + 7 provinces + all districts) */
const FULL_BY_DISTRICT_LOWER = new Map<string, ResolvedDistrictCaste>()
for (const e of casteRaw as JsonEntry[]) {
  const key = e.district.trim().toLowerCase()
  FULL_BY_DISTRICT_LOWER.set(key, {
    displayName: e.district,
    data: e.data,
    provenance: 'census-table',
  })
}

/** Province / national blocks in the census file — not map polygons */
const EXCLUDE_DISTRICTS = new Set(
  [
    'Nepal',
    'Bagmati',
    'Gandaki',
    'Karnali',
    'Koshi',
    'Lumbini',
    'Madhesh',
    'Sudurpaschim',
  ].map((s) => s.toLowerCase()),
)

/** Map GeoJSON `DISTRICT` / filter value ↔ census `district` string */
const BUCKET: Record<string, string> = {
  makawanpur: 'makwanpur',
  kabhrepalanchok: 'kavrepalanchok',
  kavrepalanchok: 'kavrepalanchok',
  dhanusha: 'dhanusa',
  dhanusa: 'dhanusa',
  nawalparasie: 'nawalparasi_e',
  nawalparasiw: 'nawalparasi_w',
  nawalparasieast: 'nawalparasi_e',
  nawalparasiwest: 'nawalparasi_w',
  nawalparasibardaghatsustaeast: 'nawalparasi_e',
  nawalparasibardaghatsustawest: 'nawalparasi_w',
  rukume: 'rukum_e',
  rukumw: 'rukum_w',
  rukumeast: 'rukum_e',
  rukumwest: 'rukum_w',
}

function canonicalKey(label: string): string {
  let s = label.trim().toLowerCase().replace(/_/g, ' ')
  s = s.replace(/\s*\(\s*bardaghat\s+susta\s+east\s*\)/gi, ' east')
  s = s.replace(/\s*\(\s*bardaghat\s+susta\s+west\s*\)/gi, ' west')
  s = s.replace(/\s*\(\s*east\s*\)/gi, ' east')
  s = s.replace(/\s*\(\s*west\s*\)/gi, ' west')
  s = s.replace(/[^a-z0-9]+/g, '')
  return BUCKET[s] ?? s
}

function buildDistrictOnlyLookup(entries: JsonEntry[]): Map<string, ResolvedDistrictCaste> {
  const m = new Map<string, ResolvedDistrictCaste>()
  for (const e of entries) {
    if (EXCLUDE_DISTRICTS.has(e.district.trim().toLowerCase())) continue
    const key = canonicalKey(e.district)
    m.set(key, {
      displayName: e.district,
      data: e.data,
      provenance: 'census-table',
    })
  }
  return m
}

const DISTRICT_LOOKUP = buildDistrictOnlyLookup(casteRaw as JsonEntry[])

/** App province filter value (1–7) → exact `district` name inside casteEthnicityByDistrict.json */
const PROVINCE_CENSUS_DISTRICT: Record<string, string> = {
  '1': 'Koshi',
  '2': 'Madhesh',
  '3': 'Bagmati',
  '4': 'Gandaki',
  '5': 'Lumbini',
  '6': 'Karnali',
  '7': 'Sudurpaschim',
}

function mergeCasteRows(
  rows: CasteEthnicityRow[],
  into: Map<string, { total: number; male: number; female: number }>,
) {
  for (const row of rows) {
    const p = into.get(row.caste) ?? { total: 0, male: 0, female: 0 }
    into.set(row.caste, {
      total: p.total + row.total,
      male: p.male + row.male,
      female: p.female + row.female,
    })
  }
}

/**
 * When a province-level census block is missing, sum all map-district tables in that province.
 */
function aggregateCasteFromHierarchyDistricts(
  hierarchy: Hierarchy,
  provinceCode: string,
): ResolvedDistrictCaste | null {
  const prov = hierarchy[provinceCode]
  if (!prov) return null

  const districtNames = Object.keys(prov.districts ?? {})
  if (districtNames.length === 0) return null

  const merged = new Map<string, { total: number; male: number; female: number }>()
  let matched = 0

  for (const d of districtNames) {
    const block = resolveCasteDataForMapDistrict(d)
    if (!block) continue
    matched += 1
    mergeCasteRows(block.data, merged)
  }

  if (matched === 0 || merged.size === 0) return null

  const data: CasteEthnicityRow[] = Array.from(merged.entries()).map(([caste, v]) => ({
    caste,
    total: v.total,
    male: v.male,
    female: v.female,
  }))

  const n = Number(provinceCode)
  const label = PROVINCE_NAMES[n] ?? prov.name ?? `Province ${provinceCode}`

  return {
    displayName: label,
    data,
    provenance: 'summed-districts',
  }
}

export function resolveNationalCasteData(): ResolvedDistrictCaste {
  const hit = FULL_BY_DISTRICT_LOWER.get('nepal')
  if (hit) {
    return { ...hit, displayName: 'Nepal', provenance: 'census-table' }
  }

  const rows = (casteNepalFallback.data ?? []) as CasteEthnicityRow[]
  return {
    displayName: casteNepalFallback.country ?? 'Nepal',
    data: rows,
    provenance: 'national-excerpt-json',
  }
}

export function resolveProvinceCasteData(
  provinceCode: string,
  hierarchy: Hierarchy | null,
): ResolvedDistrictCaste | null {
  if (!provinceCode.trim()) return null

  const censusDistrict = PROVINCE_CENSUS_DISTRICT[provinceCode]
  if (censusDistrict) {
    const hit = FULL_BY_DISTRICT_LOWER.get(censusDistrict.toLowerCase())
    if (hit) {
      const n = Number(provinceCode)
      const label = Number.isFinite(n) ? (PROVINCE_NAMES[n] ?? hit.displayName) : hit.displayName
      return {
        ...hit,
        displayName: label,
        provenance: 'census-table',
      }
    }
  }

  if (hierarchy) {
    return aggregateCasteFromHierarchyDistricts(hierarchy, provinceCode)
  }

  return null
}

/**
 * Resolve map / filter district label (e.g. `DHANUSHA`, `NAWALPARASI_E`) to census data.
 */
export function resolveCasteDataForMapDistrict(mapDistrictLabel: string): ResolvedDistrictCaste | null {
  if (!mapDistrictLabel.trim()) return null
  const key = canonicalKey(mapDistrictLabel)
  return DISTRICT_LOOKUP.get(key) ?? null
}
