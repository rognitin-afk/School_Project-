import { useEffect, useRef, useCallback } from 'react'
import L from 'leaflet'
import type { GeoJsonData } from '../types'
import {
  PROVINCE_NAMES,
  PROVINCE_FILL_COLORS,
  PROVINCE_POPULATIONS,
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

interface NepalMapProps {
  fullData: GeoJsonData | null
  mode: 'country' | 'province'
  currentProvinceCode: number | null
  selectedSchool: string | null
  onZoomToProvince: (provinceCode: number) => void
  onSelectSchool: (label: string) => void
  onResetView: () => void
}

export function NepalMap({
  fullData,
  mode,
  currentProvinceCode,
  selectedSchool,
  onZoomToProvince,
  onSelectSchool,
  onResetView,
}: NepalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const nepalLayerRef = useRef<L.GeoJSON | null>(null)
  const provinceLayerRef = useRef<L.GeoJSON | null>(null)
  const selectedLayerRef = useRef<L.Path | null>(null)
  const pinsLayerRef = useRef<L.LayerGroup | null>(null)

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
        if (viewMode === 'country' && pCode != null) {
          onZoomToProvince(pCode)
          return
        }
        if (selectedLayerRef.current && selectedLayerRef.current !== this) {
          ;(selectedLayerRef.current as L.Path).setStyle(defaultStyle)
        }
        selectedLayerRef.current = this as L.Path
        ;(this as L.Path).setStyle(selectedStyle)
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
      marker.on('click', () => onSelectSchool(pin.label))
      pinsGroup.addLayer(marker)
    })
    pinsGroup.addTo(map)
    pinsLayerRef.current = pinsGroup
  }, [fullData, mode, currentProvinceCode, onZoomToProvince, onSelectSchool, clearSelection])

  useEffect(() => {
    if (!selectedSchool) return
    const map = mapRef.current
    const pin = MAP_PINS.find((p) => p.label === selectedSchool)
    if (!map || !pin) return
    map.flyTo([pin.lat, pin.lng], 14, { duration: 0.5 })
  }, [selectedSchool])

  return (
    <div className="map-wrapper">
      <div ref={containerRef} className="map-container" />
      <button type="button" className="reset-view-btn" onClick={onResetView}>
        Show whole Nepal
      </button>
    </div>
  )
}
