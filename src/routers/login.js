import Router from 'koa-router';
import { auth } from '../auth.js';

const loginRouter = new Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
loginRouter.post('/login', async (ctx) => {
  const { username, email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 400; // Bad Request
    ctx.body = { message: 'Email e senha são obrigatórios.' };
    return;
  }

  console.log('Tentando fazer login com:', { email, password });

  try {
    // Usando a API correta da better-auth
    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log('Resposta da autenticação:', result);

    ctx.status = 200; // OK
    ctx.body = {
      message: 'Login realizado com sucesso!',
      user: result.user,
      session: result.session,
    };
  } catch (error) {
    console.error('Erro inesperado durante o login:', error);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Ocorreu um erro interno no servidor.' };
  }
});

export default loginRouter;