import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Registro e Login Final',
    version: '1.0.0',
    description: 'API com Koa, usando better-sqlite3 e better-auth com adapter.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de Desenvolvimento',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;