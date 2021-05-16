const router = require('express').Router();
const TaskController = require('./task.controller');
const Task = require('./task.model');
const taskService = require('./task.service');


const taskController = new TaskController(taskService, Task.toResponse);


/**
 * Получение всех тасок
 */
router.route('/').get(async (req, res) => {
    await taskController.getAll(req.board.id, res);
});

/**
 * Получение таски по id
 */
router.route('/:taskId').get(async (req, res) => {
    await taskController.get(req.board.id, req.params.taskId, res);
});

/**
 * Создание таски
 */
router.route('/').post(async (req, res) => {
    await taskController.create(req.body, res);
});

/**
 * Обновление данных таски
 */
router.route('/:taskId').put(async (req, res) => {
    await taskController.update(req.params.taskId, req.body, res);
});

/**
 * Удаление таски
 */
router.route('/:taskId').delete(async (req, res) => {
    await taskController.delete(req.board.id, req.params.taskId, res);
});

module.exports = router;
