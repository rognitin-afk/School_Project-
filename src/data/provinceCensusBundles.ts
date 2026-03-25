import {
  BAGMATI_CHART_COLORS,
  BAGMATI_DATA_SOURCE_LABEL,
  BAGMATI_DATA_SOURCE_URL,
  bagmatiAgeDistribution2021,
  bagmatiBroadAge2021,
  bagmatiCitizenship2021,
  bagmatiGender2021,
  bagmatiLiteracyAge5Plus2021,
  bagmatiPlaceOfBirth2021,
  bagmatiPopulationByCensus,
  bagmatiProvinceMeta,
} from './bagmatiProvinceData'
import {
  GANDAKI_CHART_COLORS,
  GANDAKI_DATA_SOURCE_LABEL,
  GANDAKI_DATA_SOURCE_URL,
  gandakiAgeDistribution2021,
  gandakiBroadAge2021,
  gandakiCitizenship2021,
  gandakiGender2021,
  gandakiLiteracyAge5Plus2021,
  gandakiPlaceOfBirth2021,
  gandakiPopulationByCensus,
  gandakiProvinceMeta,
} from './gandakiProvinceData'
import {
  KARNALI_CHART_COLORS,
  KARNALI_DATA_SOURCE_LABEL,
  KARNALI_DATA_SOURCE_URL,
  karnaliAgeDistribution2021,
  karnaliBroadAge2021,
  karnaliCitizenship2021,
  karnaliGender2021,
  karnaliLiteracyAge5Plus2021,
  karnaliPlaceOfBirth2021,
  karnaliPopulationByCensus,
  karnaliProvinceMeta,
} from './karnaliProvinceData'
import {
  KOSHI_CHART_COLORS,
  KOSHI_DATA_SOURCE_LABEL,
  KOSHI_DATA_SOURCE_URL,
  koshiAgeDistribution2021,
  koshiBroadAge2021,
  koshiCitizenship2021,
  koshiGender2021,
  koshiLiteracyAge5Plus2021,
  koshiPlaceOfBirth2021,
  koshiPopulationByCensus,
  koshiProvinceMeta,
} from './koshiProvinceData'
import {
  LUMBINI_CHART_COLORS,
  LUMBINI_DATA_SOURCE_LABEL,
  LUMBINI_DATA_SOURCE_URL,
  lumbiniAgeDistribution2021,
  lumbiniBroadAge2021,
  lumbiniCitizenship2021,
  lumbiniGender2021,
  lumbiniLiteracyAge5Plus2021,
  lumbiniPlaceOfBirth2021,
  lumbiniPopulationByCensus,
  lumbiniProvinceMeta,
} from './lumbiniProvinceData'
import {
  MADHESH_CHART_COLORS,
  MADHESH_DATA_SOURCE_LABEL,
  MADHESH_DATA_SOURCE_URL,
  madheshAgeDistribution2021,
  madheshBroadAge2021,
  madheshCitizenship2021,
  madheshGender2021,
  madheshLiteracyAge5Plus2021,
  madheshPlaceOfBirth2021,
  madheshPopulationByCensus,
  madheshProvinceMeta,
} from './madheshProvinceData'
import {
  SUDURPASHCHIM_CHART_COLORS,
  SUDURPASHCHIM_DATA_SOURCE_LABEL,
  SUDURPASHCHIM_DATA_SOURCE_URL,
  sudurpashchimAgeDistribution2021,
  sudurpashchimBroadAge2021,
  sudurpashchimCitizenship2021,
  sudurpashchimGender2021,
  sudurpashchimLiteracyAge5Plus2021,
  sudurpashchimPlaceOfBirth2021,
  sudurpashchimPopulationByCensus,
  sudurpashchimProvinceMeta,
} from './sudurpashchimProvinceData'

export type CensusPopulationRow = { year: string; date: string; population: number }

export type ProvinceCensusMeta = {
  name: string
  nameNative: string
  status: string
  transcription?: string
  country?: string
}

export type ProvinceCensusBundle = {
  provinceMeta: ProvinceCensusMeta
  populationByCensus: readonly CensusPopulationRow[]
  gender2021: Record<string, number>
  broadAge2021: Record<string, number>
  ageDistribution2021: readonly { label: string; value: number }[]
  citizenship2021: Record<string, number>
  placeOfBirth2021: Record<string, number>
  literacyAge5Plus2021: Record<string, number>
  chartColors: {
    blue: string
    orange: string
    green: string
    red: string
    slate: string
    cyan: string
  }
  dataSourceLabel: string
  dataSourceUrl: string
}

