const reservas = require('../models/reserva');

// GET todas
const obtenerReservas = (req, res) => {
  let resultado = reservas;

  if (req.query.hotel) {
    resultado = resultado.filter(r =>
      r.hotel.toLowerCase() === req.query.hotel.toLowerCase()
    );
  }

  if (req.query.fecha_inicio && req.query.fecha_fin) {
    const fechaInicio = new Date(req.query.fecha_inicio);
    const fechaFin = new Date(req.query.fecha_fin);
    resultado = resultado.filter(r => {
      const fechaReserva = new Date(r.fecha);
      return fechaReserva >= fechaInicio && fechaReserva <= fechaFin;
    });
  }

  if (req.query.tipo_habitacion) {
    resultado = resultado.filter(r =>
      r.tipo_habitacion.toLowerCase() === req.query.tipo_habitacion.toLowerCase()
    );
  }

  if (req.query.estado) {
    resultado = resultado.filter(r =>
      r.estado.toLowerCase() === req.query.estado.toLowerCase()
    );
  }

  if (req.query.num_huespedes) {
    resultado = resultado.filter(r =>
      r.num_huespedes == req.query.num_huespedes
    );
  }

  res.json(resultado);
};

// GET por ID
const obtenerReservaPorId = (req, res) => {
  const reserva = reservas.find(r => r.id === req.params.id);

  if (!reserva) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  res.json(reserva);
};

// POST
const crearReserva = (req, res) => {
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
};

// PUT
const actualizarReserva = (req, res) => {
  const index = reservas.findIndex(r => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas[index] = {
    ...reservas[index],
    ...req.body
  };

  res.json({ mensaje: 'Reserva actualizada', reserva: reservas[index] });
};

// DELETE
const eliminarReserva = (req, res) => {
  const index = reservas.findIndex(r => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  reservas.splice(index, 1);
  res.json({ mensaje: 'Reserva eliminada correctamente' });
};

module.exports = {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva
};
