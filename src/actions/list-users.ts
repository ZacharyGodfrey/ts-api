import { Action } from '../types';
import { Response } from '../utilities';

export const listUsers: Action = {
  name: 'List Users',
  authenticate: true,
  validate: async () => [],
  execute: async (request, db) => {
    const result = await db.query(`SELECT * FROM public.user`);
    const users = result.rows.map(user => {
      delete user.password_hash;

      return user;
    });

    return Response.success(users);
  },
};