export function getProvinceCensusBundle(provinceCode: string): ProvinceCensusBundle | null {
  switch (provinceCode) {
    case '1':
      return {
        provinceMeta: { ...koshiProvinceMeta },
        populationByCensus: koshiPopulationByCensus,
        gender2021: { ...koshiGender2021 },
        broadAge2021: { ...koshiBroadAge2021 },
        ageDistribution2021: koshiAgeDistribution2021,
        citizenship2021: { ...koshiCitizenship2021 },
        placeOfBirth2021: { ...koshiPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...koshiLiteracyAge5Plus2021 },
        chartColors: { ...KOSHI_CHART_COLORS },
        dataSourceLabel: KOSHI_DATA_SOURCE_LABEL,
        dataSourceUrl: KOSHI_DATA_SOURCE_URL,
      }
    case '2':
      return {
        provinceMeta: { ...madheshProvinceMeta },
        populationByCensus: madheshPopulationByCensus,
        gender2021: { ...madheshGender2021 },
        broadAge2021: { ...madheshBroadAge2021 },
        ageDistribution2021: madheshAgeDistribution2021,
        citizenship2021: { ...madheshCitizenship2021 },
        placeOfBirth2021: { ...madheshPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...madheshLiteracyAge5Plus2021 },
        chartColors: { ...MADHESH_CHART_COLORS },
        dataSourceLabel: MADHESH_DATA_SOURCE_LABEL,
        dataSourceUrl: MADHESH_DATA_SOURCE_URL,
      }
    case '3':
      return {
        provinceMeta: { ...bagmatiProvinceMeta },
        populationByCensus: bagmatiPopulationByCensus,
        gender2021: { ...bagmatiGender2021 },
        broadAge2021: { ...bagmatiBroadAge2021 },
        ageDistribution2021: bagmatiAgeDistribution2021,
        citizenship2021: { ...bagmatiCitizenship2021 },
        placeOfBirth2021: { ...bagmatiPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...bagmatiLiteracyAge5Plus2021 },
        chartColors: { ...BAGMATI_CHART_COLORS },
        dataSourceLabel: BAGMATI_DATA_SOURCE_LABEL,
        dataSourceUrl: BAGMATI_DATA_SOURCE_URL,
      }
    case '4':
      return {
        provinceMeta: { ...gandakiProvinceMeta },
        populationByCensus: gandakiPopulationByCensus,
        gender2021: { ...gandakiGender2021 },
        broadAge2021: { ...gandakiBroadAge2021 },
        ageDistribution2021: gandakiAgeDistribution2021,
        citizenship2021: { ...gandakiCitizenship2021 },
        placeOfBirth2021: { ...gandakiPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...gandakiLiteracyAge5Plus2021 },
        chartColors: { ...GANDAKI_CHART_COLORS },
        dataSourceLabel: GANDAKI_DATA_SOURCE_LABEL,
        dataSourceUrl: GANDAKI_DATA_SOURCE_URL,
      }
    case '5':
      return {
        provinceMeta: { ...lumbiniProvinceMeta },
        populationByCensus: lumbiniPopulationByCensus,
        gender2021: { ...lumbiniGender2021 },
        broadAge2021: { ...lumbiniBroadAge2021 },
        ageDistribution2021: lumbiniAgeDistribution2021,
        citizenship2021: { ...lumbiniCitizenship2021 },
        placeOfBirth2021: { ...lumbiniPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...lumbiniLiteracyAge5Plus2021 },
        chartColors: { ...LUMBINI_CHART_COLORS },
        dataSourceLabel: LUMBINI_DATA_SOURCE_LABEL,
        dataSourceUrl: LUMBINI_DATA_SOURCE_URL,
      }
    case '6':
      return {
        provinceMeta: { ...karnaliProvinceMeta },
        populationByCensus: karnaliPopulationByCensus,
        gender2021: { ...karnaliGender2021 },
        broadAge2021: { ...karnaliBroadAge2021 },
        ageDistribution2021: karnaliAgeDistribution2021,
        citizenship2021: { ...karnaliCitizenship2021 },
        placeOfBirth2021: { ...karnaliPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...karnaliLiteracyAge5Plus2021 },
        chartColors: { ...KARNALI_CHART_COLORS },
        dataSourceLabel: KARNALI_DATA_SOURCE_LABEL,
        dataSourceUrl: KARNALI_DATA_SOURCE_URL,
      }
    case '7':
      return {
        provinceMeta: { ...sudurpashchimProvinceMeta },
        populationByCensus: sudurpashchimPopulationByCensus,
        gender2021: { ...sudurpashchimGender2021 },
        broadAge2021: { ...sudurpashchimBroadAge2021 },
        ageDistribution2021: sudurpashchimAgeDistribution2021,
        citizenship2021: { ...sudurpashchimCitizenship2021 },
        placeOfBirth2021: { ...sudurpashchimPlaceOfBirth2021 },
        literacyAge5Plus2021: { ...sudurpashchimLiteracyAge5Plus2021 },
        chartColors: { ...SUDURPASHCHIM_CHART_COLORS },
        dataSourceLabel: SUDURPASHCHIM_DATA_SOURCE_LABEL,
        dataSourceUrl: SUDURPASHCHIM_DATA_SOURCE_URL,
      }
    default:
      return null
  }
}
