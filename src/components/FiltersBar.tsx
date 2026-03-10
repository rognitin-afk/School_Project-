import type { Hierarchy } from '../types'
import type { MapPin } from '../data/mapPins'

interface FiltersBarProps {
  hierarchy: Hierarchy | null
  provinceCode: string
  district: string
  schoolName: string
  schools: MapPin[]
  onProvinceChange: (code: string) => void
  onDistrictChange: (name: string) => void
  onSchoolChange: (label: string) => void
}

export function FiltersBar({
  hierarchy,
  provinceCode,
  district,
  schoolName,
  schools,
  onProvinceChange,
  onDistrictChange,
  onSchoolChange,
}: FiltersBarProps) {
  const provinceCodes = hierarchy ? Object.keys(hierarchy).sort((a, b) => Number(a) - Number(b)) : []
  const districts = hierarchy && provinceCode ? Object.keys(hierarchy[provinceCode]?.districts ?? {}).sort() : []
  const schoolsInDistrict =
    district && schools.length
      ? schools.filter((s) => (s.district ?? '').toLowerCase() === district.toLowerCase())
      : []
  const schoolList = district && schoolsInDistrict.length > 0 ? schoolsInDistrict : schools

  return (
    <div className="filters-bar">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="province-select">Province</label>
          <select
            id="province-select"
            value={provinceCode}
            onChange={(e) => onProvinceChange(e.target.value)}
          >
            <option value="">Choose</option>
            {provinceCodes.map((code) => (
              <option key={code} value={code}>
                {hierarchy?.[code]?.name ?? code}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="district-select">District</label>
          <select
            id="district-select"
            value={district}
            disabled={!provinceCode}
            onChange={(e) => onDistrictChange(e.target.value)}
          >
            <option value="">Choose</option>
            {districts.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="school-select">School name</label>
          <select
            id="school-select"
            value={schoolName}
            onChange={(e) => onSchoolChange(e.target.value)}
          >
            <option value="">Choose</option>
            {schoolList.map((s) => (
              <option key={s.label} value={s.label}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
