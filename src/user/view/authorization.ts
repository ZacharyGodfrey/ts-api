import { Database, Handler } from '../../types';

export const authorization = (db: Database): Handler => {
  return async (req, res, next) => {
    next();
  };
};
