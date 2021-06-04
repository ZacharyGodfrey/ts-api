import nodemon from 'nodemon';
import { createConnection } from './database';
import { createRouter } from './router';
import { createServer } from './server';

const db = createConnection();
const router = createRouter(db);
const server = createServer(router);
const environment = (process.env.NODE_ENV || 'local').toLowerCase();
const port = Number(process.env.PORT) || 8080;

console.log(`Starting server in ${environment} environment...`);

if (environment === 'local') {
  process.on('SIGINT', () => {
    console.log('Detected [ctrl + c]...');
    nodemon.emit('exit');
    process.exit();
  });
}

server.listen(port, () => console.log(`Listening on port ${port}...`));
