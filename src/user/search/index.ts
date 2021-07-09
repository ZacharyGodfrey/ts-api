import { authentication } from './authentication';
import { authorization } from './authorization';
import { validation } from './validation';
import { execution } from './execution';
import { Database, Endpoint } from '../../types';

export default (db: Database): Endpoint => {
  return {
    authentication: authentication(db),
    authorization: authorization(db),
    validation: validation(db),
    execution: execution(db),
  };
};
