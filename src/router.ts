import { Router } from 'express';
import { Database } from './database';

export const createRouter = (db: Database) => {
  const router = Router();

  router.get('/', async (req, res) => {
    res.status(200).json({
      appName: 'ts-api',
      serverTime: new Date().toISOString(),
    });
  });

  return router;
};
