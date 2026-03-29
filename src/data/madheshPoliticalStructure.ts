/**
 * Madhesh Pradesh — administrative & Madhesi Dalit political representation (from app notes; local election context ~2022).
 */

export const madheshAdministrativeStructure = {
  totalDistricts: 8,
  totalLocalUnits: 136,
  totalWards: 1_271,
  metropolitanCity: 1,
  subMetropolitanCities: 3,
  municipalities: 73,
  ruralMunicipalities: 58,
} as const

export type WardByDistrict = { district: string; wards: number }

/** Ward counts by district (sums to 1,271). */
export const madheshWardsByDistrict: readonly WardByDistrict[] = [
  { district: 'Sarlahi', wards: 200 },
  { district: 'Bara', wards: 167 },
  { district: 'Dhanusa', wards: 169 },
  { district: 'Siraha', wards: 164 },
  { district: 'Saptari', wards: 164 },
  { district: 'Rautahat', wards: 157 },
  { district: 'Mahottari', wards: 138 },
  { district: 'Parsa', wards: 112 },
] as const

export type DalitSeatRow = {
  position: string
  totalSeats: number
  dalitHolds: number
  pctRepresentation: number
}

/** Madhesi Dalit holds vs total seats (2022 local elections). */
export const madhesiDalitRepresentation2022: readonly DalitSeatRow[] = [
  { position: 'Mayor / Chair', totalSeats: 136, dalitHolds: 1, pctRepresentation: 0.73 },
  { position: 'Deputy Mayor / Vice Chair', totalSeats: 136, dalitHolds: 1, pctRepresentation: 0.73 },
  { position: 'Ward chairs', totalSeats: 1_271, dalitHolds: 21, pctRepresentation: 1.65 },
] as const

export const madhesiDalitPoliticalGap = {
  madhesiDalitPopulation: 999_852,
  pctOfMadheshPopulation: 16.35,
  mayorsProportionalNote: '~22 out of 136',
  mayorsActual: 1,
  missingMayors: 21,
  wardChairsProportionalNote: '~208 out of 1,271',
  wardChairsActual: 21,
  missingWardChairs: 187,
} as const
