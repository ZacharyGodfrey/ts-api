import { Database } from '../database';

export interface RegisterInput {
  username: string;
  password: string;
}

export const validate = async (db: Database, input: RegisterInput) => {
  const errors: string[] = [];

  if (!input.username || input.username.length < 3) {
    errors.push('Username must be at least 3 characters.');
  }

  if (!input.password || input.password.length < 10) {
    errors.push('Password must be at least 10 characters.');
  }

  return errors;
};

export const register = {
  validate,
};
