import { Action } from '../types';
import { hmac, Response, uuid } from '../utilities';

export const signUp: Action = {
  name: 'Sign Up',
  authenticate: false,
  validate: async (request, db) => {
    const errors: string[] = [];
    const username = request.data.username || '';
    const password = request.data.password || '';
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
  execute: async (request, db) => {
    const id = uuid();
    const [user] = await db.insert('user', {
      id,
      created: request.time,
      updated: request.time,
      username: request.data.username,
      password_hash: hmac(id, request.data.password),
    });

    // Don't leak information
    delete user.password_hash;

    return Response.success(user);
  },
};
