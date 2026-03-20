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
    district: 'Rautahat',
    image: '/candidate-images/image.png',
    slug: 'mhath-tole',
  },
  {
    lat: 26.7826866,
    lng: 85.3023004,
    label: 'Shre Ram Naresh Laxman Secondry school Hajminiya',
    district: 'Rautahat',
    image: '/School image/RamNareshSchool/Ramnareshschool.png',
    sidebarImage: '/candidate-images/schoolRamNaresah.png',
    slug: 'shre-ram-naresh-laxman-secondary-school-hajminiya',
  },
  {
    // Approximate coordinates near Ram Naresh school – adjust later if needed
    lat: 26.7832,
    lng: 85.3045,
    label: 'Shree Basic school Hajminiya Patahi',
    district: 'Rautahat',
    image: '/School image/Shree Basic school Hajminiya Patahi/Shree Basic school Hajminiya Patahi.png',
    slug: 'shree-basic-school-hajminiya-patahi',
  },
  {
    // Approximate coordinates for Janta Model Secondary School – update if you have exact lat/lng
    lat: 26.803,
    lng: 85.302,
    label: 'Janta Model secondary school',
    district: 'Rautahat',
    image: '/School image/Janta Model secondary school/Janta Model secondary school.png',
    slug: 'janta-model-secondary-school',
  },
  {
    lat: 26.7609677,
    lng: 85.2729177,
    label: 'Judh Mabi Multiple Campus',
    district: 'Rautahat',
    image: '/School image/judh/judha.png',
    slug: 'judh-mabi-multiple-campus',
  },
]

export function getPinBySlug(slug: string): MapPin | undefined {
  return MAP_PINS.find((p) => (p.slug ?? p.label.toLowerCase().replace(/\s+/g, '-')) === slug)
}

export function getPinByLabel(label: string): MapPin | undefined {
  return MAP_PINS.find((p) => p.label === label)
}
