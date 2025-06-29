import Router from 'koa-router';
import {auth} from '../auth.js';

const router = new Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Usuário já existe
 * *     500:
 *        description: Erro interno do servidor
 */
router.post('/register', async (ctx) => {
    const {email, password, name} = ctx.request.body;
    
    if (!email || !password) {
        ctx.status = 400;
        ctx.body = { message: 'Email e senha são obrigatórios.' };
        return;
    }
    
    try {
        const result = await auth.api.signUpEmail({
            body: {
                email: email,
                password: password,
                name: name || email.split('@')[0], // Use o nome fornecido ou a parte antes do @ do email
            }
        });
        
        console.log('Usuário registrado:', result);
        
        ctx.status = 201;
        ctx.body = {
            message: 'Usuário registrado com sucesso',
            user: result.user,
        };
    } catch (error) {
        console.error('Erro no registro:', error);
        
        if (error.message && error.message.includes('already exists')) {
            ctx.status = 409;
            ctx.body = {message: 'Usuário já existe'};
        } else {
            ctx.status = 500;
            ctx.body = {message: error.message || 'Erro ao registrar usuário'};
        }
    }
});

export default router;