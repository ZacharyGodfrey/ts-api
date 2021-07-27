import dotenv from 'dotenv';

import { connectToDatabase } from './database';
import { createServer } from './server';
import { routes } from './routes';

dotenv.config();

const db = connectToDatabase();
const server = createServer(db, routes);
const env = process.env.NODE_ENV || 'local';
const port = process.env.PORT || '8080';

console.info(`Starting application in ${env} environment`);

server.listen(port, () => {
  console.info(`Application is listening on port ${port}`);
});
