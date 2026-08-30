import { useState } from 'react'

 
function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { id: 'dashboard', label: 'Home' },
    { id: 'plants', label: 'My Plants' },
    { id: 'add', label: 'Add Plant' },
    { id: 'tips', label: 'Care Tips' },
  ]

  function handleNavigate(page) {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <button
          className="navbar-brand"
          onClick={() => handleNavigate('dashboard')}
        >
          <span className="navbar-brand-icon">🌿</span>
          <span>GreenCare</span>
        </button>

        <nav className={`navbar-links ${menuOpen ? 'navbar-links-open' : ''}`}>
          {links.map((link) => (
            <button
              key={link.id}
              className={`navbar-link ${currentPage === link.id ? 'navbar-link-active' : ''}`}
              onClick={() => handleNavigate(link.id)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
