import { Link, useLocation } from 'react-router-dom'
import { Plane, Hotel, Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Header.css'

function Header() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Plane className="logo-icon" />
          <span className="logo-text">TravelBooking</span>
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <Link 
            to="/flights" 
            className={`nav-link ${isActive('/flights') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Plane size={20} />
            <span>Flights</span>
          </Link>
          <Link 
            to="/hotels" 
            className={`nav-link ${isActive('/hotels') ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Hotel size={20} />
            <span>Hotels</span>
          </Link>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
