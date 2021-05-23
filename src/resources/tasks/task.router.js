const router = require('express').Router();
const TaskController = require('./task.controller');
const Task = require('./task.model');
const taskService = require('./task.service');


const taskController = new TaskController(taskService, Task.toResponse);


/**
 * Get all tasks
 */
router.route('/').get(async (req, res) => {
    await taskController.getAll(req.board.id, res);
});

/**
 * Get task from id
 */
router.route('/:taskId').get(async (req, res) => {
    await taskController.get(req.board.id, req.params.taskId, res);
});

/**
 * Make task
 */
router.route('/').post(async (req, res) => {
    await taskController.create(req.body, res);
});

/**
 * Update task
 */
router.route('/:taskId').put(async (req, res) => {
    await taskController.update(req.params.taskId, req.body, res);
});

/**
 * Delete task
 */
router.route('/:taskId').delete(async (req, res) => {
    await taskController.delete(req.board.id, req.params.taskId, res);
});

module.exports = router;
