import { Database, Handler } from '../../types';

export const validation = (db: Database): Handler => {
  return async (req, res, next) => {
    const errors: string[] = [];
    const username = (req.body.username || '').trim();
    const password = req.body.password || '';

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

    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      next();
    }
  };
};
