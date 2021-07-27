import { Endpoint } from '../types';
import { register } from './register';
import { apiInfo } from './api-info';
import { logIn } from './log-in';
import { logOut } from './log-out';

export const routes: Endpoint[] = [
  apiInfo,
  register,
  logIn,
  logOut,
  // Additional endpoints go here...
];
