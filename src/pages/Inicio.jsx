import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div>
      <h2>Bienvenido al Sistema de Reservas de Yoga</h2>
      <p>
        Reserva tus clases de yoga favoritas. Este sistema te permite ver todas las clases 
        disponibles y hacer reservas que se guardarán en tu navegador.
      </p>
      
      <div style={{ marginTop: '30px', display: 'grid', gap: '20px' }}>
        <div className="clase-card">
          <div className="clase-header">
            <h3>📋 Mis Reservas</h3>
          </div>
          <div className="clase-body">
            <p>Crea, edita y cancela tus reservas de clases. Los datos se guardan automáticamente en LocalStorage.</p>
            <Link to="/gestion" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>
              Ir a Reservas →
            </Link>
          </div>
        </div>

        <div className="clase-card">
          <div className="clase-header">
            <h3>🔌 Clases Disponibles</h3>
          </div>
          <div className="clase-body">
            <p>Visualiza todas las clases de yoga y pilates disponibles desde nuestra API.</p>
            <Link to="/datos-api" style={{ color: '#667eea', textDecoration: 'none', fontWeight: 'bold' }}>
              Ver Clases →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inicio
