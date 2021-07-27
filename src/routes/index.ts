import { Endpoint } from '../types';
import { createUser } from './create-user';
import { apiInfo } from './api-info';

export const routes: Endpoint[] = [apiInfo, createUser];
