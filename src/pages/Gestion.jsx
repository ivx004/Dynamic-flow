import { useState, useEffect } from 'react'
import Formulario from '../components/Formulario'
import ReservaCard from '../components/ReservaCard'

// Función para cargar del LocalStorage
const cargarReservasGuardadas = () => {
  try {
    const guardar = localStorage.getItem('reservas')
    if (guardar) {
      return JSON.parse(guardar)
    }
  } catch (err) {
    console.error('Error:', err)
  }
  return []
}

function Gestion() {
  const [clases, setClases] = useState([])
  const [reservas, setReservas] = useState(cargarReservasGuardadas())  // ← AQUÍ CAMBIÓ
  const [editando, setEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(true)

  // CARGAR CLASES DE LA API
  useEffect(() => {
    cargarClasesAPI()
  }, [])

  // GUARDAR EN LOCALSTORAGE CADA VEZ QUE CAMBIEN LAS RESERVAS
  useEffect(() => {
    console.log('Guardando en LocalStorage:', reservas)
    localStorage.setItem('reservas', JSON.stringify(reservas))
  }, [reservas])

  const cargarClasesAPI = async () => {
    try {
      setCargando(true)
      const response = await fetch('http://127.0.0.1:8000/api/clases')
      if (!response.ok) throw new Error('Error al cargar API')
      const datos = await response.json()
      setClases(datos.clases || [])
    } catch (err) {
      console.error('Error:', err)
      setMensaje('❌ No se pudo cargar las clases')
      setTimeout(() => setMensaje(''), 3000)
    } finally {
      setCargando(false)
    }
  }

  const agregarReserva = (nuevaReserva) => {
    const reservaConId = {
      ...nuevaReserva,
      id: Date.now(),
      fechaReserva: new Date().toLocaleDateString('es-CL')
    }
    console.log('Agregando reserva:', reservaConId)
    setReservas([...reservas, reservaConId])
    setMensaje('✅ Reserva creada correctamente')
    setTimeout(() => setMensaje(''), 3000)
  }

  const actualizarReserva = (reservaActualizada) => {
    const actualizadas = reservas.map(r => 
      r.id === reservaActualizada.id ? reservaActualizada : r
    )
    console.log('Actualizando reserva:', actualizadas)
    setReservas(actualizadas)
    setEditando(null)
    setMensaje('✅ Reserva actualizada')
    setTimeout(() => setMensaje(''), 3000)
  }

  const eliminarReserva = (id) => {
    if (confirm('¿Cancelar esta reserva?')) {
      const filtradas = reservas.filter(r => r.id !== id)
      console.log('Eliminando reserva:', filtradas)
      setReservas(filtradas)
      setMensaje('✅ Reserva cancelada')
      setTimeout(() => setMensaje(''), 3000)
    }
  }

  return (
    <div className="container">
      <div>
        {cargando ? (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <p>⏳ Cargando clases...</p>
          </div>
        ) : clases.length > 0 ? (
          <Formulario 
            clases={clases}
            onSubmit={editando ? actualizarReserva : agregarReserva}
            reservaEdicion={editando}
            onCancelar={() => setEditando(null)}
          />
        ) : (
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', color: '#e74c3c' }}>
            <p>❌ No se pudieron cargar las clases. ¿La API está corriendo?</p>
          </div>
        )}
      </div>

      <div>
        {mensaje && <div className={`mensaje ${mensaje.includes('✅') ? 'exito' : 'error'}`}>{mensaje}</div>}
        
        {reservas.length === 0 ? (
          <div className="empty-state">
            <p>📭 No hay reservas</p>
          </div>
        ) : (
          <>
            <h2>Mis Reservas ({reservas.length})</h2>
            <div className="clases-grid">
              {reservas.map(reserva => (
                <ReservaCard
                  key={reserva.id}
                  reserva={reserva}
                  onEditar={() => setEditando(reserva)}
                  onEliminar={eliminarReserva}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Gestion