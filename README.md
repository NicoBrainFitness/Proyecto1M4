<h1> <img src = "https://github.com/NicoBrainFitness/Proyecto1M2/blob/main/banner.png"> "PROYECTO 4: Reservas Hoteleras"</h1>

# Proyecto1M4

# 🧠 API de Reservas Hoteleras

Este proyecto es una API RESTful para la gestión de reservas en hoteles, desarrollado como parte de una evaluación de programación en Node.js. La API permite crear, leer, actualizar, eliminar y filtrar reservas.

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Swagger (documentación)
- Nodemon (entorno de desarrollo)
- JavaScript (ES6)
- Arquitectura MVC (Controllers, Routes, Middleware, Config)

## 📂 Estructura del proyecto


## 📬 Endpoints disponibles

### CRUD

- `POST /api/reservas` → Crear una nueva reserva
- `GET /api/reservas` → Obtener todas las reservas
- `GET /api/reservas/:id` → Obtener una reserva por ID
- `PUT /api/reservas/:id` → Actualizar una reserva
- `DELETE /api/reservas/:id` → Eliminar una reserva

### Filtros disponibles

- `hotel` → `/api/reservas?hotel=Hotel Paraíso`
- `fecha_inicio` y `fecha_fin` → `/api/reservas?fecha_inicio=2023-12-01&fecha_fin=2023-12-10`
- `tipo_habitacion` → `/api/reservas?tipo_habitacion=suite`
- `estado` → `/api/reservas?estado=pendiente`
- `num_huespedes` → `/api/reservas?num_huespedes=3`

## 📖 Documentación Swagger

Una vez que el servidor está corriendo, puedes acceder a la documentación de la API en:http://localhost:3000/api-docs


## 🧪 Cómo probar

1. Clona este repositorio
2. Instala dependencias:

```bash
npm install
npm run dev

✍️ Autor
Nicolás Rodríguez
@NicoBrainFitness

