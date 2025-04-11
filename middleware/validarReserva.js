// middleware/validarReserva.js

module.exports = (req, res, next) => {
    const { hotel, fecha, tipo_habitacion, num_huespedes } = req.body;
  
    if (!hotel || !fecha || !tipo_habitacion || !num_huespedes) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }
  
    next(); // si todo está bien, continúa con la ruta
  };