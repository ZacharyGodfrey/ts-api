import { Action, Database } from '../types';
import { hmac, Response, uuid } from '../utilities';

export const logIn: Action = {
  name: 'Log In',
  authenticate: false,
  validate: async (request, db) => {
    const errors: string[] = [];
    const username = request.data.username || '';
    const password = request.data.password || '';

    if (username.length === 0) {
      return ['Username is required.'];
    }

    if (password.length === 0) {
      return ['Password is required.'];
    }

    const user = await getUser(db, request.data.username);

    if (!user) {
      return ['No user exists with the specified username.'];
    }

    if (user.password_hash !== hmac(user.id, request.data.password)) {
      errors.push('The specified password is incorrect.');
    }

    return errors;
  },
  execute: async (request, db) => {
    const user = await getUser(db, request.data.username);
    const [session] = await db.insert('session', {
      id: uuid(),
      created: request.time,
      updated: request.time,
      user_id: user.id,
    });

    return Response.success({
      token: session.id,
    });
  },
};

const getUser = async (db: Database, username: string) => {
  const query = `SELECT * FROM public.user WHERE username = $1`;
  const response = await db.query(query, [username]);

  return response.rows[0];
};
