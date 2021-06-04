import express, { Router } from 'express';
import cookieParser from 'cookie-parser';

export const createServer = (router: Router) => {
  const server = express();

  server.set('json spaces', 2);
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  server.use(cookieParser(process.env.COOKIE_SECRET));

  server.use((req, res, next) => {
    // Allow CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

    // Remove headers that leak information
    res.removeHeader('x-powered-by');

    // Handle OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  server.use(router);

  return server;
};
