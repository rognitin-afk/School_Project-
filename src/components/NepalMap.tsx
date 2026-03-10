import { useEffect, useRef, useCallback } from 'react'
import L from 'leaflet'
import type { GeoJsonData, SidebarProps, ElectionResultsMap } from '../types'
import {
  PROVINCE_NAMES,
  PROVINCE_FILL_COLORS,
  PROVINCE_POPULATIONS,
  PARTY_COLORS,
  PARTY_LABELS,
} from '../constants'
import { MAP_PINS } from '../data/mapPins'

import 'leaflet/dist/leaflet.css'

const defaultStyle = {
  color: '#6699ff',
  weight: 1.5,
  fillColor: '#cfe5ff',
  fillOpacity: 0.9,
}

const selectedStyle = {
  color: '#1d4ed8',
  weight: 2.2,
  fillColor: '#1d4ed8',
  fillOpacity: 0.95,
}

export type MapOverlayMode = 'default' | 'election' | 'turnout'

function turnoutToColor(percent: number): string {
  const min = 50
  const max = 90
  const t = Math.max(min, Math.min(max, percent))
  const ratio = (t - min) / (max - min)
  const r = Math.round(34 + (22 - 34) * ratio)
  const g = Math.round(197 + (163 - 197) * ratio)
  const b = Math.round(94 + (48 - 94) * ratio)
  return `rgb(${r},${g},${b})`
}

interface NepalMapProps {
  fullData: GeoJsonData | null
  mode: 'country' | 'province'
  currentProvinceCode: number | null
  selectedConstituencyCode: string | null
  mapOverlayMode: MapOverlayMode
  electionResults: ElectionResultsMap
  partyFilter: string
  onZoomToProvince: (provinceCode: number) => void
  onSelectConstituency: (props: SidebarProps) => void
  onResetView: () => void
}

