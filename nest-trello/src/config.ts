import { config } from 'dotenv';
import { join } from 'path';

config({
    path: join(__dirname, '../../.env')
});

export const {
    DATE_FORMAT,
    USE_FASTIFY
} = process.env;
