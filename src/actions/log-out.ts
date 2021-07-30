import { Action } from '../types';
import { Response } from '../utilities';

export const logOut: Action = {
  name: 'Log Out',
  authenticate: false,
  validate: async (request, db) => {
    const errors: string[] = [];
    const token = request.token || '';

    if (token.length === 0) {
      errors.push('Token is required.');
    }

    return errors;
  },
  execute: async (request, db) => {
    const query = `DELETE FROM public.session WHERE id = $1`;

    await db.query(query, [request.token]);

    return Response.success();
  },
};
