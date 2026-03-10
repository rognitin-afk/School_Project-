import { useState, useEffect, useCallback } from 'react'
import { Topbar } from './components/Topbar'
import { FiltersBar } from './components/FiltersBar'
import { NepalMap } from './components/NepalMap'
import { Sidebar } from './components/Sidebar'
import { ProvinceCandidatesBox } from './components/ProvinceCandidatesBox'
import { CompareCandidates } from './components/CompareCandidates'
import { fetchGeoJson } from './api/geojson'
import { fetchCandidates } from './api/candidates'
import { fetchElectionResults } from './api/electionResults'
import { buildHierarchy } from './utils/hierarchy'
import type { GeoJsonData, CandidatesMap, Hierarchy, SidebarProps, ElectionResultsMap } from './types'
import type { MapOverlayMode } from './components/NepalMap'

function App() {
  const [fullData, setFullData] = useState<GeoJsonData | null>(null)
  const [candidates, setCandidates] = useState<CandidatesMap>({})
  const [hierarchy, setHierarchy] = useState<Hierarchy | null>(null)
  const [electionResults, setElectionResults] = useState<ElectionResultsMap>({})
  const [sidebarProps, setSidebarProps] = useState<SidebarProps | null>(null)
  const [mode, setMode] = useState<'country' | 'province'>('country')
  const [currentProvinceCode, setCurrentProvinceCode] = useState<number | null>(null)
  const [provinceFilter, setProvinceFilter] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')
  const [constituencyFilter, setConstituencyFilter] = useState('')
  const [mapOverlayMode, setMapOverlayMode] = useState<MapOverlayMode>('default')
  const [partyFilter, setPartyFilter] = useState('')
  const [compareOpen, setCompareOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([fetchGeoJson(), fetchCandidates(), fetchElectionResults()])
      .then(([geo, cand, results]) => {
        setFullData(geo)
        setCandidates(cand)
        setHierarchy(buildHierarchy(geo.features ?? []))
        setElectionResults(results)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      })
  }, [])

  const handleZoomToProvince = useCallback((provinceCode: number) => {
    setMode('province')
    setCurrentProvinceCode(provinceCode)
    setProvinceFilter(String(provinceCode))
    setDistrictFilter('')
    setConstituencyFilter('')
    setSidebarProps(null)
  }, [])

  const handleSelectConstituency = useCallback((props: SidebarProps) => {
    setSidebarProps(props)
  }, [])

  const handleResetView = useCallback(() => {
    setMode('country')
    setCurrentProvinceCode(null)
    setProvinceFilter('')
    setDistrictFilter('')
    setConstituencyFilter('')
    setSidebarProps(null)
  }, [])

  const handleProvinceChange = useCallback((code: string) => {
    setProvinceFilter(code)
    setDistrictFilter('')
    setConstituencyFilter('')
    if (!code) {
      setMode('country')
      setCurrentProvinceCode(null)
      setSidebarProps(null)
      return
    }
    setMode('province')
    setCurrentProvinceCode(Number(code))
    setSidebarProps(null)
  }, [])

  const handleDistrictChange = useCallback((name: string) => {
    setDistrictFilter(name)
    setConstituencyFilter('')
  }, [])

  const handleConstituencyChange = useCallback((code: string) => {
    setConstituencyFilter(code)
    if (code && hierarchy && provinceFilter) {
      const districtData = hierarchy[provinceFilter]?.districts[districtFilter]
      const feat = districtData?.constituencies?.find((c) => c === code)
      if (feat) {
        setSidebarProps({
          DISTRICT: districtFilter,
          FIRST_STAT: Number(provinceFilter),
          HOR_CODE: code,
        })
      }
    }
  }, [hierarchy, provinceFilter, districtFilter])

  const handleSelectCandidateFromBox = useCallback(
    (horCode: string, district: string, firstStat: number) => {
      setDistrictFilter(district)
      setConstituencyFilter(horCode)
      setSidebarProps({
        DISTRICT: district,
        FIRST_STAT: firstStat,
        HOR_CODE: horCode,
      })
    },
    []
  )

  if (error) {
    return (
      <div className="app-error">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Topbar />
      <FiltersBar
        hierarchy={hierarchy}
        provinceCode={provinceFilter}
        district={districtFilter}
        constituencyCode={constituencyFilter}
        showOverlayControl={mode === 'province'}
        mapOverlayMode={mapOverlayMode}
        onMapOverlayChange={setMapOverlayMode}
        partyFilter={partyFilter}
        onPartyFilterChange={setPartyFilter}
        onCompareClick={() => setCompareOpen(true)}
        onProvinceChange={handleProvinceChange}
        onDistrictChange={handleDistrictChange}
        onConstituencyChange={handleConstituencyChange}
      />
      <div className="layout">
        <div className="layout-map-area">
          <NepalMap
            fullData={fullData}
            mode={mode}
            currentProvinceCode={currentProvinceCode}
            selectedConstituencyCode={constituencyFilter || null}
            mapOverlayMode={mapOverlayMode}
            electionResults={electionResults}
            partyFilter={partyFilter}
            onZoomToProvince={handleZoomToProvince}
            onSelectConstituency={handleSelectConstituency}
            onResetView={handleResetView}
          />
          {mode === 'province' && currentProvinceCode != null && (
            <ProvinceCandidatesBox
              provinceCode={currentProvinceCode}
              candidates={candidates}
              hierarchy={hierarchy}
              selectedConstituencyCode={constituencyFilter || null}
              onSelectCandidate={handleSelectCandidateFromBox}
            />
          )}
        </div>
        <Sidebar props={sidebarProps} candidates={candidates} />
      </div>
      <CompareCandidates
        candidates={candidates}
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
      />
    </div>
  )
}

export default App
