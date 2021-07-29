import { logIn } from './log-in';
import { logOut } from './log-out';
import { register } from './register';

export const actions = {
  [register.name]: register,
  [logIn.name]: logIn,
  [logOut.name]: logOut,
};
