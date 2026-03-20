import { Link } from 'react-router-dom'
import { MAP_PINS, getPinByLabel } from '../data/mapPins'

interface SidebarProps {
  selectedSchool: string | null
  district?: string
}

export function Sidebar({ selectedSchool, district }: SidebarProps) {
  if (!selectedSchool) {
    if (district) {
      const schoolsInDistrict = MAP_PINS.filter(
        (p) => p.district && p.district.toLowerCase() === district.toLowerCase()
      )

      if (schoolsInDistrict.length > 0) {
        return (
          <aside className="sidebar">
            <h2>Schools in {district}</h2>
            {schoolsInDistrict.map((school) => {
              const slug = school.slug ?? school.label.toLowerCase().replace(/\s+/g, '-')
              const image = school.sidebarImage || school.image
              return (
                <div key={school.label} className="sidebar-school-card">
                  <p className="sidebar-school-name">{school.label}</p>
                  {image && (
                    <img src={image} alt={school.label} className="sidebar-school-img" />
                  )}
                  <Link to={`/school/${slug}`} className="sidebar-know-more-btn">
                    Know more
                  </Link>
                </div>
              )
            })}
            <p className="meta">More schools to come.</p>
          </aside>
        )
      }
    }

    return (
      <aside className="sidebar">
        <h2>Progress report</h2>
        <p className="meta">Choose a school from the dropdown or click a pin on the map. More schools to come.</p>
      </aside>
    )
  }

  const pin = getPinByLabel(selectedSchool)
  const slug = pin?.slug ?? selectedSchool.toLowerCase().replace(/\s+/g, '-')

  return (
    <aside className="sidebar">
      <h2>School name</h2>
      <p className="sidebar-school-name">{selectedSchool}</p>
      {pin && (pin.sidebarImage || pin.image) && (
        <img src={pin.sidebarImage || pin.image} alt={selectedSchool} className="sidebar-school-img" />
      )}
      <Link to={`/school/${slug}`} className="sidebar-know-more-btn">
        Know more
      </Link>
      <p className="meta">More schools to come.</p>
    </aside>
  )
}
