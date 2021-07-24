import dotenv from 'dotenv';

import { connectToDatabase } from './server/database';
import { createRouter } from './server/router';
import { createApp } from './server/app';

dotenv.config();

const db = connectToDatabase();
const router = createRouter(db);
const app = createApp(router);
const env = process.env.NODE_ENV || 'local';
const port = process.env.PORT || '8080';

console.log(`Starting application in ${env} environment`);

app.listen(port, () => {
  console.log(`Application is listening on port ${port}`);
});