import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

import {
  addRequestId,
  cors,
  logError,
  logRequest,
  logResponse,
} from './middleware';

export const createApp = (router: Router) => {
  const app = express();

  app.set('json spaces', 2);
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(cors);
  app.use(addRequestId);
  app.use(logRequest);
  app.use(logResponse);
  app.use(logError);
  app.use(router);

  return app;
};
