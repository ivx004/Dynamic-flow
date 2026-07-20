function ReservaCard({ reserva, onEditar, onEliminar }) {
  if (!reserva) {
    return <div>Error: Reserva no encontrada</div>
  }

  return (
    <div className="clase-card">
      <div className="clase-header">
        <h3>{reserva.claseNombre || 'Clase sin nombre'}</h3>
        <span className="badge activa">
          🟢 Reservada
        </span>
      </div>
      
      <div className="clase-body">
        <p>
          <strong>Estudiante:</strong> {reserva.nombreEstudiante || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {reserva.email || 'N/A'}
        </p>
        <p>
          <strong>Teléfono:</strong> {reserva.telefono || 'N/A'}
        </p>
        <p>
          <strong>Cupos:</strong> {reserva.cupos || 0}
        </p>
        <p>
          <strong>Fecha Reserva:</strong> {reserva.fechaReserva || 'N/A'}
        </p>
        {reserva.notas && (
          <p>
            <strong>Notas:</strong> {reserva.notas}
          </p>
        )}
        
        <div className="clase-actions" style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            className="editar"
            onClick={() => onEditar(reserva)}
            style={{ flex: 1, background: '#3498db', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            ✏️ Editar
          </button>
          <button 
            className="eliminar"
            onClick={() => onEliminar(reserva.id)}
            style={{ flex: 1, background: '#e74c3c', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            🗑️ Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReservaCard
