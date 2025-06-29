import Router from 'koa-router';
import {auth} from '../auth.js';

const router = new Router();

router.post('/register', async (ctx) => {
    const {email, password} = ctx.request.body;
    try {
        const result = await auth.register(email, password);
        ctx.status = 201;
        ctx.body = {
            message: 'Usuário registrado com sucesso',
            userId: result.userId,
        };
    } catch (error) {
        if (error.message.includes('exists')) {
            ctx.status = 409;
            ctx.body = {message: 'Usuário já existe'};
        } else{
            ctx.status = 400;
            ctx.body = {error: error.message};
        }
    }
});

export default router;