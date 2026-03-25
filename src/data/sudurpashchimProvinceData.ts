/**
 * Sudurpashchim Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/7__sudurpashchim/
 */
export const sudurpashchimPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 1_320_089 },
  { year: '1991', date: '1991-06-22', population: 1_679_301 },
  { year: '2001', date: '2001-05-28', population: 2_191_330 },
  { year: '2011', date: '2011-06-22', population: 2_552_517 },
  { year: '2021', date: '2021-11-25', population: 2_694_783 },
] as const

export const sudurpashchimProvinceMeta = {
  name: 'Sudurpashchim',
  nameNative: 'सुदूरपश्चिम प्रदेश',
  transcription: 'Sudūrapaścima',
  status: 'Province',
  country: 'Nepal',
} as const

export const sudurpashchimGender2021 = {
  Males: 1_272_786,
  Females: 1_421_997,
} as const

export const sudurpashchimBroadAge2021 = {
  '0–14 years': 835_727,
  '15–64 years': 1_682_400,
  '65+ years': 176_656,
} as const

export const sudurpashchimAgeDistribution2021 = [
  { label: '90+ years', value: 4_087 },
  { label: '80–89 years', value: 18_876 },
  { label: '70–79 years', value: 90_391 },
  { label: '60–69 years', value: 141_196 },
  { label: '50–59 years', value: 209_386 },
  { label: '40–49 years', value: 267_354 },
  { label: '30–39 years', value: 356_012 },
  { label: '20–29 years', value: 473_805 },
  { label: '10–19 years', value: 622_297 },
  { label: '0–9 years', value: 511_379 },
] as const

export const sudurpashchimCitizenship2021 = {
  Nepal: 2_688_327,
  India: 6_401,
  'Other Citizenship': 55,
} as const

export const sudurpashchimPlaceOfBirth2021 = {
  'Same local unit': 1_974_946,
  'Other local unit in same district': 215_651,
  'Other district': 473_751,
  'Other country': 29_539,
} as const

export const sudurpashchimLiteracyAge5Plus2021 = {
  Yes: 1_871_952,
  'Only reading': 15_640,
  No: 566_996,
} as const

export const SUDURPASHCHIM_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const SUDURPASHCHIM_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/7__sudurpashchim/'

export const SUDURPASHCHIM_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

