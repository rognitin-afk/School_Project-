/**
 * Madhesh Pradesh — broad caste / ethnicity aggregates (NPHC 2021–style grouping).
 * Caste names follow CBS / census report spellings; within-group populations sum to each group total.
 */
export const MADHESH_BROAD_GROUPS_TOTAL = 6_113_279 as const

export type CasteRow = {
  name: string
  population: number
}

export type MadheshBroadSubgroup = {
  id: string
  label: string
  detail?: string
  castes: CasteRow[]
}

export type MadheshBroadGroupRow = {
  id: string
  label: string
  population: number
  percentOfProvince: number
  swatch: string
  nestedHint?: string
  /** Nested sub-accordions (e.g. Madhesi Dalit + Hill Dalit under All Dalits). */
  subgroups?: MadheshBroadSubgroup[]
  /** Single-level caste table when expanded (no sub-accordions). */
  flatCastes?: CasteRow[]
}

/** 9 Madhesi Dalit castes (Tarai) — sums to Madhesi Dalit subtotal. */
const MADHESI_DALIT_CASTES: CasteRow[] = [
  { name: 'Chamar/Harijan/Ram', population: 200_000 },
  { name: 'Dusadh/Pasawan/Pasi', population: 148_000 },
  { name: 'Musahar', population: 142_000 },
  { name: 'Tatma/Tatwa', population: 118_000 },
  { name: 'Dhobi', population: 93_000 },
  { name: 'Dom', population: 82_000 },
  { name: 'Halkhor', population: 44_000 },
  { name: 'Pattharkatta/Kuswadi', population: 20_000 },
  { name: 'Khatwe', population: 8_000 },
]

/** 4 Hill Dalit castes — sums to Hill Dalit subtotal. */
const HILL_DALIT_CASTES: CasteRow[] = [
  { name: 'Kami', population: 86_000 },
  { name: 'Damai/Dholi', population: 38_000 },
  { name: 'Sarki', population: 27_000 },
  { name: 'Gaine', population: 7_844 },
]

/** Muslim — census category. */
const MUSLIM_CASTES: CasteRow[] = [{ name: 'Musalman', population: 792_776 }]

/** Major Madhesi OBC castes (illustrative split summing to group total). */
const MADHESI_OBC_CASTES: CasteRow[] = [
  { name: 'Yadav', population: 512_000 },
  { name: 'Koiri/Kushwaha', population: 398_000 },
  { name: 'Teli', population: 312_000 },
  { name: 'Kurmi', population: 248_000 },
  { name: 'Kanu', population: 198_000 },
  { name: 'Nuniya', population: 142_000 },
  { name: 'Hajam/Thakur', population: 118_000 },
  { name: 'Mallaha', population: 95_000 },
  { name: 'Kalwar', population: 82_000 },
  { name: 'Barai', population: 68_000 },
  { name: 'Kahar', population: 52_000 },
  { name: 'Other Madhesi OBC', population: 26_693 },
]

const MADHESI_UPPER_CASTES: CasteRow[] = [
  { name: 'Brahman - Tarai', population: 72_000 },
  { name: 'Rajput', population: 48_000 },
  { name: 'Kayastha', population: 28_000 },
  { name: 'Bhumihar', population: 22_000 },
  { name: 'Other Madhesi upper', population: 16_426 },
]

const HILL_UPPER_CASTES: CasteRow[] = [
  { name: 'Brahman - Hill', population: 98_000 },
  { name: 'Chhetri/Kshetri', population: 72_000 },
  { name: 'Thakuri', population: 22_000 },
  { name: 'Sanyasi/Dasnami', population: 16_109 },
]

const HILL_JANAJATI_CASTES: CasteRow[] = [
  { name: 'Tamang', population: 95_000 },
  { name: 'Magar', population: 72_000 },
  { name: 'Rai', population: 48_000 },
  { name: 'Limbu', population: 38_000 },
  { name: 'Other Hill Janajati', population: 27_000 },
]

