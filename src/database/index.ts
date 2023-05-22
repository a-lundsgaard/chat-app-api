import { Pool } from 'pg';
require("dotenv").config();

const env = process.env;

const pool = new Pool({
    user: env.DB_USERNAME,
    host: env.DB_HOST,
    database: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    port: 5432,
});

pool.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
});

pool.on('error', (error: unknown) => {
    console.error('Error connecting to the PostgreSQL database:', error);
});


export default pool;