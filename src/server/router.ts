import { Router } from 'express';
import { Database, Endpoint } from '../types';
import user from '../user';

export const createRouter = (db: Database) => {
  const router = Router();

  router.get('/', async (_, res) => {
    res.status(200).json({
      appName: 'ts-api',
      serverTime: new Date().toISOString(),
    });
  });

  router.post('/user', handlers(user.create(db)));
  router.get('/user', handlers(user.search(db)));
  router.get('/user/:id', handlers(user.view(db)));
  router.put('/user/:id', handlers(user.update(db)));
  router.delete('/user/:id', handlers(user.remove(db)));

  return router;
};

const handlers = (endpoint: Endpoint) => {
  return [
    endpoint.authentication,
    endpoint.authorization,
    endpoint.validation,
    endpoint.execution,
  ];
};
