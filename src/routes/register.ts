import { Router } from 'express';
import { Database } from '../database';
import * as app from '../app';

export const register = (db: Database, router: Router) => {
  router.get('/register', async (req, res) => {
    res.status(200).json({
      username: '',
      password: '',
    });
  });

  router.post('/register', async (req, res) => {
    const input = req.body;
    const errors = await app.register.validate(db, input);

    res.status(200).json({
      input,
      errors,
    });
  });
};
