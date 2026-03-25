/**
 * Madhesh Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/2__madhesh/
 */
export const madheshPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 2_882_623 },
  { year: '1991', date: '1991-06-22', population: 3_605_277 },
  { year: '2001', date: '2001-05-28', population: 4_604_713 },
  { year: '2011', date: '2011-06-22', population: 5_404_145 },
  { year: '2021', date: '2021-11-25', population: 6_114_600 },
] as const

/** Summary metrics (2021 census + area/density). */
export const madheshKeyStats = {
  population2021: 6_114_600,
  areaKm2: 9_661,
  densityPerKm2: 632.9,
} as const

export const madheshProvinceMeta = {
  name: 'Madhesh',
  nameNative: 'मधेश प्रदेश',
  transcription: 'Madheśa',
  status: 'Province',
  country: 'Nepal',
} as const

export const madheshGender2021 = {
  Males: 3_065_751,
  Females: 3_048_849,
} as const

export const madheshBroadAge2021 = {
  '0–14 years': 2_028_242,
  '15–64 years': 3_700_734,
  '65+ years': 385_624,
} as const

/** 10-year age bands, Census 2021 (City Population table). */
export const madheshAgeDistribution2021 = [
  { label: '90+ years', value: 7_898 },
  { label: '80–89 years', value: 31_047 },
  { label: '70–79 years', value: 191_039 },
  { label: '60–69 years', value: 329_123 },
  { label: '50–59 years', value: 442_907 },
  { label: '40–49 years', value: 598_613 },
  { label: '30–39 years', value: 807_896 },
  { label: '20–29 years', value: 1_049_119 },
  { label: '10–19 years', value: 1_312_371 },
  { label: '0–9 years', value: 1_344_587 },
] as const

export const madheshCitizenship2021 = {
  Nepal: 6_087_176,
  India: 27_307,
  'Other Citizenship': 114,
} as const

export const madheshPlaceOfBirth2021 = {
  'Same local unit': 4_713_228,
  'Other local unit in same district': 688_887,
  'Other district': 475_317,
  'Other country': 236_597,
} as const

export const madheshLiteracyAge5Plus2021 = {
  Yes: 3_477_413,
  'Only reading': 14_231,
  No: 1_981_166,
} as const

export const MADHESH_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const MADHESH_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/2__madhesh/'

export const MADHESH_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

