import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoDark from '../assets/white_logo.png'

const NAV = [
  { label: 'Home',    path: '/'        },
  { label: 'Work',    path: '/projects' },
  { label: 'Contact', path: '/contact'  },
]

const Sidebar = ({ open, onClose }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => { onClose?.() }, [pathname])

  return (
    <>
      {/* Backdrop */}
      <div
        className="mob-backdrop"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={() => onClose?.()}
      />

      {/* Panel */}
      <aside
        className="mob-panel"
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="mob-header">
          <Link to="/" className="mob-logo-link">
            <img src={logoDark} alt="Leavingstone" className="mob-logo-img" />
          </Link>
          <button
            className="mob-close-btn"
            onClick={() => onClose?.()}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        {/* Nav */}
        <nav className="mob-nav">
          <span className="mob-nav-eyebrow">Navigation</span>

          {NAV.map(({ label, path }, i) => {
            const active = pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`mob-nav-link${active ? ' mob-nav-link--active' : ''}`}
              >
                <span className="mob-nav-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mob-nav-name">{label}</span>
                <span className="mob-nav-arrow">→</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="mob-footer">
          <div className="mob-status">
            <span className="mob-dot">
              <span className="mob-dot-ping" />
              <span className="mob-dot-core" />
            </span>
            <span className="mob-status-text">Available for work</span>
          </div>
          <p className="mob-location">Tbilisi, Georgia · GMT +4</p>
          <p className="mob-copy">© 2026 Leavingstone</p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
