import { betterAuth } from 'better-auth';
import db from './database/database.js';

// Configuração básica do better-auth
const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
    requireEmailVerification: false, // Desativado para simplificar o exemplo
  },
  baseURL: 'http://localhost:3000',
  secret: process.env.SECRET_KEY
});

export default auth;
