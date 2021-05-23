const router = require('express').Router();
const CRUDController = require('../../lib/controller/crudController');
const Board = require('./board.model');
const boardService = require('./board.service');

const crudController = new CRUDController(boardService, Board.toResponse);

/**
 * Получение всех досок
 */
router.route('/').get(async (req, res) => {
    await crudController.getAll(res);
});

/**
 * Получение доски по id
 */
router.route('/:boardId').get(async (req, res) => {
    await crudController.get(req.params.boardId, res);
});

/**
 * Создание доски
 */
router.route('/').post(async (req, res) => {
    await crudController.create(req.body, res);
});

/**
 * Обновление данных доски
 */
router.route('/:boardId').put(async (req, res) => {
    await crudController.update(req.params.boardId, req.body, res);
});

/**
 * Удаление доски
 */
router.route('/:boardId').delete(async (req, res) => {
    await crudController.delete(req.params.boardId, res);
});

module.exports = router;
