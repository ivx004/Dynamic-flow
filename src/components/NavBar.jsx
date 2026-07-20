import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/gestion">Gestión</Link>
      <Link to="/datos-api">Datos API</Link>
    </nav>
  )
}

export default Navbar
