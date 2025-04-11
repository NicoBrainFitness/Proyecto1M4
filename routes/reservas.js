const express = require('express');
const router = express.Router();

const validarReserva = require('../middleware/validarReserva');
const controller = require('../controllers/reservasController');

// Rutas
/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hotel
 *               - fecha
 *               - tipo_habitacion
 *               - num_huespedes
 *             properties:
 *               hotel:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date
 *               tipo_habitacion:
 *                 type: string
 *               num_huespedes:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reserva creada exitosamente
 */
router.post('/', validarReserva, controller.crearReserva);

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Obtener todas las reservas (con filtros opcionales)
 *     parameters:
 *       - in: query
 *         name: hotel
 *         schema:
 *           type: string
 *         description: Filtrar por hotel
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *         description: Fecha de inicio (YYYY-MM-DD)
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *         description: Fecha de fin (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de reservas
 */
router.get('/', controller.obtenerReservas);
/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtener una reserva por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: Reserva no encontrada
 */
router.get('/:id', controller.obtenerReservaPorId);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Actualizar una reserva existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *               fecha:
 *                 type: string
 *               tipo_habitacion:
 *                 type: string
 *               num_huespedes:
 *                 type: integer
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reserva actualizada
 *       404:
 *         description: Reserva no encontrada
 */
router.put('/:id', controller.actualizarReserva);
/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Eliminar una reserva por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     responses:
 *       200:
 *         description: Reserva eliminada
 *       404:
 *         description: Reserva no encontrada
 */
router.delete('/:id', controller.eliminarReserva);

module.exports = router;



/* Obtener todas las reservas
router.get('/', (req, res) => {
  res.json(reservas);
});

// Crear nueva reserva (POST)
router.post('/', (req, res) => {
  const nuevaReserva = {
    id: Date.now().toString(),
    hotel: req.body.hotel,
    fecha: req.body.fecha,
    tipo_habitacion: req.body.tipo_habitacion,
    num_huespedes: req.body.num_huespedes,
    estado: req.body.estado || 'pendiente'
  };

  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});
router.post('/', validarReserva, (req, res) => {
  const nuevaReserva = {
    id: Date.now().toString(),
    hotel: req.body.hotel,
    fecha: req.body.fecha,
    tipo_habitacion: req.body.tipo_habitacion,
    num_huespedes: req.body.num_huespedes,
    estado: req.body.estado || 'pendiente'
  };

  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});

// Obtener una reserva por ID (GET)
router.get('/:id', (req, res) => {
  const reserva = reservas.find(r => r.id === req.params.id);

  if (!reserva) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  res.json(reserva);
});

// Actualizar una reserva por ID (PUT)
router.put('/:id', (req, res) => {
  const index = reservas.findIndex(r => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas[index] = {
    ...reservas[index],
    ...req.body
  };

  res.json({ mensaje: 'Reserva actualizada', reserva: reservas[index] });
});

// Eliminar una reserva por ID (DELETE)
router.delete('/:id', (req, res) => {
  const index = reservas.findIndex(r => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas.splice(index, 1);

  res.json({ mensaje: 'Reserva eliminada correctamente' });
});

router.get('/', (req, res) => {
  let resultado = reservas;

  // Filtro por hotel
  if (req.query.hotel) {
    resultado = resultado.filter(r =>
      r.hotel.toLowerCase() === req.query.hotel.toLowerCase()
    );
  }
  // Filtro por rango de fechas
  if (req.query.fecha_inicio && req.query.fecha_fin) {
    const fechaInicio = new Date(req.query.fecha_inicio);
    const fechaFin = new Date(req.query.fecha_fin);

    resultado = resultado.filter(r => {
      const fechaReserva = new Date(r.fecha);
      return fechaReserva >= fechaInicio && fechaReserva <= fechaFin;
    });
  }
  // Filtro por tipo de habitación
if (req.query.tipo_habitacion) {
  resultado = resultado.filter(r =>
    r.tipo_habitacion.toLowerCase() === req.query.tipo_habitacion.toLowerCase()
  );
}
// Filtro por estado
if (req.query.estado) {
  resultado = resultado.filter(r =>
    r.estado.toLowerCase() === req.query.estado.toLowerCase()
  );
}
// Filtro por número de huéspedes
if (req.query.num_huespedes) {
  resultado = resultado.filter(r =>
    r.num_huespedes == req.query.num_huespedes
  );
}
  res.json(resultado);
});
module.exports = router;
*/