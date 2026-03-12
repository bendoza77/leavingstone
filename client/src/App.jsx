import { useState, useEffect, useCallback } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Work from './pages/Work'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Sidebar from './components/Sidebar'
import Project from './pages/Project'

const App = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleDone = useCallback(() => setLoading(false), [])

  useEffect(() => { setLoading(true) }, [location.pathname])

  return (
    <>
      {loading && <Loader key={location.pathname} onDone={handleDone} />}

      <Cursor />

      {/* Mobile hamburger — hidden on desktop via CSS */}
      <button
        className="mobile-hamburger-btn"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen lg:pr-[280px]">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Work />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/project' element={<Project />} />
        </Routes>
      </div>
    </>
  )
}

export default App
