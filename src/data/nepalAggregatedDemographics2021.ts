/**
 * Nepal national demographic indicators (2021) by summing the seven province-level
 * census tables used elsewhere in the app (CBS Nepal via City Population).
 */
import type { ProvinceCensusBundle } from './provinceCensusBundles'
import { bagmatiPopulationByCensus } from './bagmatiProvinceData'
import { gandakiPopulationByCensus } from './gandakiProvinceData'
import { karnaliPopulationByCensus } from './karnaliProvinceData'
import { koshiPopulationByCensus } from './koshiProvinceData'
import { lumbiniPopulationByCensus } from './lumbiniProvinceData'
import { madheshPopulationByCensus } from './madheshProvinceData'
import { sudurpashchimPopulationByCensus } from './sudurpashchimProvinceData'
import { bagmatiAgeDistribution2021, bagmatiBroadAge2021, bagmatiCitizenship2021, bagmatiGender2021, bagmatiLiteracyAge5Plus2021, bagmatiPlaceOfBirth2021 } from './bagmatiProvinceData'
import { gandakiAgeDistribution2021, gandakiBroadAge2021, gandakiCitizenship2021, gandakiGender2021, gandakiLiteracyAge5Plus2021, gandakiPlaceOfBirth2021 } from './gandakiProvinceData'
import { karnaliAgeDistribution2021, karnaliBroadAge2021, karnaliCitizenship2021, karnaliGender2021, karnaliLiteracyAge5Plus2021, karnaliPlaceOfBirth2021 } from './karnaliProvinceData'
import { koshiAgeDistribution2021, koshiBroadAge2021, koshiCitizenship2021, koshiGender2021, koshiLiteracyAge5Plus2021, koshiPlaceOfBirth2021 } from './koshiProvinceData'
import { lumbiniAgeDistribution2021, lumbiniBroadAge2021, lumbiniCitizenship2021, lumbiniGender2021, lumbiniLiteracyAge5Plus2021, lumbiniPlaceOfBirth2021 } from './lumbiniProvinceData'
import { madheshAgeDistribution2021, madheshBroadAge2021, madheshCitizenship2021, madheshGender2021, madheshLiteracyAge5Plus2021, madheshPlaceOfBirth2021 } from './madheshProvinceData'
import { sudurpashchimAgeDistribution2021, sudurpashchimBroadAge2021, sudurpashchimCitizenship2021, sudurpashchimGender2021, sudurpashchimLiteracyAge5Plus2021, sudurpashchimPlaceOfBirth2021 } from './sudurpashchimProvinceData'
import { KOSHI_CHART_COLORS } from './koshiProvinceData'

const PROVINCE_TABLES = [
  { pop: koshiPopulationByCensus, gender: koshiGender2021, broad: koshiBroadAge2021, age: koshiAgeDistribution2021, cit: koshiCitizenship2021, birth: koshiPlaceOfBirth2021, lit: koshiLiteracyAge5Plus2021 },
  { pop: madheshPopulationByCensus, gender: madheshGender2021, broad: madheshBroadAge2021, age: madheshAgeDistribution2021, cit: madheshCitizenship2021, birth: madheshPlaceOfBirth2021, lit: madheshLiteracyAge5Plus2021 },
  { pop: bagmatiPopulationByCensus, gender: bagmatiGender2021, broad: bagmatiBroadAge2021, age: bagmatiAgeDistribution2021, cit: bagmatiCitizenship2021, birth: bagmatiPlaceOfBirth2021, lit: bagmatiLiteracyAge5Plus2021 },
  { pop: gandakiPopulationByCensus, gender: gandakiGender2021, broad: gandakiBroadAge2021, age: gandakiAgeDistribution2021, cit: gandakiCitizenship2021, birth: gandakiPlaceOfBirth2021, lit: gandakiLiteracyAge5Plus2021 },
  { pop: lumbiniPopulationByCensus, gender: lumbiniGender2021, broad: lumbiniBroadAge2021, age: lumbiniAgeDistribution2021, cit: lumbiniCitizenship2021, birth: lumbiniPlaceOfBirth2021, lit: lumbiniLiteracyAge5Plus2021 },
  { pop: karnaliPopulationByCensus, gender: karnaliGender2021, broad: karnaliBroadAge2021, age: karnaliAgeDistribution2021, cit: karnaliCitizenship2021, birth: karnaliPlaceOfBirth2021, lit: karnaliLiteracyAge5Plus2021 },
  { pop: sudurpashchimPopulationByCensus, gender: sudurpashchimGender2021, broad: sudurpashchimBroadAge2021, age: sudurpashchimAgeDistribution2021, cit: sudurpashchimCitizenship2021, birth: sudurpashchimPlaceOfBirth2021, lit: sudurpashchimLiteracyAge5Plus2021 },
] as const

