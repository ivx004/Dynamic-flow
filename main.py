"""
API: Clases del centro de yoga / pilates
Alumno: Ivan David Valdebenito Uribe  ·  Sección: C1  ·  Tema 22: Centro de yoga / pilates
Proyecto EV3 (UA3) — API asignada por el docente.

Ejecutar:
    pip install -r requirements.txt
    uvicorn main:app --host 0.0.0.0 --port 8000

Endpoint principal:  GET /api/clases
Documentación:       http://127.0.0.1:8000/docs
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Clases del centro de yoga / pilates")

# CORS abierto para que el frontend (React/Vite) pueda consumir la API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# "Base de datos" en memoria (arreglo de objetos).
DATOS = [{'id': 1,
  'nombre': 'Hatha Yoga',
  'descripcion': 'Ritmo suave, principiantes',
  'categoria': 'Yoga',
  'precio': 9000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Hatha+Yoga'},
 {'id': 2,
  'nombre': 'Vinyasa Yoga',
  'descripcion': 'Dinámico',
  'categoria': 'Yoga',
  'precio': 10000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Vinyasa+Yoga'},
 {'id': 3,
  'nombre': 'Pilates mat',
  'descripcion': 'En colchoneta',
  'categoria': 'Pilates',
  'precio': 9500,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Pilates+mat'},
 {'id': 4,
  'nombre': 'Pilates reformer',
  'descripcion': 'Con máquina',
  'categoria': 'Pilates',
  'precio': 14000,
  'disponible': True,
  'imagen': 'https://placehold.co/400x300?text=Pilates+reformer'},
 {'id': 5,
  'nombre': 'Meditación',
  'descripcion': 'Mindfulness guiado',
  'categoria': 'Bienestar',
  'precio': 7000,
  'disponible': False,
  'imagen': 'https://placehold.co/400x300?text=Meditación'}]


@app.get("/")
def inicio():
    return {
        "mensaje": "API Clases del centro de yoga / pilates",
        "endpoint": "GET /api/clases",
        "docs": "/docs",
    }


@app.get("/api/clases")
def listar():
    """Devuelve el JSON con todos los registros."""
    return {"total": len(DATOS), "clases": DATOS}


@app.get("/api/clases/{item_id}")
def obtener(item_id: int):
    """Devuelve un registro por su id (404 si no existe)."""
    for item in DATOS:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="No encontrado")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
