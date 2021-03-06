import { config } from 'dotenv';
import { join } from 'path';

config({
    path: join(__dirname, '../../.env'),
});

export default {
    type: 'postgres',
    host: process.env['POSTGRES_HOST'],
    port: process.env['POSTGRES_PORT'],
    database: process.env['POSTGRES_DB'],
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    synchronize: false,
    migrationsRun: true,
    entities: [join(__dirname, '../entity/**/*.{ts,js}')],
    migrations: [join(__dirname, '../migration/**/*.{ts,js}')],
    subscribers: [join(__dirname, '../subscriber/**/*.{ts,js}')],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
    autoReconnect: true,
    recconectionIterval: 1000,
    logging: true
};
