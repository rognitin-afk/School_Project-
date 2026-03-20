import { useState, useEffect, useCallback } from 'react'
import { Topbar } from './components/Topbar'
import { FiltersBar } from './components/FiltersBar'
import { NepalMap } from './components/NepalMap'
import { Sidebar } from './components/Sidebar'
import { KantipurNewsSection } from './components/KantipurNewsSection'
import { RautahatDistrictPanel } from './components/RautahatDistrictPanel'
import { fetchGeoJson } from './api/geojson'
import { buildHierarchy } from './utils/hierarchy'
import { MAP_PINS } from './data/mapPins'
import type { GeoJsonData, Hierarchy } from './types'

function App() {
  const [fullData, setFullData] = useState<GeoJsonData | null>(null)
  const [hierarchy, setHierarchy] = useState<Hierarchy | null>(null)
  const [mode, setMode] = useState<'country' | 'province'>('country')
  const [currentProvinceCode, setCurrentProvinceCode] = useState<number | null>(null)
  const [provinceFilter, setProvinceFilter] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')
  const [selectedSchool, setSelectedSchool] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGeoJson()
      .then((geo) => {
        setFullData(geo)
        setHierarchy(buildHierarchy(geo.features ?? []))
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
    setSelectedSchool('')
  }, [])

  const handleResetView = useCallback(() => {
    setMode('country')
    setCurrentProvinceCode(null)
    setProvinceFilter('')
    setDistrictFilter('')
    setSelectedSchool('')
  }, [])

  const handleProvinceChange = useCallback((code: string) => {
    setProvinceFilter(code)
    setDistrictFilter('')
    setSelectedSchool('')
    if (!code) {
      setMode('country')
      setCurrentProvinceCode(null)
      return
    }
    setMode('province')
    setCurrentProvinceCode(Number(code))
  }, [])

  const handleDistrictChange = useCallback((name: string) => {
    setDistrictFilter(name)
    setSelectedSchool('')
  }, [])

  const handleSchoolChange = useCallback((label: string) => {
    setSelectedSchool(label)
  }, [])

  const handleSelectSchool = useCallback((label: string) => {
    setSelectedSchool(label)
  }, [])

  const handleSelectDistrictFromMap = useCallback((name: string) => {
    setDistrictFilter(name)
    setSelectedSchool('')
  }, [])

  const showRautahatStats = districtFilter.trim().toLowerCase() === 'rautahat'

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
        schoolName={selectedSchool}
        schools={MAP_PINS}
        onProvinceChange={handleProvinceChange}
        onDistrictChange={handleDistrictChange}
        onSchoolChange={handleSchoolChange}
      />
      <div className="layout">
        <div className="layout-map-area">
          <NepalMap
            fullData={fullData}
            mode={mode}
            currentProvinceCode={currentProvinceCode}
            selectedSchool={selectedSchool || null}
            onZoomToProvince={handleZoomToProvince}
            onSelectSchool={handleSelectSchool}
            onResetView={handleResetView}
            onSelectDistrict={handleSelectDistrictFromMap}
          />
        </div>
        <Sidebar selectedSchool={selectedSchool || null} district={districtFilter || undefined} />
      </div>
      {showRautahatStats && <RautahatDistrictPanel />}
      <KantipurNewsSection />
    </div>
  )
}

export default App
