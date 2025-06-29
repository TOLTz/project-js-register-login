import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { koaSwagger } from 'koa2-swagger-ui';

import registerRouter from './routers/register.js';
import loginRouter from './routers/login.js';

import swaggerSpec from './swagger.js';

import { initializeAuth } from './auth.js';

const app = new Koa();
const PORT = 3000;

app.use(bodyParser());

app.use(
  koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
      spec: swaggerSpec,
    },
  }),
);

app.use(registerRouter.routes()).use(registerRouter.allowedMethods());
app.use(loginRouter.routes()).use(loginRouter.allowedMethods());

const startServer = async () => {
  try {
    await initializeAuth();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(
        `Documentação da API disponível em http://localhost:${PORT}/docs`,
      );
    });
  } catch (error) {
    console.error('Falha ao inicializar a aplicação:', error);
    process.exit(1);
  }
};

startServer();