function sumNumericRecords(
  records: readonly Readonly<Record<string, number>>[],
): Record<string, number> {
  const out: Record<string, number> = {}
  for (const r of records) {
    for (const [k, v] of Object.entries(r)) {
      out[k] = (out[k] ?? 0) + v
    }
  }
  return out
}

function sumAgeDistributions(
  arrays: readonly ReadonlyArray<{ readonly label: string; readonly value: number }>[],
): { label: string; value: number }[] {
  const map = new Map<string, number>()
  for (const arr of arrays) {
    for (const { label, value } of arr) {
      map.set(label, (map.get(label) ?? 0) + value)
    }
  }
  return [...map.entries()].map(([label, value]) => ({ label, value }))
}

export const nepalPopulationByCensus = koshiPopulationByCensus.map((row, i) => ({
  year: row.year,
  date: row.date,
  population: PROVINCE_TABLES.reduce((s, p) => s + p.pop[i]!.population, 0),
}))

export const nepalGender2021 = sumNumericRecords(PROVINCE_TABLES.map((p) => p.gender))
export const nepalBroadAge2021 = sumNumericRecords(PROVINCE_TABLES.map((p) => p.broad))
export const nepalCitizenship2021 = sumNumericRecords(PROVINCE_TABLES.map((p) => p.cit))
export const nepalPlaceOfBirth2021 = sumNumericRecords(PROVINCE_TABLES.map((p) => p.birth))
export const nepalLiteracyAge5Plus2021 = sumNumericRecords(PROVINCE_TABLES.map((p) => p.lit))
export const nepalAgeDistribution2021 = sumAgeDistributions(PROVINCE_TABLES.map((p) => p.age))

export const nepalDemographicsMeta = {
  name: 'Nepal',
  nameNative: 'नेपाल',
  status: 'Country',
  transcription: 'Nepāl',
  country: 'Nepal',
} as const

export const NEPAL_AGGREGATED_DATA_SOURCE_NOTE =
  'Totals are the sum of NPHC 2021 province-level tables as used in this app (CBS Nepal, presentation aligned with City Population).'

export const NEPAL_AGGREGATED_REFERENCE_LABEL =
  'Central Bureau of Statistics Nepal (Census). Provincial tables via City Population.'

export const NEPAL_AGGREGATED_REFERENCE_URL = 'https://www.citypopulation.de/en/nepal/'

export const nepalAggregateCensusBundle: ProvinceCensusBundle = {
  provinceMeta: {
    name: nepalDemographicsMeta.name,
    nameNative: nepalDemographicsMeta.nameNative,
    status: nepalDemographicsMeta.status,
    transcription: nepalDemographicsMeta.transcription,
    country: nepalDemographicsMeta.country,
  },
  populationByCensus: nepalPopulationByCensus,
  gender2021: nepalGender2021,
  broadAge2021: nepalBroadAge2021,
  ageDistribution2021: nepalAgeDistribution2021,
  citizenship2021: nepalCitizenship2021,
  placeOfBirth2021: nepalPlaceOfBirth2021,
  literacyAge5Plus2021: nepalLiteracyAge5Plus2021,
  chartColors: { ...KOSHI_CHART_COLORS },
  dataSourceLabel: NEPAL_AGGREGATED_REFERENCE_LABEL,
  dataSourceUrl: NEPAL_AGGREGATED_REFERENCE_URL,
}

export const nepalAggregateKeyStatTitle = 'Contents: Population'
