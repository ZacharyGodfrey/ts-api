import express, { Request } from 'express';

import { AppEvent, AppRequest, AppResponse, Database } from './types';

import { actions } from './actions';
import { Response, uuid } from './utilities';

export const createServer = (db: Database) => {
  const server = express();

  server.set('json spaces', 2);
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());

  // CORS
  server.use((req, res, next) => {
    // Allow CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST');

    // Remove headers that leak information
    res.removeHeader('x-powered-by');

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  // Handler
  server.post('/', async (req, res) => {
    const request = translateRequest(req);

    logRequest(request);

    const response = await processRequest(request, db);

    res.status(response.status).json(response.body);

    logResponse(response);
  });

  // 404 Not Found
  server.use((req, res) => {
    const request = translateRequest(req);

    logRequest(request);

    const response = Response.serverError();

    res.status(response.status).json(response.body);

    logResponse(response);
  });

  return server;
};

const translateRequest = (req: Request) => {
  const request: AppRequest = {
    id: uuid(),
    time: new Date().toISOString(),
    token: req.body.token,
    action: req.body.action,
    data: req.body.data,
    user: null,
  };

  return request;
};

const processRequest = async (
  request: AppRequest,
  db: Database,
): Promise<AppResponse> => {
  try {
    const action = actions[request.action];

    if (!action) {
      return Response.badRequest(['The specified action does not exist.']);
    }

    if (action.authenticate) {
      // TODO: Perform DB lookup

      if (!request.user) {
        return Response.badRequest([
          'You must be logged in to perform this action.',
        ]);
      }
    }

    const errors = await action.validate(request, db);

    if (errors && errors.length > 0) {
      return Response.badRequest(errors);
    } else {
      return action.execute(request, db);
    }
  } catch (error) {
    logError(error);

    return Response.serverError();
  }
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
