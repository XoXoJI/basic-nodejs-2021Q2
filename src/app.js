import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import userRouter from './resources/users/user.router.js';
import boardRouter from './resources/boards/board.router.js';
import taskRouter from './resources/tasks/task.router.js';
import { boardService } from './resources/boards/board.service.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
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

app.param('boardId', async (req, res, next, boardId) => {
    const board = await boardService.get(boardId);

    if(!board) {
        res.sendStatus(404);
    } else {
        req.board = board;

        if(req.body) {
            req.body.boardId = boardId;
        }

        next();
    }
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

export default app;
