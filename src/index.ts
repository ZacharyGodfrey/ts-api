import dotenv from 'dotenv';

import { connectToDatabase } from './database';
import { createServer } from './server';
import { routes } from './routes';

dotenv.config();

const db = connectToDatabase();
const server = createServer(db, routes);
const env = process.env.NODE_ENV || 'local';
const port = process.env.PORT || '8080';

console.log(`Starting application in ${env} environment`);

server.listen(port, () => {
  console.log(`Application is listening on port ${port}`);
});
