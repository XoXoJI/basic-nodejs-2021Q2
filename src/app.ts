// <reference path="../types/custom.d.ts" />

import express, { NextFunction, Request, Response } from 'express';
import {finished} from 'stream';
import swaggerUI from 'swagger-ui-express';
import { join } from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import EntityNotExistsError from './lib/error/dbError/entityNotExistsError';

const app = express();
const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res, next) => {
    const {url, query, body, params} = req;
    finished(res, () => {
        console.log(`${url}, ${JSON.stringify(query)}, ${JSON.stringify(body)}, ${JSON.stringify(params)}, ${res.statusCode}`);
    });

    next();
})

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);

    if (err instanceof EntityNotExistsError) {
        res.sendStatus(404);
    } else {
        res.sendStatus(500);
    }

    next();
})

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});

boardRouter.use('/:boardId/tasks', taskRouter);

app.use('/users', userRouter);
app.use('/boards', boardRouter);


export default app;
