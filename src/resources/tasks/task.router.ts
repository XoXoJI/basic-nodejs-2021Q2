import { Router } from 'express';
import TaskController from './task.controller';
import Task from '../../entity/task';
import { taskService } from './task.service';
const router = Router({mergeParams: true});
const taskController = new TaskController(
    taskService,
    ((task: Task) => {
        return {
            id: task.id,
            title: task.title,
            order: +task.order,
            description: task.description,
            userId: task.user?.id ? task.user?.id : null,
            boardId: task.board?.id ? task.board?.id : null,
            columnId: task.column?.id ? task.column?.id : null,
        };


    }) as <T>(arg0: T) => Partial<T>
);

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

router.route('/' as '/:boardId/tasks/').post(async (req, res) => {
    await taskController.create(
        Object.assign(req.body, { boardId: req.params.boardId }),
        res
    );
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
