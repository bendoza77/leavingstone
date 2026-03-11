import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoDark from '../assets/white_logo.png'

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

/**
 * Animated Sidebar
 * - Desktop: pinned
 * - Mobile: slides in with elastic easing + backdrop blur
 * - Accessibility: ESC closes, focus trapped by browser via overlay + tab order
 */
const Sidebar = ({ open, onClose }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    // close on navigation
    onClose?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => onClose?.()}
        className={
          `fixed inset-0 z-40 bg-black/50 backdrop-blur-[3px] lg:hidden\n` +
          `transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
        }
      />

      <aside
        data-cursor-light
        className={
          `fixed inset-y-0 right-0 z-50 w-[280px] flex flex-col\n` +
          `bg-[#0b0b0b] border-l border-white/[0.06]\n` +
          `transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]\n` +
          `${open ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0`
        }
      >
        {/* top */}
        <div className="px-8 pt-9 pb-7 border-b border-white/[0.06] flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logoDark} alt="Leavingstone" className="h-6 w-auto" />
          </Link>

          <button
            onClick={() => onClose?.()}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <span className="block w-9 h-9 rounded-full border border-white/10 hover:border-white/25 grid place-items-center">
              <span className="text-[18px] leading-none">×</span>
            </span>
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 px-5 py-8 overflow-y-auto">
          <p className="px-3 mb-5 text-[9px] font-semibold tracking-[3px] text-white/20 uppercase select-none">
            Navigation
          </p>

          <div className="flex flex-col gap-1">
            {NAV.map(({ label, path }) => {
              const active = pathname === path
              return (
                <Link
                  key={path}
                  to={path}
                  className={
                    `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl\n` +
                    `text-[12px] font-semibold tracking-[2px] uppercase\n` +
                    `transition-all duration-200\n` +
                    (active
                      ? 'text-[#3ba6a1] bg-[#3ba6a1]/[0.10]'
                      : 'text-white/35 hover:text-white/80 hover:bg-white/[0.05]')
                  }
                >
                  {/* animated indicator */}
                  <span
                    className={
                      `absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-full\n` +
                      `bg-[#3ba6a1] transition-transform duration-300 origin-center\n` +
                      (active ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-75')
                    }
                  />

                  <span
                    className={
                      `flex-shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-200\n` +
                      (active
                        ? 'bg-[#3ba6a1] shadow-[0_0_0_5px_rgba(59,166,161,0.12)]'
                        : 'bg-white/20 group-hover:bg-white/45')
                    }
                  />

                  <span className="relative">
                    {label}
                    <span
                      className={
                        `absolute -bottom-1 left-0 h-px w-full bg-white/40 origin-left\n` +
                        `transition-transform duration-300\n` +
                        (active ? 'scale-x-100 bg-[#3ba6a1]' : 'scale-x-0 group-hover:scale-x-100')
                      }
                    />
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* bottom */}
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

          <p className="text-[11px] text-white/20 leading-relaxed">
            Tbilisi, Georgia · GMT +4
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
