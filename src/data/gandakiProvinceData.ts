/**
 * Gandaki Province – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/4__gandaki/
 */
export const gandakiPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 1_710_574 },
  { year: '1991', date: '1991-06-22', population: 1_968_233 },
  { year: '2001', date: '2001-05-28', population: 2_316_702 },
  { year: '2011', date: '2011-06-22', population: 2_403_757 },
  { year: '2021', date: '2021-11-25', population: 2_466_427 },
] as const

export const gandakiProvinceMeta = {
  name: 'Gandaki',
  nameNative: 'गण्डकी प्रदेश',
  transcription: 'Gaṇḍakī',
  status: 'Province',
  country: 'Nepal',
} as const

export const gandakiGender2021 = {
  Males: 1_170_833,
  Females: 1_295_594,
} as const

export const gandakiBroadAge2021 = {
  '0–14 years': 588_768,
  '15–64 years': 1_650_742,
  '65+ years': 226_917,
} as const

export const gandakiAgeDistribution2021 = [
  { label: '90+ years', value: 6_558 },
  { label: '80–89 years', value: 33_301 },
  { label: '70–79 years', value: 105_018 },
  { label: '60–69 years', value: 184_230 },
  { label: '50–59 years', value: 245_045 },
  { label: '40–49 years', value: 282_426 },
  { label: '30–39 years', value: 354_957 },
  { label: '20–29 years', value: 429_879 },
  { label: '10–19 years', value: 454_060 },
  { label: '0–9 years', value: 370_953 },
] as const

export const gandakiCitizenship2021 = {
  Nepal: 2_453_472,
  India: 12_321,
  'Other Citizenship': 612,
} as const

export const gandakiPlaceOfBirth2021 = {
  'Same local unit': 1_623_644,
  'Other local unit in same district': 282_306,
  'Other district': 515_484,
  'Other country': 42_015,
} as const

export const gandakiLiteracyAge5Plus2021 = {
  Yes: 1_875_910,
  'Only reading': 18_252,
  No: 399_642,
} as const

export const GANDAKI_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const GANDAKI_DATA_SOURCE_URL = 'https://www.citypopulation.de/en/nepal/admin/4__gandaki/'

export const GANDAKI_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

