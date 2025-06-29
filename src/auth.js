import { betterAuth } from 'better-auth';

import databaseService from './database/database.js';

const dbAdapter = databaseService.getAdapter()

const auth = new betterAuth({
    database: dbAdapter,
    table: 'users_auth'
});

async function initializeAuth() {
    await auth.init();
    console.log('Biblioteca de autenticação inicializada');
}
    
export {auth, initializeAuth};