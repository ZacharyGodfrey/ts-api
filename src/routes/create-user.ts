import * as uuid from 'uuid';

import { hmac } from '../utilities';
import { Endpoint } from '../types';

export const createUser: Endpoint = {
  method: 'POST',
  path: '/create-user',
  validate: async (req, db) => {
    const errors: string[] = [];
    const username = req.body.username || '';
    const password = req.body.password || '';
    const existingUsers = await db.query(
      `SELECT * FROM public.user WHERE username = $1`,
      [username],
    );

    if (existingUsers.rowCount > 0) {
      errors.push('There is already a user with that Username.');
    }

    if (username.length < 3) {
      errors.push('Username must be at least 3 characters.');
    }

    if (username.length > 25) {
      errors.push('Username must be no more than 25 characters.');
    }

    if (!username.match(/[a-zA-Z0-9_]/g)) {
      errors.push(
        'Username may only contain letter, number, and underscore characters.',
      );
    }

    if (password.length < 10) {
      errors.push('Password must be at least 10 characters.');
    }

    if (password.length > 25) {
      errors.push('Password must be no more than 25 characters.');
    }

    return errors;
  },
  execute: async (req, db) => {
    const id = uuid.v4();
    const [user] = await db.insert('user', {
      id,
      created: req.timestamp,
      updated: req.timestamp,
      username: req.body.username,
      password_hash: hmac(id, req.body.password),
    });

    // TODO: Uncomment after testing
    // delete user.password_hash;

    return {
      status: 200,
      body: {
        data: user,
        messages: [],
      },
    };
  },
};
