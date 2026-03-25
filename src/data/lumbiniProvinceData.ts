/**
 * Lumbini Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/5__lumbini/
 */
export const lumbiniPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 2_448_650 },
  { year: '1991', date: '1991-06-22', population: 3_127_531 },
  { year: '2001', date: '2001-05-28', population: 3_955_719 },
  { year: '2011', date: '2011-06-22', population: 4_499_272 },
  { year: '2021', date: '2021-11-25', population: 5_122_078 },
] as const

export const lumbiniProvinceMeta = {
  name: 'Lumbini',
  nameNative: 'लुम्बिनी प्रदेश',
  transcription: 'Lumbinī',
  status: 'Province',
  country: 'Nepal',
} as const

export const lumbiniGender2021 = {
  Males: 2_454_408,
  Females: 2_667_670,
} as const

export const lumbiniBroadAge2021 = {
  '0–14 years': 1_460_857,
  '15–64 years': 3_329_821,
  '65+ years': 331_400,
} as const

export const lumbiniAgeDistribution2021 = [
  { label: '90+ years', value: 6_964 },
  { label: '80–89 years', value: 34_624 },
  { label: '70–79 years', value: 158_892 },
  { label: '60–69 years', value: 289_279 },
  { label: '50–59 years', value: 415_728 },
  { label: '40–49 years', value: 538_670 },
  { label: '30–39 years', value: 739_033 },
  { label: '20–29 years', value: 937_131 },
  { label: '10–19 years', value: 1_063_978 },
  { label: '0–9 years', value: 937_779 },
] as const

export const lumbiniCitizenship2021 = {
  Nepal: 5_103_243,
  India: 18_681,
  'Other Citizenship': 150,
} as const

export const lumbiniPlaceOfBirth2021 = {
  'Same local unit': 3_647_334,
  'Other local unit in same district': 387_880,
  'Other district': 897_654,
  'Other country': 187_177,
} as const

export const lumbiniLiteracyAge5Plus2021 = {
  Yes: 3_655_933,
  'Only reading': 25_233,
  No: 998_751,
} as const

export const LUMBINI_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const LUMBINI_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/5__lumbini/'

export const LUMBINI_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

