import { useState, useEffect, useCallback } from 'react'
import { Topbar } from './components/Topbar'
import { FiltersBar } from './components/FiltersBar'
import { NepalMap } from './components/NepalMap'
import { Sidebar } from './components/Sidebar'
import { KantipurNewsSection } from './components/KantipurNewsSection'
import { RautahatDistrictPanel } from './components/RautahatDistrictPanel'
import { MadheshProvincePanel } from './components/MadheshProvincePanel'
import { BagmatiProvincePanel } from './components/BagmatiProvincePanel'
import { LumbiniProvincePanel } from './components/LumbiniProvincePanel'
import { KoshiProvincePanel } from './components/KoshiProvincePanel'
import { GandakiProvincePanel } from './components/GandakiProvincePanel'
import { KarnaliProvincePanel } from './components/KarnaliProvincePanel'
import { SudurpashchimProvincePanel } from './components/SudurpashchimProvincePanel'
import { SarlahiDistrictPanel } from './components/SarlahiDistrictPanel'
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
  const showSarlahiStats = districtFilter.trim().toLowerCase() === 'sarlahi'
  const showAnyMadheshDistrictStats = showRautahatStats || showSarlahiStats
  const showMadheshStats = provinceFilter === '2' && !showAnyMadheshDistrictStats
  const showBagmatiStats = provinceFilter === '3'
  const showLumbiniStats = provinceFilter === '5'
  const showKoshiStats = provinceFilter === '1'
  const showGandakiStats = provinceFilter === '4'
  const showKarnaliStats = provinceFilter === '6'
  const showSudurpashchimStats = provinceFilter === '7'

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
      {showKoshiStats && <KoshiProvincePanel />}
      {showMadheshStats && <MadheshProvincePanel />}
      {showBagmatiStats && <BagmatiProvincePanel />}
      {showGandakiStats && <GandakiProvincePanel />}
      {showLumbiniStats && <LumbiniProvincePanel />}
      {showKarnaliStats && <KarnaliProvincePanel />}
      {showSudurpashchimStats && <SudurpashchimProvincePanel />}
      {showSarlahiStats && <SarlahiDistrictPanel />}
      {showRautahatStats && <RautahatDistrictPanel />}
      <KantipurNewsSection />
    </div>
  )
}

export default App
