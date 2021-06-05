import { connectToDatabase } from './database';
import { configureEnvironment } from './environment';
import { createRouter } from './router';
import { createServer } from './server';

configureEnvironment();

connectToDatabase().then(db => {
  const router = createRouter(db);
  const server = createServer(router);
  const env = process.env.NODE_ENV;
  const port = process.env.PORT;

  console.log(`[START] Starting server in ${env} environment...`);

  server.listen(port, () => {
    console.log(`[START] Listening on port ${port}...`);
  });
});
