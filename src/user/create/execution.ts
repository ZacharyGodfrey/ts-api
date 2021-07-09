import * as uuid from 'uuid';

import { crypto } from '../../app/utilities';
import { Database, Handler } from '../../types';

export const execution = (db: Database): Handler => {
  return async (req, res) => {
    const id = uuid.v4();
    const now = new Date().toISOString();
    const [user] = await db.insert('user', {
      id,
      username: req.body.username,
      password_hash: crypto.hmac(id, req.body.password),
      created: now,
      updated: now,
    });

    delete user.password_hash;

    res.status(200).json(user);
  };
};
