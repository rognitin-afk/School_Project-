/**
 * Bagmati Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/3__bagmati/
 */
export const bagmatiPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 2_781_147 },
  { year: '1991', date: '1991-06-22', population: 3_505_092 },
  { year: '2001', date: '2001-05-28', population: 4_569_597 },
  { year: '2011', date: '2011-06-22', population: 5_529_452 },
  { year: '2021', date: '2021-11-25', population: 6_116_866 },
] as const

export const bagmatiProvinceMeta = {
  name: 'Bagmati',
  nameNative: 'बागमती प्रदेश',
  transcription: 'Bāgamatī',
  status: 'Province',
  country: 'Nepal',
} as const

export const bagmatiGender2021 = {
  Males: 3_048_684,
  Females: 3_068_182,
} as const

export const bagmatiBroadAge2021 = {
  '0–14 years': 1_353_714,
  '15–64 years': 4_321_401,
  '65+ years': 441_751,
} as const

export const bagmatiAgeDistribution2021 = [
  { label: '90+ years', value: 12_493 },
  { label: '80–89 years', value: 66_116 },
  { label: '70–79 years', value: 202_276 },
  { label: '60–69 years', value: 372_964 },
  { label: '50–59 years', value: 581_165 },
  { label: '40–49 years', value: 765_630 },
  { label: '30–39 years', value: 996_336 },
  { label: '20–29 years', value: 1_182_202 },
  { label: '10–19 years', value: 1_081_509 },
  { label: '0–9 years', value: 856_175 },
] as const

export const bagmatiCitizenship2021 = {
  Nepal: 6_065_096,
  India: 48_361,
  'Other Citizenship': 3_256,
} as const

export const bagmatiPlaceOfBirth2021 = {
  'Same local unit': 3_396_954,
  'Other local unit in same district': 491_378,
  'Other district': 2_137_357,
  'Other country': 90_384,
} as const

export const bagmatiLiteracyAge5Plus2021 = {
  Yes: 4_692_353,
  'Only reading': 20_526,
  No: 1_005_281,
} as const

export const BAGMATI_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const BAGMATI_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/3__bagmati/'

export const BAGMATI_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

