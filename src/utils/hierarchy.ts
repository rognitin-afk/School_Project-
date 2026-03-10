import type { Hierarchy } from '../types'
import { PROVINCE_NAMES } from '../constants'

export function buildHierarchy(features: { properties?: { FIRST_STAT?: number; DISTRICT?: string; HOR_CODE?: string } }[]): Hierarchy {
  const map: Hierarchy = {}
  features.forEach((f) => {
    const props = f.properties || {}
    const pCode = props.FIRST_STAT
    const district = props.DISTRICT
    const constCode = props.HOR_CODE
    if (pCode == null || !district || !constCode) return
    if (!map[pCode]) {
      map[pCode] = {
        name: PROVINCE_NAMES[pCode] ?? String(pCode),
        districts: {},
      }
    }
    if (!map[pCode].districts[district]) {
      map[pCode].districts[district] = { constituencies: [] }
    }
    const arr = map[pCode].districts[district].constituencies
    if (!arr.includes(constCode)) arr.push(constCode)
  })
  Object.values(map).forEach((prov) => {
    Object.values(prov.districts).forEach((d) => {
      d.constituencies.sort()
    })
  })
  return map
}
