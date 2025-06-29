import { betterAuth } from 'better-auth';

import databaseService from './database/database.js';

const dbAdapter = databaseService.getAdapter();

const auth = betterAuth({
  tableName: 'users_table',
  dbAdapter: dbAdapter,
});

async function initializeAuth() {
  console.log('Biblioteca de autenticação inicializada');
  return auth;
}

export { auth, initializeAuth };
