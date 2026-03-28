/**
 * External “Know [district]” pages. Keys match `districtFilter` lowercased (e.g. "rautahat").
 */
export const DISTRICT_KNOW_MORE_URL = {
  rautahat: 'https://know-rautahat.vercel.app/',
} as const

export type DistrictKnowMoreKey = keyof typeof DISTRICT_KNOW_MORE_URL
