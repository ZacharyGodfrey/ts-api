import { Endpoint } from '../types';

export const logOut: Endpoint = {
  method: 'POST',
  path: '/log-out',
  validate: async (req, db) => {
    const errors: string[] = [];
    const sessionId = req.body.sessionId || '';

    if (sessionId.length === 0) {
      errors.push('Session ID is required.');
    }

    return errors;
  },
  execute: async (req, db) => {
    await db.query(`DELETE FROM public.session WHERE id = $1`, [
      req.body.sessionId,
    ]);

    return {
      status: 200,
      body: {
        data: null,
        messages: [],
      },
    };
  },
};
