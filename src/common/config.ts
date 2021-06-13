import { config } from 'dotenv';
import { join } from 'path';

config({
    path: join(__dirname, '../../.env')
});

export const {
    PORT,
    NODE_ENV,
    JWT_SECRET_KEY,
    AUTH_MODE,
    DATE_FORMAT
} = process.env;
