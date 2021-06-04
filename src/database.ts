import { Pool, QueryResult } from 'pg';

export interface Database {
  query: (sql: string, values: any[]) => Promise<QueryResult<any>>;
  insert: (tableName: string, params: Record<string, any>) => Promise<any[]>;
}

export const createConnection = (): Database => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  return {
    query: async (sql: string, values: any[]) => pool.query(sql, values),
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
