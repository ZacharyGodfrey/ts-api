import { NextFunction, Request, Response } from 'express';
import { QueryResult } from 'pg';

export type Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export interface Endpoint {
  authentication: Handler;
  authorization: Handler;
  validation: Handler;
  execution: Handler;
}

export interface Entity {
  create: Endpoint;
  search: Endpoint;
  view: Endpoint;
  update: Endpoint;
  remove: Endpoint;
}

export interface Database {
  query: (sql: string, values?: any[] | undefined) => Promise<QueryResult<any>>;
  insert: (tableName: string, params: Record<string, any>) => Promise<any[]>;
}
