import * as UUID from 'uuid';
import { createHmac } from 'crypto';

export const hmac = (secret: string, value: string) => {
  return createHmac('sha256', secret).update(value).digest('hex');
};

export const uuid = () => UUID.v4();

export const processSequentially = <T>(
  items: T[],
  process: (item: T) => Promise<void>,
) => {
  return items.reduce((previous, item) => {
    return previous.then(() => process(item));
  }, Promise.resolve());
};
