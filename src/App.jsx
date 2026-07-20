import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Gestion from './pages/Gestion'
import DatosAPI from './pages/DatosAPI'

function App() {
  return (
    <Router>
      <header>
        <h1>🧘 Dynamic Flow</h1>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/gestion">Gestión</Link>
          <Link to="/datos-api">Datos API</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/gestion" element={<Gestion />} />
          <Route path="/datos-api" element={<DatosAPI />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
