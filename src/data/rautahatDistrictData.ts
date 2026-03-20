/**
 * Rautahat district – census highlights (Nepal).
 * Figures align with City Population (source: CBS Nepal).
 * @see https://www.citypopulation.de/en/nepal/admin/madhesh/32__rautahat/
 */

export const rautahatPopulationByCensus = [
  { year: '1981', date: '1981-06-22', population: 332_526 },
  { year: '1991', date: '1991-06-22', population: 414_005 },
  { year: '2001', date: '2001-05-28', population: 545_132 },
  { year: '2011', date: '2011-06-22', population: 686_722 },
  { year: '2021', date: '2021-11-25', population: 813_573 },
] as const

/** Summary metrics (2021 census + area), as shown on City Population. */
export const rautahatKeyStats = {
  population2021: 813_573,
  areaKm2: 1_126,
  densityPerKm2: 722.5,
  /** Average annual population change 2011–2021 (%) */
  annualChange2011to2021Percent: 1.6,
} as const

export const rautahatDistrictMeta = {
  name: 'Rautahat',
  nameNative: 'रौतहट जिल्ला',
  status: 'District',
  province: 'Madhesh',
} as const

export const rautahatGender2021 = {
  Males: 408_403,
  Females: 405_170,
} as const

export const rautahatBroadAge2021 = {
  '0–14 years': 298_922,
  '15–64 years': 467_400,
  '65+ years': 47_251,
} as const

/** 10-year age bands, Census 2021 (City Population table). */
export const rautahatAgeDistribution2021 = [
  { label: '90+ years', value: 958 },
  { label: '80–89 years', value: 4_117 },
  { label: '70–79 years', value: 24_362 },
  { label: '60–69 years', value: 36_819 },
  { label: '50–59 years', value: 52_468 },
  { label: '40–49 years', value: 75_085 },
  { label: '30–39 years', value: 99_223 },
  { label: '20–29 years', value: 135_648 },
  { label: '10–19 years', value: 183_384 },
  { label: '0–9 years', value: 201_509 },
] as const

export const rautahatCitizenship2021 = {
  Nepal: 811_534,
  India: 2_026,
  'Other citizenship': 13,
} as const

export const rautahatPlaceOfBirth2021 = {
  'Same local unit': 653_685,
  'Other local unit in same district': 82_761,
  'Other district': 50_367,
  'Other country': 26_666,
} as const

export const rautahatLiteracyAge5Plus2021 = {
  Yes: 413_631,
  'Only reading': 2_387,
  No: 300_155,
} as const

export const RAUTAHAT_DATA_SOURCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Presentation aligned with City Population.'

export const RAUTAHAT_DATA_SOURCE_URL =
  'https://www.citypopulation.de/en/nepal/admin/madhesh/32__rautahat/'

/** Chart colors (similar palette to City Population). */
export const RAUTAHAT_CHART_COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  purple: '#7c3aed',
  slate: '#64748b',
  cyan: '#0891b2',
} as const
