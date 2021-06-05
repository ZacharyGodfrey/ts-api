import dotenv from 'dotenv';

export const configureEnvironment = () => {
  dotenv.config();

  process.env.NODE_ENV = (process.env.NODE_ENV || 'local').toLowerCase();
  process.env.PORT = process.env.PORT || '8080';
};
