import { Link } from 'react-router-dom'

export function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <span className="topbar-brand">MDNF</span>
        <span className="topbar-tagline">Schools we have helped · More to come</span>

        <nav className="topbar-nav">
          <Link to="/mdnf" className="topbar-link">
            About MDNF
          </Link>
        </nav>
      </div>
    </header>
  )
}
