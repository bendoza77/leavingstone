import { useEffect, useRef } from 'react'

const Cursor = () => {
  const ringRef = useRef(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring) return

    let rx = window.innerWidth  / 2
    let ry = window.innerHeight / 2
    let mx = rx
    let my = ry
    const LERP = 0.08

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
    }

    // Regular hover (links, buttons) → slightly bigger
    const onHoverEnter = () => ring.classList.add('cursor--hover')
    const onHoverLeave = () => ring.classList.remove('cursor--hover')

    // Delegated hover for links/buttons (covers dynamically added elements)
    const onHoverOver = (e) => {
      if (e.target.closest('a, button')) ring.classList.add('cursor--hover')
    }
    const onHoverOut = (e) => {
      if (e.target.closest('a, button')) ring.classList.remove('cursor--hover')
    }
    document.addEventListener('mouseover',  onHoverOver)
    document.addEventListener('mouseout',   onHoverOut)

    // Fully delegated: works for any element rendered after mount
    const onOver = (e) => {
      // play mode: grow + show PLAY text
      if (e.target.closest('[data-cursor-play]')) {
        ring.classList.add('cursor--expand')
        ring.classList.add('cursor--play')
        ring.classList.remove('cursor--expand-arrow')
      }
      // expand with arrow
      else if (e.target.closest('[data-cursor-expand]')) {
        ring.classList.add('cursor--expand')
        ring.classList.add('cursor--expand-arrow')
        ring.classList.remove('cursor--play')
      }
      // default
      else {
        ring.classList.remove('cursor--expand')
        ring.classList.remove('cursor--play')
        ring.classList.remove('cursor--expand-arrow')
      }

      // light/dark background zones
      if (e.target.closest('[data-cursor-dark]')) {
        ring.classList.remove('cursor--light')
      } else if (e.target.closest('[data-cursor-light]')) {
        ring.classList.add('cursor--light')
      } else {
        ring.classList.remove('cursor--light')
      }
    }
    document.addEventListener('mouseover', onOver)

    let rafId
    const tick = () => {
      rx += (mx - rx) * LERP
      ry += (my - ry) * LERP
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ringRef}
      className="cursor-circle pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
    >
      <svg className="cursor-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="cursor-play-text">PLAY</span>
    </div>
  )
}

export default Cursor
