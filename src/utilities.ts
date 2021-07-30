import * as UUID from 'uuid';
import { createHmac } from 'crypto';

import { AppResponse } from './types';

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

export const Response = {
  success: (data?: any): AppResponse => ({
    status: 200,
    body: {
      data: data === undefined ? null : data,
      messages: [],
    },
  }),
  badRequest: (errors: string[]): AppResponse => ({
    status: 400,
    body: {
      data: null,
      messages: errors,
    },
  }),
  notFound: (): AppResponse => ({
    status: 404,
    body: {
      data: null,
      messages: ['The requested endpoint does not exist.'],
    },
  }),
  serverError: (): AppResponse => ({
    status: 500,
    body: {
      data: null,
      messages: ['An unexpected error has occurred.'],
    },
  }),
};
