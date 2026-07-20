import { useState, useEffect } from 'react'

function Formulario({ clases, onSubmit, reservaEdicion, onCancelar }) {
  const [formData, setFormData] = useState({
    claseId: '',
    nombreEstudiante: '',
    email: '',
    telefono: '',
    cupos: 1,
    notas: ''
  })

  // Cargar datos si estamos editando
  useEffect(() => {
    if (reservaEdicion) {
      setFormData({
        claseId: reservaEdicion.claseId,
        nombreEstudiante: reservaEdicion.nombreEstudiante,
        email: reservaEdicion.email,
        telefono: reservaEdicion.telefono,
        cupos: reservaEdicion.cupos,
        notas: reservaEdicion.notas
      })
    } else {
      setFormData({
        claseId: '',
        nombreEstudiante: '',
        email: '',
        telefono: '',
        cupos: 1,
        notas: ''
      })
    }
  }, [reservaEdicion])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cupos' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validaciones
    if (!formData.claseId) {
      alert('⚠️ Debe seleccionar una clase')
      return
    }

    if (!formData.nombreEstudiante.trim()) {
      alert('⚠️ El nombre del estudiante es obligatorio')
      return
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      alert('⚠️ Email válido es obligatorio')
      return
    }

    if (!formData.telefono.trim()) {
      alert('⚠️ El teléfono es obligatorio')
      return
    }

    if (formData.cupos < 1 || formData.cupos > 5) {
      alert('⚠️ Los cupos deben ser entre 1 y 5')
      return
    }

    // Obtener nombre de la clase
    const claseSeleccionada = clases.find(c => c.id === parseInt(formData.claseId))
    
    if (reservaEdicion) {
      onSubmit({
        ...formData,
        claseNombre: claseSeleccionada?.nombre || 'Clase',
        id: reservaEdicion.id
      })
    } else {
      onSubmit({
        ...formData,
        claseNombre: claseSeleccionada?.nombre || 'Clase'
      })
    }

    // Limpiar formulario si no estamos editando
    if (!reservaEdicion) {
      setFormData({
        claseId: '',
        nombreEstudiante: '',
        email: '',
        telefono: '',
        cupos: 1,
        notas: ''
      })
    }
  }

  const handleCancel = () => {
    setFormData({
      claseId: '',
      nombreEstudiante: '',
      email: '',
      telefono: '',
      cupos: 1,
      notas: ''
    })
    onCancelar()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{reservaEdicion ? '✏️ Editar Reserva' : '📝 Nueva Reserva'}</h2>

      <div className="form-group">
        <label htmlFor="claseId">Clase *</label>
        <select
          id="claseId"
          name="claseId"
          value={formData.claseId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona una clase...</option>
          {clases.map(clase => (
            <option key={clase.id} value={clase.id}>
              {clase.nombre} - ${clase.precio}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="nombreEstudiante">Nombre Estudiante *</label>
        <input
          type="text"
          id="nombreEstudiante"
          name="nombreEstudiante"
          value={formData.nombreEstudiante}
          onChange={handleChange}
          placeholder="Tu nombre completo"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefono">Teléfono *</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="+56 9 1234 5678"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="cupos">Cupos *</label>
        <input
          type="number"
          id="cupos"
          name="cupos"
          value={formData.cupos}
          onChange={handleChange}
          min="1"
          max="5"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notas">Notas</label>
        <textarea
          id="notas"
          name="notas"
          value={formData.notas}
          onChange={handleChange}
          placeholder="Notas adicionales (opcional)"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">
          {reservaEdicion ? '💾 Actualizar' : '🔒 Reservar'}
        </button>
        {reservaEdicion && (
          <button type="button" onClick={handleCancel} style={{ background: '#95a5a6' }}>
            ❌ Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default Formulario
