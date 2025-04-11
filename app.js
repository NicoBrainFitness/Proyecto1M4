const express = require('express');
const dotenv = require('dotenv');
const reservasRoutes = require('./routes/reservas');
const { swaggerUi, specs } = require('./config/swagger');

// Configurar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// Middleware para leer JSON
app.use(express.json());

//Usar swager 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Conectar rutas
app.use('/api/reservas', reservasRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Puerto
const PORT = process.env.PORT || 3000;


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


