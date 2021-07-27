import * as uuid from 'uuid';
import express, { NextFunction, Request, Response } from 'express';
import { URLSearchParams } from 'url';

import { Endpoint, AppRequest, AppResponse, Database, AppEvent } from './types';

export const createServer = (db: Database, endpoints: Endpoint[]) => {
  const server = express();

  server.set('json spaces', 2);
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(cors);

  endpoints.forEach(endpoint => {
    const handler = createHandler(db, endpoint);

    switch (endpoint.method) {
      case 'GET':
        server.get(endpoint.path, handler);
        break;

      case 'POST':
        server.post(endpoint.path, handler);
        break;
    }
  });

  server.use(notFound);

  return server;
};

const cors = (req: Request, res: Response, next: NextFunction) => {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');

  // Remove headers that leak information
  res.removeHeader('x-powered-by');

  // Handle OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
};

const createHandler = (db: Database, endpoint: Endpoint) => {
  return async (req: Request, res: Response) => {
    const request = translateRequest(req);
    let response: AppResponse;

    logRequest(request);

    try {
      const errors = await endpoint.validate(request, db);

      if (errors && errors.length > 0) {
        response = {
          status: 400,
          body: {
            data: null,
            messages: errors,
          },
        };
      } else {
        response = await endpoint.execute(request, db);
      }
    } catch (error) {
      logError(error);

      response = {
        status: 500,
        body: {
          data: null,
          messages: ['An unexpected error has occurred.'],
        },
      };
    }

    res.status(response.status).json(response.body);

    logResponse(response);
  };
};

const translateRequest = (req: Request) => {
  const queryString = req.originalUrl.split('?')[1] || '';
  const request: AppRequest = {
    requestId: uuid.v4(),
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    urlParams: req.params,
    queryParams: new URLSearchParams(queryString),
    body: req.body,
  };

  return request;
};

const logRequest = (request: AppRequest) => {
  const event: AppEvent = {
    type: 'HTTP Request Received',
    time: new Date().toISOString(),
    data: request,
  };

  console.info(JSON.stringify(event, null, 2));
};

const logError = (error: Error) => {
  const event: AppEvent = {
    type: 'Server Error Occurred',
    time: new Date().toISOString(),
    data: {
      message: error.message,
      stack: error.stack?.split('\n'),
    },
  };

  console.info(JSON.stringify(event, null, 2));
};

const logResponse = (response: AppResponse) => {
  const event: AppEvent = {
    type: 'HTTP Response Sent',
    time: new Date().toISOString(),
    data: response,
  };

  console.info(JSON.stringify(event, null, 2));
};

const notFound = (req: Request, res: Response) => {
  const request = translateRequest(req);

  logRequest(request);

  const response: AppResponse = {
    status: 404,
    body: {
      data: null,
      messages: ['The requested endpoint does not exist.'],
    },
  };

  res.status(response.status).json(response.body);

  logResponse(response);
};
