import {createLogger, format, transports} from 'winston';
import path from 'path';
import {DATE_FORMAT} from './config';

export const logger = createLogger({
    level: 'silly',
    format: format.combine(
        format.timestamp({
            format: DATE_FORMAT,
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({
            filename: path.resolve('logs/error.log'),
            level: 'error',
        }),
        new transports.File({ filename: path.resolve('logs/combined.log') }),
    ],
});
