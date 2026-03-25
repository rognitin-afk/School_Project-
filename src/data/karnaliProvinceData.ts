/**
 * Karnali Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/6__karnali/
 */
export const karnaliPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 925_246 },
  { year: '1991', date: '1991-06-22', population: 1_085_328 },
  { year: '2001', date: '2001-05-28', population: 1_311_567 },
  { year: '2011', date: '2011-06-22', population: 1_570_418 },
  { year: '2021', date: '2021-11-25', population: 1_688_412 },
] as const

export const karnaliProvinceMeta = {
  name: 'Karnali',
  nameNative: 'कर्णाली प्रदेश',
  transcription: 'Karṇālī',
  status: 'Province',
  country: 'Nepal',
} as const

export const karnaliGender2021 = {
  Males: 823_761,
  Females: 864_651,
} as const

export const karnaliBroadAge2021 = {
  '0–14 years': 558_891,
  '15–64 years': 1_043_026,
  '65+ years': 86_495,
} as const

export const karnaliAgeDistribution2021 = [
  { label: '90+ years', value: 1_238 },
  { label: '80–89 years', value: 7_254 },
  { label: '70–79 years', value: 43_223 },
  { label: '60–69 years', value: 82_767 },
  { label: '50–59 years', value: 123_389 },
  { label: '40–49 years', value: 159_194 },
  { label: '30–39 years', value: 211_119 },
  { label: '20–29 years', value: 304_593 },
  { label: '10–19 years', value: 405_116 },
  { label: '0–9 years', value: 350_519 },
] as const

export const karnaliCitizenship2021 = {
  Nepal: 1_687_699,
  India: 691,
  'Other Citizenship': 22,
} as const

export const karnaliPlaceOfBirth2021 = {
  'Same local unit': 1_436_164,
  'Other local unit in same district': 101_604,
  'Other district': 144_508,
  'Other country': 5_441,
} as const

export const karnaliLiteracyAge5Plus2021 = {
  Yes: 1_156_194,
  'Only reading': 8_980,
  No: 352_697,
} as const

export const KARNALI_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const KARNALI_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/6__karnali/'

export const KARNALI_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

