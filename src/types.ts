import { QueryResult } from 'pg';

export interface AppEvent {
  type: string;
  time: string;
  data: any;
}

export interface AppRequest {
  id: string;
  time: string;
  token: string;
  action: string;
  data: any;
  user?: any;
}

export interface AppResponse {
  status: 200 | 400 | 404 | 500;
  body: {
    data: any;
    messages: string[];
  };
}

export interface Action {
  name: string;
  authenticate: boolean;
  validate: (request: AppRequest, db: Database) => Promise<string[]>;
  execute: (request: AppRequest, db: Database) => Promise<AppResponse>;
}

export interface Database {
  query: (sql: string, values?: any[] | undefined) => Promise<QueryResult<any>>;
  insert: (tableName: string, params: Record<string, any>) => Promise<any[]>;
}
