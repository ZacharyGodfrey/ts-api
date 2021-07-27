import { Endpoint } from '../types';

export const apiInfo: Endpoint = {
  method: 'GET',
  path: '/',
  validate: async () => [],
  execute: async () => ({
    status: 200,
    body: {
      data: {
        application: 'ts-api',
        timestamp: new Date().toISOString(),
      },
      messages: [],
    },
  }),
};
