import { useState, useEffect } from 'react'

const LINES = [
  ['DIGITAL', 'AND', 'CREATIVE'],
  ['CULTURE', 'OF', 'INSPIRATION'],
]
const ALL_WORDS  = LINES.flat()
const TEAL       = '#3ba6a1'

// ─── Timing (ms) ────────────────────────────────────────────
const PANEL_DUR   = 500
const WORD_OFFSET = 150
const ENTER_DUR   = 550
const ENTER_STEP  = 70
const HOLD        = 250

const LAST_WORD   = WORD_OFFSET + (ALL_WORDS.length - 1) * ENTER_STEP + ENTER_DUR
const EXIT_START  = LAST_WORD + HOLD

const EXIT_STEP   = 35
const EXIT_DUR    = 360
const BG_DELAY    = 120
const BG_DUR      = (ALL_WORDS.length - 1) * EXIT_STEP + EXIT_DUR + BG_DELAY + 40
const DONE_DELAY  = BG_DUR + 60

const Loader = ({ onDone }) => {
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t = setTimeout(() => setPhase('exit'), EXIT_START)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => { setPhase('done'); onDone?.() }, DONE_DELAY)
    return () => clearTimeout(t)
  }, [phase, onDone])

  if (phase === 'done') return null

  let wordIndex = 0

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden' }}>

      {/* ── Background panel ──────────────────────────────── */}
      <div
        data-cursor-light
        style={{
          position:        'absolute',
          inset:           0,
          backgroundColor: '#1f1f1f',
          willChange:      'transform',
          animation: phase === 'exit'
            ? `panel-exit ${BG_DUR}ms cubic-bezier(0.42,0,0.58,1) ${BG_DELAY}ms both`
            : `panel-enter ${PANEL_DUR}ms cubic-bezier(0.16,1,0.3,1) both`,
        }}
      />

      {/* ── Thin top accent line ──────────────────────────── */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        height:     '2px',
        width:      '100%',
        backgroundColor: `#1f1f1f`,
        opacity:    phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.3s ease',
        animation:  'line-grow 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s both',
        transformOrigin: 'left center',
        zIndex:     1,
      }} />

      {/* ── Corner label ─────────────────────────────────── */}
      <div style={{
        position:   'absolute',
        top:        '6vh',
        left:       '6vw',
        zIndex:     1,
        opacity:    phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.25s ease',
        animation:  'fade-in-up 0.5s ease 0.2s both',
      }}>
        <span style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      '11px',
          color:         "",
          letterSpacing: '4px',
          textTransform: 'uppercase',
        }}>
          Leavingstone
        </span>
      </div>

      {/* ── Words ────────────────────────────────────────── */}
      <div style={{
        position:       'absolute',
        inset:          0,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:            '0.1em',
        pointerEvents:  'none',
        zIndex:         1,
      }}>
        {LINES.map((line, li) => (
          <div key={li} style={{ display: 'flex', gap: '0.3em', alignItems: 'baseline' }}>
            {line.map((word) => {
              const idx        = wordIndex++
              const enterDelay = WORD_OFFSET + idx * ENTER_STEP
              const exitDelay  = idx * EXIT_STEP
              const isAccent   = word === 'CREATIVE' || word === 'INSPIRATION'

              return (
                <div key={word} style={{ overflow: 'hidden', lineHeight: 0.88 }}>
                  <span style={{
                    display:       'block',
                    fontFamily:    "'Bebas Neue', sans-serif",
                    fontSize:      'clamp(2.8rem, 7vw, 7rem)',
                    color:         isAccent ? TEAL : '#ffffff',
                    letterSpacing: '0.05em',
                    willChange:    'transform',
                    animation: phase === 'exit'
                      ? `word-exit  ${EXIT_DUR}ms cubic-bezier(0.55,0,0.45,1) ${exitDelay}ms both`
                      : `letter-rise ${ENTER_DUR}ms cubic-bezier(0.16,1,0.3,1) ${enterDelay}ms both`,
                  }}>
                    {word}
                  </span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* ── Bottom progress bar ───────────────────────────── */}
      <div style={{
        position:   'absolute',
        bottom:     0,
        left:       0,
        right:      0,
        height:     '2px',
        background: '#1a1a1a',
        zIndex:     1,
      }}>
        <div style={{
          height:          '100%',
          backgroundColor: TEAL,
          transformOrigin: 'left center',
          animation:       `line-grow ${EXIT_START}ms cubic-bezier(0.4,0,0.2,1) both`,
        }} />
      </div>

    </div>
  )
}

export default Loader
