// <reference path="../types/custom.d.ts" />

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { join } from 'path';
import YAML from 'yamljs';
import loginRouter from './resources/login/login.router';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import { logger } from './common/logger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import moment from 'moment';
import { DATE_FORMAT, PORT } from './common/config';
import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import ormconfig from './common/ormconfig';
import { log } from './resources/middleware/log';
import { error, notFoundError } from './resources/middleware/error';
import { checkLogin } from './resources/middleware/login';

// Поскольку winston не может в синхронность приходится самому
process.on('uncaughtException', (err) => {
    const {message, stack} = err;
    const level = 'error';
    const timestamp = moment().format(DATE_FORMAT);

    writeFileSync(
        resolve('logs/error.log'),
        JSON.stringify({level, timestamp, message, stack}),
        {flag: 'a'}
    );
    writeFileSync(resolve('logs/error.log'), '\n', {flag: 'a'});

    process.exit(1);
});

process.on('unhandledRejection', (reason, _promise) => {
    logger.error(reason);
});

createConnection(ormconfig as ConnectionOptions).then((_connection) => {
    const app = express();
    const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

    app.use(express.json());

    app.use(log);
    app.use(checkLogin);

    app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
    app.use('/', (req, res, next) => {
        if (req.originalUrl === '/') {
            res.send('Service is running!');
            return;
        }
        next();
    });
    app.use('/login', loginRouter);
    boardRouter.use('/:boardId/tasks', taskRouter);
    app.use('/users', userRouter);
    app.use('/boards', boardRouter);

    app.use(notFoundError);
    app.use(error);

    app.listen(PORT, () =>
        logger.info(`App is running on http://localhost:${PORT}`)
    );
}).catch((err) => {
    console.log(err);
})
