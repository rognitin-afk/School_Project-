/**
 * Koshi Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/1__koshi/
 */
export const koshiPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 2_954_510 },
  { year: '1991', date: '1991-06-22', population: 3_520_335 },
  { year: '2001', date: '2001-05-28', population: 4_201_795 },
  { year: '2011', date: '2011-06-22', population: 4_534_943 },
  { year: '2021', date: '2021-11-25', population: 4_961_412 },
] as const

export const koshiProvinceMeta = {
  name: 'Koshi',
  nameNative: 'कोशी प्रदेश',
  transcription: 'Kośī',
  status: 'Province',
  country: 'Nepal',
} as const

export const koshiGender2021 = {
  Males: 2_417_328,
  Females: 2_544_084,
} as const

export const koshiBroadAge2021 = {
  '0–14 years': 1_289_376,
  '15–64 years': 3_299_165,
  '65+ years': 372_871,
} as const

export const koshiAgeDistribution2021 = [
  { label: '90+ years', value: 8_402 },
  { label: '80–89 years', value: 48_665 },
  { label: '70–79 years', value: 171_734 },
  { label: '60–69 years', value: 327_663 },
  { label: '50–59 years', value: 472_176 },
  { label: '40–49 years', value: 571_985 },
  { label: '30–39 years', value: 723_851 },
  { label: '20–29 years', value: 865_680 },
  { label: '10–19 years', value: 936_938 },
  { label: '0–9 years', value: 834_318 },
] as const

export const koshiCitizenship2021 = {
  Nepal: 4_942_158,
  India: 19_019,
  'Other Citizenship': 228,
} as const

export const koshiPlaceOfBirth2021 = {
  'Same local unit': 3_325_125,
  'Other local unit in same district': 445_007,
  'Other district': 1_046_154,
  'Other country': 143_510,
} as const

export const koshiLiteracyAge5Plus2021 = {
  Yes: 3_648_225,
  'Only reading': 11_469,
  No: 918_528,
} as const

export const KOSHI_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const KOSHI_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/1__koshi/'

export const KOSHI_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

