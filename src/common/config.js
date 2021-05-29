import { config } from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({
    path: join(__dirname, '../../.env')
});

export const {
    PORT,
    NODE_ENV,
    MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY,
    AUTH_MODE,
} = process.env;

//export { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE };
