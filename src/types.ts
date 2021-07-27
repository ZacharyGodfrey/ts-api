import { QueryResult } from 'pg';
import { URLSearchParams } from 'url';

export interface AppEvent {
  type: string;
  time: string;
  data: any;
}

export interface AppRequest {
  requestId: string;
  timestamp: string;
  method: string;
  path: string;
  urlParams: Record<string, string>;
  queryParams: URLSearchParams;
  cookies: Record<string, string>;
  body: any;
}

export interface AppResponse {
  status: 200 | 400 | 404 | 500;
  body: {
    data: any;
    messages: string[];
  };
}

export interface Endpoint {
  method: 'GET' | 'POST';
  path: string;
  validate: (request: AppRequest, db: Database) => Promise<string[]>;
  execute: (request: AppRequest, db: Database) => Promise<AppResponse>;
}

export interface Database {
  query: (sql: string, values?: any[] | undefined) => Promise<QueryResult<any>>;
  insert: (tableName: string, params: Record<string, any>) => Promise<any[]>;
}
