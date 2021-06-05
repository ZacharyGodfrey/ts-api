import { Pool, QueryResult } from 'pg';

export interface Database {
  query: (sql: string, values?: any[] | undefined) => Promise<QueryResult<any>>;
  insert: (tableName: string, params: Record<string, any>) => Promise<any[]>;
}

export const connectToDatabase = async (): Promise<Database> => {
  console.log(`[DATABASE] Creating database connection...`);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  console.log(`[DATABASE] Creating database schema...`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.user (
      id UUID NOT NULL,
      username VARCHAR(25) NOT NULL,
      password_hash CHAR(64) NOT NULL,
      created TIMESTAMPTZ,
      PRIMARY KEY (id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.session (
      id UUID NOT NULL,
      user_id UUID NOT NULL,
      PRIMARY KEY (id),
      CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES public.user (id)
    )
  `);

  return {
    query: (sql: string, values: any[] | undefined) => pool.query(sql, values),
    insert: async (tableName: string, params: Record<string, any>) => {
      const keys = Object.keys(params).join(', ');
      const values = Object.values(params);
      const indices = values.map((_, i) => `$${i + 1}`).join(', ');
      const sql = `INSERT INTO ${tableName} (${keys}) VALUES (${indices}) RETURNING *`;
      const { rows } = await pool.query(sql, values);

      return rows;
    },
  };
};