export function NepalMap({
  fullData,
  mode,
  currentProvinceCode,
  selectedConstituencyCode,
  mapOverlayMode,
  electionResults,
  partyFilter,
  onZoomToProvince,
  onSelectConstituency,
  onResetView,
}: NepalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const nepalLayerRef = useRef<L.GeoJSON | null>(null)
  const provinceLayerRef = useRef<L.GeoJSON | null>(null)
  const selectedLayerRef = useRef<L.Path | null>(null)
  const pinsLayerRef = useRef<L.LayerGroup | null>(null)
  const fullBoundsRef = useRef<L.LatLngBounds | null>(null)

  const clearSelection = useCallback(() => {
    if (selectedLayerRef.current) {
      selectedLayerRef.current.setStyle(defaultStyle)
      selectedLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !fullData) return

    const map = L.map(containerRef.current, { zoomControl: false })
    L.control.zoom({ position: 'topleft' }).addTo(map)
    mapRef.current = map

    return () => {
      if (pinsLayerRef.current) {
        map.removeLayer(pinsLayerRef.current)
        pinsLayerRef.current = null
      }
      map.remove()
      mapRef.current = null
      nepalLayerRef.current = null
      provinceLayerRef.current = null
      selectedLayerRef.current = null
    }
  }, [fullData])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !fullData) return

    function getBaseStyleForFeature(
      feature: GeoJSON.Feature,
      viewMode: 'country' | 'province'
    ): L.PathOptions {
      const props = feature?.properties as Record<string, unknown> | undefined
      const provinceCode = props?.FIRST_STAT as number | undefined
      const horCode = props?.HOR_CODE as string | undefined
      if (viewMode === 'country') {
        const fill = provinceCode != null ? PROVINCE_FILL_COLORS[provinceCode] ?? '#e5e7eb' : '#e5e7eb'
        return {
          stroke: false,
          color: '#ffffff',
          weight: 0,
          fillColor: fill,
          fillOpacity: 0.9,
        }
      }
      if (viewMode === 'province' && horCode && (mapOverlayMode === 'election' || mapOverlayMode === 'turnout')) {
        const result = electionResults[horCode]
        const base = { ...defaultStyle, weight: 1.2, color: '#475569' }
        if (mapOverlayMode === 'election' && result?.partyId) {
          const fill = PARTY_COLORS[result.partyId] ?? PARTY_COLORS.other
          const matchesParty = !partyFilter || result.partyId === partyFilter
          return {
            ...base,
            fillColor: matchesParty ? fill : '#cbd5e1',
            fillOpacity: matchesParty ? 0.85 : 0.35,
          }
        }
        if (mapOverlayMode === 'turnout' && result?.turnoutPercent != null) {
          return { ...base, fillColor: turnoutToColor(result.turnoutPercent), fillOpacity: 0.9 }
        }
      }
      return defaultStyle
    }

    function attachFeatureHandlers(
      feature: GeoJSON.Feature,
      layer: L.Layer,
      viewMode: 'country' | 'province'
    ) {
      const props = (feature?.properties ?? {}) as Record<string, unknown>
      const district = props.DISTRICT as string | undefined
      const provinceCode = props.FIRST_STAT as number | undefined
      const constituencyCode = props.HOR_CODE as string | undefined
      const province =
        provinceCode != null ? (PROVINCE_NAMES[provinceCode] ?? String(provinceCode)) : ''

      const baseStyle = getBaseStyleForFeature(feature, viewMode)
      const hoverStyle =
        viewMode === 'country'
          ? { ...baseStyle, fillOpacity: 1 }
          : {
              color: '#2563eb',
              weight: 2.2,
              fillColor: '#e0f2fe',
              fillOpacity: 1,
            }

      layer.on('mouseover', function (this: L.Layer) {
        if (this !== selectedLayerRef.current && (this as L.Path).setStyle) {
          (this as L.Path).setStyle(hoverStyle)
        }
      })
      layer.on('mouseout', function (this: L.Layer) {
        if (this !== selectedLayerRef.current && (this as L.Path).setStyle) {
          (this as L.Path).setStyle(baseStyle)
        }
      })

      const lines: string[] = []
      if (viewMode === 'country') {
        if (province) lines.push('Province: ' + province)
        const pop = provinceCode != null ? PROVINCE_POPULATIONS[provinceCode] : undefined
        if (pop) lines.push('Population: ' + pop)
      } else {
        if (constituencyCode) lines.push('Constituency: ' + constituencyCode)
        if (district) lines.push('District: ' + district)
        if (province) lines.push('Province: ' + province)
      }
      if (lines.length) {
        ;(layer as L.Layer & { bindTooltip: (c: string, o?: L.TooltipOptions) => void }).bindTooltip(
          lines.join('<br />'),
          { sticky: false, direction: 'top', opacity: 0.95 }
        )
      }

      layer.on('click', function (this: L.Layer) {
        const pCode = props.FIRST_STAT as number | undefined
        const hCode = props.HOR_CODE as string | undefined
        if (viewMode === 'country' && pCode != null) {
          onZoomToProvince(pCode)
          return
        }
        if (selectedLayerRef.current && selectedLayerRef.current !== this) {
          ;(selectedLayerRef.current as L.Path).setStyle(defaultStyle)
        }
        selectedLayerRef.current = this as L.Path
        ;(this as L.Path).setStyle(selectedStyle)
        onSelectConstituency({
          DISTRICT: String(district ?? ''),
          FIRST_STAT: pCode ?? 0,
          HOR_CODE: hCode ?? '',
        })
      })
    }

    function buildLayerFromFeatures(
      features: GeoJSON.Feature[],
      viewMode: 'country' | 'province'
    ): L.GeoJSON {
      const collection: GeoJSON.FeatureCollection = { type: 'FeatureCollection', features }
      return L.geoJSON(collection as GeoJSON.GeoJsonObject, {
        style: (feature) => getBaseStyleForFeature(feature!, viewMode),
        onEachFeature: (feature, layer) => attachFeatureHandlers(feature, layer, viewMode),
      })
    }

    if (nepalLayerRef.current) {
      map.removeLayer(nepalLayerRef.current)
      nepalLayerRef.current = null
    }
    if (provinceLayerRef.current) {
      map.removeLayer(provinceLayerRef.current)
      provinceLayerRef.current = null
    }
    if (pinsLayerRef.current) {
      map.removeLayer(pinsLayerRef.current)
      pinsLayerRef.current = null
    }
    clearSelection()

    if (mode === 'country') {
      const layer = buildLayerFromFeatures(fullData.features as GeoJSON.Feature[], 'country')
      layer.addTo(map)
      nepalLayerRef.current = layer
      const bounds = layer.getBounds()
      fullBoundsRef.current = bounds
      map.fitBounds(bounds)
      map.setMaxBounds(bounds.pad(0.05))
    } else if (currentProvinceCode != null) {
      const provinceFeatures = fullData.features.filter(
        (f) => (f.properties as unknown as Record<string, unknown>)?.FIRST_STAT === currentProvinceCode
      )
      const layer = buildLayerFromFeatures(provinceFeatures as GeoJSON.Feature[], 'province')
      layer.addTo(map)
      provinceLayerRef.current = layer
      const bounds = layer.getBounds()
      map.fitBounds(bounds)
      map.setMaxBounds(bounds.pad(0.05))
    }

    const pinIcon = L.divIcon({
      className: 'map-pin-icon',
      html: '<span aria-hidden="true">📍</span>',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    })
    const pinsGroup = L.layerGroup()
    MAP_PINS.forEach((pin) => {
      const marker = L.marker([pin.lat, pin.lng], { icon: pinIcon })
      marker.bindPopup(pin.label)
      pinsGroup.addLayer(marker)
    })
    pinsGroup.addTo(map)
    pinsLayerRef.current = pinsGroup
  }, [fullData, mode, currentProvinceCode, mapOverlayMode, electionResults, partyFilter, onZoomToProvince, onSelectConstituency, clearSelection])

  // When selectedConstituencyCode changes (from dropdown or candidates box), highlight and zoom to that layer
  useEffect(() => {
    if (!selectedConstituencyCode || mode !== 'province') return
    const map = mapRef.current
    const layer = provinceLayerRef.current
    if (!map || !layer) return
    layer.eachLayer((l: L.Layer) => {
      const feat = (l as L.Layer & { feature?: GeoJSON.Feature }).feature
      const p = feat?.properties as Record<string, unknown> | undefined
      if (p?.HOR_CODE === selectedConstituencyCode) {
        if (selectedLayerRef.current && selectedLayerRef.current !== l) {
          selectedLayerRef.current.setStyle(defaultStyle)
        }
        selectedLayerRef.current = l as L.Path
        ;(l as L.Path).setStyle(selectedStyle)
        onSelectConstituency({
          DISTRICT: String(p?.DISTRICT ?? ''),
          FIRST_STAT: (p?.FIRST_STAT as number) ?? 0,
          HOR_CODE: String(p?.HOR_CODE ?? ''),
        })
        const path = l as L.Path
        if (path.getBounds) {
          const bounds = path.getBounds()
          map.fitBounds(bounds.pad(0.15))
        }
      }
    })
  }, [selectedConstituencyCode, mode, onSelectConstituency])

  const showLegend = mode === 'province' && (mapOverlayMode === 'election' || mapOverlayMode === 'turnout')

  return (
    <div className="map-wrapper">
      <div ref={containerRef} className="map-container" />
      <button type="button" className="reset-view-btn" onClick={onResetView}>
        Show whole Nepal
      </button>
      {showLegend && (
        <div className="map-legend">
          {mapOverlayMode === 'election' && (
            <>
              <span className="map-legend-title">Party (past election)</span>
              <div className="map-legend-items">
                {Object.entries(PARTY_COLORS).map(([id, color]) => (
                  <span key={id} className="map-legend-item">
                    <i style={{ background: color }} />
                    {PARTY_LABELS[id] ?? id}
                  </span>
                ))}
              </div>
            </>
          )}
          {mapOverlayMode === 'turnout' && (
            <>
              <span className="map-legend-title">Voter turnout %</span>
              <div className="map-legend-turnout">
                <i style={{ background: turnoutToColor(50) }} />
                <span>50%</span>
                <span>→</span>
                <i style={{ background: turnoutToColor(90) }} />
                <span>90%</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
