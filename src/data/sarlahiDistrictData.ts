/**
 * Sarlahi district – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/madhesh/19__sarlahi/
 */

export const sarlahiPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 398_766 },
  { year: '1991', date: '1991-06-22', population: 492_798 },
  { year: '2001', date: '2001-05-28', population: 635_701 },
  { year: '2011', date: '2011-06-22', population: 769_729 },
  { year: '2021', date: '2021-11-25', population: 862_470 },
] as const

export const sarlahiDistrictMeta = {
  name: 'Sarlahi',
  nameNative: 'सर्लाही जिल्ला',
  transcription: 'Sarlāhī',
  status: 'District',
  province: 'Madhesh',
} as const

export const sarlahiGender2021 = {
  Males: 435_131,
  Females: 427_339,
} as const

export const sarlahiBroadAge2021 = {
  '0–14 years': 283_940,
  '15–64 years': 525_416,
  '65+ years': 53_114,
} as const

export const sarlahiAgeDistribution2021 = [
  { label: '90+ years', value: 1_139 },
  { label: '80–89 years', value: 4_734 },
  { label: '70–79 years', value: 26_811 },
  { label: '60–69 years', value: 44_885 },
  { label: '50–59 years', value: 61_846 },
  { label: '40–49 years', value: 85_049 },
  { label: '30–39 years', value: 112_741 },
  { label: '20–29 years', value: 149_979 },
  { label: '10–19 years', value: 190_385 },
  { label: '0–9 years', value: 184_901 },
] as const

export const sarlahiCitizenship2021 = {
  Nepal: 860_122,
  India: 2_327,
  'Other Citizenship': 18,
} as const

export const sarlahiPlaceOfBirth2021 = {
  'Same local unit': 662_118,
  'Other local unit in same district': 92_771,
  'Other district': 80_322,
  'Other country': 27_131,
} as const

export const sarlahiLiteracyAge5Plus2021 = {
  Yes: 467_669,
  'Only reading': 1_477,
  No: 306_128,
} as const

export const SARLAHI_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const SARLAHI_DATA_SOURCE_URL =
  'https://www.citypopulation.de/en/nepal/admin/madhesh/19__sarlahi/'

export const SARLAHI_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  slate: '#64748b',
  cyan: '#0891b2',
} as const

