import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()
const { Pool } = pg

export const pgPool = new Pool({
    connectionString: 'postgresql://postgres:ghKVccPWWNjeDBLMbynEHhGyDYHGIPEZ@autorack.proxy.rlwy.net:18147/railway',
    ssl: false ,// Desactiva SSL si el servidor no lo soporta
    
  });


