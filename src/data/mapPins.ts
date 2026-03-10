/**
 * Custom pins (schools, offices, etc.) to show on the map.
 * Coordinates: [latitude, longitude], label for popup.
 */
export interface MapPin {
  lat: number
  lng: number
  label: string
}

export const MAP_PINS: MapPin[] = [
  {
    lat: 26.774278,
    lng: 85.317477,
    label: 'Mhath Tole',
  },
]
