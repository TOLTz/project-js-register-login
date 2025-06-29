import databaseService from '../database/database';
import Router from 'koa-router';
import auth from '../auth';

const loginRouter = new Router();

// Route para login
loginRouter.post('/login', async (ctx) => {
  const { username, email, password } = ctx.request.body;

  if (!email || !password) {
    ctx.status = 400; // Bad Request
    ctx.body = { message: 'Email e senha são obrigatórios.' };
    return;
  }

  try {
    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
    });

    if (error) {
      ctx.status = 401; // Unauthorized
      ctx.body = { message: error.message || 'Credenciais inválidas.' };
      return;
    }

    console.log('Usuário autenticado:', data);

    ctx.status = 200; // OK
    ctx.body = {
      message: 'Login realizado com sucesso!',
      user: data.user, // Envia informações do usuário (sem a senha, claro)
      token: data.session.access_token, // Envia o token para o cliente
    };
  } catch (error) {
    console.error('Erro inesperado durante o login:', err);
    ctx.status = 500; // Internal Server Error
    ctx.body = { message: 'Ocorreu um erro interno no servidor.' };
  }
});

export default loginRouter;