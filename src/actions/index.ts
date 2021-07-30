import { listUsers } from './list-users';
import { signIn } from './sign-in';
import { signOut } from './sign-out';
import { signUp } from './sign-up';

export const actions = {
  [signUp.name]: signUp,
  [signIn.name]: signIn,
  [signOut.name]: signOut,
  [listUsers.name]: listUsers,
};
