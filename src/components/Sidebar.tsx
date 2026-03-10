import { Link } from 'react-router-dom'
import { getPinByLabel } from '../data/mapPins'

interface SidebarProps {
  selectedSchool: string | null
}

export function Sidebar({ selectedSchool }: SidebarProps) {
  if (!selectedSchool) {
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
      <h2>We helped</h2>
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
