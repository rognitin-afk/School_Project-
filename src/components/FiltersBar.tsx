import type { Hierarchy } from '../types'
import type { MapOverlayMode } from './NepalMap'

interface FiltersBarProps {
  hierarchy: Hierarchy | null
  provinceCode: string
  district: string
  constituencyCode: string
  showOverlayControl?: boolean
  mapOverlayMode?: MapOverlayMode
  onMapOverlayChange?: (mode: MapOverlayMode) => void
  partyFilter?: string
  onPartyFilterChange?: (partyId: string) => void
  onCompareClick?: () => void
  onProvinceChange: (code: string) => void
  onDistrictChange: (name: string) => void
  onConstituencyChange: (code: string) => void
}

export function FiltersBar({
  hierarchy,
  provinceCode,
  district,
  constituencyCode,
  showOverlayControl,
  mapOverlayMode = 'default',
  onMapOverlayChange,
  partyFilter = '',
  onPartyFilterChange,
  onCompareClick,
  onProvinceChange,
  onDistrictChange,
  onConstituencyChange,
}: FiltersBarProps) {
  const provinceCodes = hierarchy ? Object.keys(hierarchy).sort((a, b) => Number(a) - Number(b)) : []
  const districts = hierarchy && provinceCode ? Object.keys(hierarchy[provinceCode]?.districts ?? {}).sort() : []
  const constituencies = hierarchy && provinceCode && district
    ? (hierarchy[provinceCode]?.districts[district]?.constituencies ?? [])
    : []

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
          <label htmlFor="const-select">House Of Representative No.</label>
          <select
            id="const-select"
            value={constituencyCode}
            disabled={!district}
            onChange={(e) => onConstituencyChange(e.target.value)}
          >
            <option value="">Choose</option>
            {constituencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        {onCompareClick && (
          <div className="filter-group filter-group-action">
            <label>&nbsp;</label>
            <button type="button" className="compare-trigger-btn" onClick={onCompareClick}>
              Compare candidates
            </button>
          </div>
        )}
      </div>
      {showOverlayControl && onMapOverlayChange && (
        <div className="filters-row filters-row-overlay">
          <div className="filter-group">
            <label htmlFor="overlay-select">Map overlay</label>
            <select
              id="overlay-select"
              value={mapOverlayMode}
              onChange={(e) => onMapOverlayChange(e.target.value as MapOverlayMode)}
            >
              <option value="default">Default</option>
              <option value="election">By party (past election)</option>
              <option value="turnout">By turnout %</option>
            </select>
          </div>
          {mapOverlayMode === 'election' && onPartyFilterChange && (
            <div className="filter-group">
              <label htmlFor="party-select">Party</label>
              <select
                id="party-select"
                value={partyFilter}
                onChange={(e) => onPartyFilterChange(e.target.value)}
              >
                <option value="">All parties</option>
                <option value="uml">UML</option>
                <option value="nc">NC</option>
                <option value="maoist">Maoist</option>
                <option value="rsp">RSP</option>
                <option value="jsp">JSP</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
