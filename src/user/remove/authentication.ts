import { Database, Handler } from '../../types';

export const authentication = (db: Database): Handler => {
  return async (req, res, next) => {
    next();
  };
};
