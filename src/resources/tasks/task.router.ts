import { Router } from 'express';
import TaskController from './task.controller';
import Task from './task.model';
import { taskService } from './task.service';

const router = Router();
const taskController = new TaskController(taskService, Task.toResponse);



router.route('/').get(async (req, res) => {
    //@ts-ignore
    await taskController.getAllFromBoard(req.board.id, res);
});


router.route('/:taskId').get(async (req, res) => {
    //@ts-ignore
    await taskController.getFromBoard(req.board.id, req.params.taskId, res);
});


router.route('/').post(async (req, res) => {
    await taskController.create(req.body, res);
});


router.route('/:taskId').put(async (req, res) => {
    await taskController.update(req.params.taskId, req.body, res);
});


router.route('/:taskId').delete(async (req, res) => {
    //@ts-ignore
    await taskController.deleteFromBoard(req.board.id, req.params.taskId, res);
});

export default router;
