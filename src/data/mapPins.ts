/**
 * Schools we have helped – one pin per school.
 * Add more schools here (every district, etc.) as we expand.
 */
export interface MapPin {
  lat: number
  lng: number
  label: string
  district?: string
  /** Primary image path for Know more page */
  image?: string
  /** Optional sidebar image (if different from main image) */
  sidebarImage?: string
  /** URL slug for Know more page (e.g. mhath-tole) */
  slug?: string
}

export const MAP_PINS: MapPin[] = [
  {
    lat: 26.774278,
    lng: 85.317477,
    label: 'Mhath Tole',
    district: '',
    image: '/candidate-images/image.png',
    slug: 'mhath-tole',
  },
  {
    lat: 26.7826866,
    lng: 85.3023004,
    label: 'Shre Ram Naresh Laxman Secondry school Hajminiya',
    district: '',
    image: '/School image/RamNareshSchool/Ramnareshschool.png',
    sidebarImage: '/candidate-images/schoolRamNaresah.png',
    slug: 'shre-ram-naresh-laxman-secondary-school-hajminiya',
  },
]

export function getPinBySlug(slug: string): MapPin | undefined {
  return MAP_PINS.find((p) => (p.slug ?? p.label.toLowerCase().replace(/\s+/g, '-')) === slug)
}

export function getPinByLabel(label: string): MapPin | undefined {
  return MAP_PINS.find((p) => p.label === label)
}
