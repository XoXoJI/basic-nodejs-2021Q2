import { Router } from 'express';
import TaskController from './task.controller';
import Task from './task.model';
import { taskService } from './task.service';

const router = Router();
const taskController = new TaskController(taskService, Task.toResponse);

router.route('/' as '/:boardId/tasks/').get(async (req, res) => {
    await taskController.getAllFromBoard(req.params.boardId, res);
});

router.route('/:taskId' as '/:boardId/tasks/:taskId').get(async (req, res) => {
    await taskController.getFromBoard(
        req.params.boardId,
        req.params.taskId,
        res
    );
});

router.route('/').post(async (req, res) => {
    await taskController.create(req.body, res);
});

router.route('/:taskId').put(async (req, res) => {
    await taskController.update(req.params.taskId, req.body, res);
});

router.route('/:taskId' as '/:boardId/tasks/:taskId').delete(async (req, res) => {
    await taskController.deleteFromBoard(
        req.params.boardId,
        req.params.taskId,
        res
    );
});

export default router;
