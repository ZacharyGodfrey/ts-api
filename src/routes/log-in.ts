import * as uuid from 'uuid';
import { Endpoint } from '../types';
import { hmac } from '../utilities';

export const logIn: Endpoint = {
  method: 'POST',
  path: '/log-in',
  validate: async (req, db) => {
    const errors: string[] = [];
    const username = req.body.username || '';
    const password = req.body.password || '';

    if (username.length === 0) {
      errors.push('Username is required.');
    }

    if (password.length === 0) {
      errors.push('Password is required.');
    }

    return errors;
  },
  execute: async (req, db) => {
    const userQuery = await db.query(
      `SELECT * FROM public.user WHERE username = $1`,
      [req.body.username],
    );

    const user = userQuery.rows[0];

    if (!user) {
      return {
        status: 400,
        body: {
          data: null,
          messages: ['No user exists with the specified username.'],
        },
      };
    }

    if (user.password_hash !== hmac(user.id, req.body.password)) {
      return {
        status: 400,
        body: {
          data: null,
          messages: ['The specified password is incorrect.'],
        },
      };
    }

    const [session] = await db.insert('session', {
      id: uuid.v4(),
      created: req.timestamp,
      updated: req.timestamp,
      user_id: user.id,
    });

    return {
      status: 200,
      body: {
        data: {
          sessionId: session.id,
        },
        messages: [],
      },
    };
  },
};
