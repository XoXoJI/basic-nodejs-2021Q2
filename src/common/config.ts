import { config } from 'dotenv';
import { join } from 'path';

config({
    path: join(__dirname, '../../.env')
});

export const {
    PORT,
    NODE_ENV,
    MONGO_CONNECTION_STRING,
    JWT_SECRET_KEY,
    AUTH_MODE,
    DATE_FORMAT
} = process.env;
