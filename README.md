# API — Clases del centro de yoga / pilates

**Alumno:** Ivan David Valdebenito Uribe  ·  **Sección:** C1
**Tema:** Tema 22: Centro de yoga / pilates

API asignada por el docente para la **Evaluación 3 (UA3)**. Tu frontend en React debe
**consumir** esta API con `fetch` o `axios`, mostrando los estados de ⏳ carga, ✅ datos y ❌ error.

## Endpoint

- `GET /api/clases` → lista todos los registros (`{ total, clases: [...] }`)
- `GET /api/clases/{id}` → un registro por id

## Cómo la usarás en el frontend

GET /api/clases muestra las clases; el CRUD (LocalStorage) reserva cupos eligiendo una clase.

> Tu **CRUD con Local Storage** (Reservas de clase) es lo que tú administras (crear/editar/eliminar).
> La **API** entrega datos de referencia que muestras y usas para llenar los selectores del formulario.

## Cómo correr la API

```bash
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

Prueba: <http://127.0.0.1:8000/api/clases>  ·  Docs: <http://127.0.0.1:8000/docs>

## Cómo consumirla desde React (ejemplo)

```javascript
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/clases")
    .then((res) => {
      if (!res.ok) throw new Error("Error " + res.status)
      return res.json()
    })
    .then((data) => setDatos(data.clases))   // ✅ datos
    .catch((err) => setError(err.message))        // ❌ error
    .finally(() => setCargando(false))            // fin de ⏳ carga
}, [])
```
