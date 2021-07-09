import dotenv from 'dotenv';
import ServerlessHttp from 'serverless-http';

import { connectToDatabase } from './server/database';
import { createRouter } from './server/router';
import { createApp } from './server/app';

dotenv.config();

const db = connectToDatabase();
const router = createRouter(db);
const app = createApp(router);

module.exports.handler = ServerlessHttp(app);
