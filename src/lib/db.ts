import { Pool, QueryResult } from 'pg';

interface QueryParams {
  query: string;
  values?: unknown[];
}
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err: Error) => {
  console.error('Error connecting to PostgreSQL database:', err.message);
  process.exit(-1);
});

export async function query({ query, values = [] }: QueryParams): Promise<QueryResult> {
  const client = await pool.connect();
  try {
    const result: QueryResult = await client.query(query, values);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  } finally {
    client.release();
  }
}