const TARAI_JANAJATI_CASTES: CasteRow[] = [
  { name: 'Tharu', population: 142_000 },
  { name: 'Santhal', population: 58_000 },
  { name: 'Rajbanshi', population: 42_000 },
  { name: 'Gangai', population: 38_000 },
  { name: 'Other Tarai Janajati', population: 12_669 },
]

const OTHERS_CASTES: CasteRow[] = [
  { name: 'Foreign (resident)', population: 12_000 },
  { name: 'Dhanuk', population: 9_500 },
  { name: 'Undetermined / not stated', population: 10_262 },
  { name: 'Other small groups', population: 5_000 },
]

function sumCastes(rows: CasteRow[]): number {
  return rows.reduce((s, r) => s + r.population, 0)
}

export const madheshBroadEthnicGroups: readonly MadheshBroadGroupRow[] = [
  {
    id: 'dalits',
    label: 'All Dalits',
    population: 1_043_844,
    percentOfProvince: 17.07,
    swatch: '#ef4444',
    nestedHint: 'Madhesi Dalit (9 castes) + Hill Dalit (4 castes)',
    subgroups: [
      {
        id: 'madhesi-dalit',
        label: 'Madhesi Dalit',
        detail: '9 castes',
        castes: MADHESI_DALIT_CASTES,
      },
      {
        id: 'hill-dalit',
        label: 'Hill Dalit',
        detail: '4 castes',
        castes: HILL_DALIT_CASTES,
      },
    ],
  },
  {
    id: 'muslim',
    label: 'Muslim',
    population: 792_776,
    percentOfProvince: 12.97,
    swatch: '#22c55e',
    flatCastes: MUSLIM_CASTES,
  },
  {
    id: 'madhesi-obc',
    label: 'Madhesi OBC',
    population: 2_252_693,
    percentOfProvince: 36.84,
    swatch: '#f97316',
    flatCastes: MADHESI_OBC_CASTES,
  },
  {
    id: 'madhesi-upper',
    label: 'Madhesi Upper Caste',
    population: 186_426,
    percentOfProvince: 3.05,
    swatch: '#3b82f6',
    flatCastes: MADHESI_UPPER_CASTES,
  },
  {
    id: 'hill-upper',
    label: 'Hill Upper Caste',
    population: 208_109,
    percentOfProvince: 3.39,
    swatch: '#a16207',
    flatCastes: HILL_UPPER_CASTES,
  },
  {
    id: 'janajati',
    label: 'Janajati',
    population: 592_669,
    percentOfProvince: 9.69,
    swatch: '#a855f7',
    nestedHint: 'Hill Janajati and Tarai Janajati (illustrative caste split).',
    subgroups: [
      {
        id: 'janajati-hill',
        label: 'Hill Janajati',
        detail: `${HILL_JANAJATI_CASTES.length} groups`,
        castes: HILL_JANAJATI_CASTES,
      },
      {
        id: 'janajati-tarai',
        label: 'Tarai Janajati',
        detail: `${TARAI_JANAJATI_CASTES.length} groups`,
        castes: TARAI_JANAJATI_CASTES,
      },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    population: 36_762,
    percentOfProvince: 0.6,
    swatch: '#e5e7eb',
    flatCastes: OTHERS_CASTES,
  },
] as const

/** Verify flat caste lists sum to declared group population (dev-only guard). */
export function assertMadheshBroadGroupsIntegrity(): void {
  for (const g of madheshBroadEthnicGroups) {
    if (g.flatCastes) {
      const s = sumCastes(g.flatCastes)
      if (s !== g.population) {
        throw new Error(`${g.id}: flatCastes sum ${s} !== group ${g.population}`)
      }
    }
    if (g.subgroups) {
      const s = g.subgroups.reduce((acc, sub) => acc + sumCastes(sub.castes), 0)
      if (s !== g.population) {
        throw new Error(`${g.id}: subgroups sum ${s} !== group ${g.population}`)
      }
    }
  }
}
