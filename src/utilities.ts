import { createHmac } from 'crypto';

export const hmac = (secret: string, value: string) => {
  return createHmac('sha256', secret).update(value).digest('hex');
};
