// <reference path="../types/custom.d.ts" />

import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { join } from 'path';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

const app = express();
const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
