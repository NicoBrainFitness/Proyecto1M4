const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservas Hoteleras',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de reservas de hoteles'
    }
  },
  apis: ['./routes/*.js'], // Ruta a tus archivos con comentarios Swagger
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};

