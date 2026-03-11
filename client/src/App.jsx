import { useState, useEffect, useCallback } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Work from './pages/Work'
import Cursor from './components/Cursor'
import Loader from './components/Loader'

const App = () => {
  const location = useLocation()
  const [loading, setLoading] = useState(true)

  const handleDone = useCallback(() => setLoading(false), [])

  useEffect(() => { setLoading(true) }, [location.pathname])

  return (
    <>
      {loading && <Loader key={location.pathname} onDone={handleDone} />}

      <Cursor />
      <div className="min-h-screen lg:pr-[280px]">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Work />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

export default App
