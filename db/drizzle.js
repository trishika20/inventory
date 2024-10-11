import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import {config} from 'dotenv'

config();

// Destructure Pool from pg
const { Pool } = pg;

// Set up PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export { db };