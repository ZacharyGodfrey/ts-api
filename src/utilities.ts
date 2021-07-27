import * as Crypto from 'crypto';

export const crypto = {
  hmac: (secret: string, value: string) => {
    return Crypto.createHmac('sha256', secret).update(value).digest('hex');
  },
};
