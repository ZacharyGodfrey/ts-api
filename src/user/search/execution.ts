import { Database, Handler } from '../../types';

export const execution = (db: Database): Handler => {
  return async (req, res) => {
    // TODO: Implementation needed

    res.status(200).json({});
  };
};
