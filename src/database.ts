import { Pool } from 'pg';
import { Database } from './types';

export const connectToDatabase = (): Database => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return {
    query: (sql: string, values: any[] | undefined) => pool.query(sql, values),
    insert: async (tableName: string, params: Record<string, any>) => {
      const keys = Object.keys(params).join(', ');
      const values = Object.values(params);
      const indices = values.map((_, i) => `$${i + 1}`).join(', ');
      const sql = `INSERT INTO public.${tableName} (${keys}) VALUES (${indices}) RETURNING *`;
      const { rows } = await pool.query(sql, values);

      return rows;
    },
  };
};
