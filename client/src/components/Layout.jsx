import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoDark from '../assets/white_logo.png'

const NAV = [
  { label: 'Home',    path: '/'         },
  { label: 'Work',    path: '/projects' },
  { label: 'Contact', path: '/contact'  },
]

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false)
  const { pathname }    = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <div className="relative">

      {/* ── Backdrop ────────────────────────────────────────────── */}
      <div
        onClick={() => setOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-[3px]
          lg:hidden transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside
        data-cursor-light
        className={`
          fixed inset-y-0 left-0 z-50 w-64 flex flex-col
          bg-[#0e0e0e] border-r border-white/[0.06]
          transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="px-8 pt-9 pb-7 border-b border-white/[0.06]">
          <Link to="/" onClick={() => setOpen(false)}>
            <img src={logoDark} alt="Leavingstone" className="h-6 w-auto" />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-5 py-8 flex flex-col gap-0.5 overflow-y-auto">
          <p className="px-3 mb-5 text-[9px] font-semibold tracking-[3px] text-white/20 uppercase select-none">
            Navigation
          </p>

          {NAV.map(({ label, path }) => {
            const active = pathname === path
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={`
                  relative group flex items-center gap-3 px-3 py-2.5 rounded-lg
                  text-[12px] font-semibold tracking-[2px] uppercase
                  transition-all duration-200
                  ${active
                    ? 'text-[#3ba6a1] bg-[#3ba6a1]/[0.08]'
                    : 'text-white/35 hover:text-white/70 hover:bg-white/[0.04]'
                  }
                `}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full bg-[#3ba6a1]" />
                )}
                <span className={`
                  flex-shrink-0 w-1 h-1 rounded-full transition-colors duration-200
                  ${active ? 'bg-[#3ba6a1]' : 'bg-white/20 group-hover:bg-white/40'}
                `} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Divider + meta */}
        <div className="px-8 py-7 border-t border-white/[0.06] space-y-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3ba6a1] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3ba6a1]" />
            </span>
            <span className="text-[10px] font-medium tracking-[2px] text-white/30 uppercase">
              Available for work
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] text-white/20 leading-relaxed">
              Tbilisi, Georgia · GMT +4
            </p>
            <p className="text-[11px] text-white/15">
              © 2026 Leavingstone
            </p>
          </div>
        </div>
      </aside>

      {/* ── Hamburger (mobile only) ──────────────────────────────── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle navigation"
        className={`
          fixed top-5 left-5 z-[60] lg:hidden
          w-9 h-9 flex flex-col items-center justify-center gap-[5px]
          bg-[#0e0e0e]/90 backdrop-blur-sm rounded-full
          border transition-all duration-200
          ${open
            ? 'border-[#3ba6a1]/40 shadow-[0_0_0_3px_rgba(59,166,161,0.12)]'
            : 'border-white/10 hover:border-white/25'
          }
        `}
      >
        <span className={`block w-[14px] h-px bg-white/80 origin-center transition-all duration-200 ease-out ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
        <span className={`block w-[14px] h-px bg-white/80 transition-all duration-200 ease-out ${open ? 'opacity-0 scale-x-0' : ''}`} />
        <span className={`block w-[14px] h-px bg-white/80 origin-center transition-all duration-200 ease-out ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
      </button>

      {/* ── Main content ─────────────────────────────────────────── */}
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>

    </div>
  )
}

export default Layout
