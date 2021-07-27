import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import { connectToDatabase } from '../database';
import { processSequentially } from '../utilities';

dotenv.config();

(async () => {
  try {
    const db = connectToDatabase();
    const dir = path.resolve(__dirname, '../schema');
    const files = fs.readdirSync(dir).sort();

    await processSequentially(files, async file => {
      console.info(`Executing SQL script: ${file}`);

      const script = fs.readFileSync(path.resolve(dir, file), 'utf8');

      console.info(script);

      await db.query(script);
    });
  } catch (error) {
    console.error(error);
  }
})();
