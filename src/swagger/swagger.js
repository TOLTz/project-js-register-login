import { koaSwagger } from 'koa2-swagger-ui';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0', // CORRIGIDO AQUI
    info: {
      title: 'API de Autenticação',
      version: '1.0.0',
      description: 'API Koa.js com login e registro usando better-auth',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.resolve('./src/routers/*.js')], // ou ajuste para './routers/*.js' se não houver pasta "src"
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
