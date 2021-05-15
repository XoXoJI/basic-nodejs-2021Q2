const router = require('express').Router();
const EntityNotExistsError = require('../../lib/error/dbError/entityNotExistsError');
const Board = require('./board.model');
const boardService = require('./board.service');

/**
 * Получение всех досок
 */
router.route('/').get(async (req, res) => {
    const users = await boardService.getAll();

    res.json(users.map(Board.toResponse));
});

/**
 * Получение доски по id
 */
router.route('/:boardId').get(async (req, res) => {
    const board = await boardService.get(req.params.boardId);

    if(!board) {
        res.sendStatus(404);
    }
    else {
        res.json(Board.toResponse(board));
    }
});

/**
 * Создание доски
 */
router.route('/').post(async (req, res) => {
    try {
        const board = await boardService.create(req.body);

        res.status(201).json(Board.toResponse(board));
    }
    catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

/**
 * Обновление данных доски
 */
router.route('/:boardId').put(async (req, res) => {
    try {
        const board = await boardService.update(
            Object.assign(
                { id: req.params.boardId },
                req.body
            )
        );

        res.json(Board.toResponse(board));
    }
    catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

/**
 * Удаление доски
 */
router.route('/:boardId').delete(async (req, res) => {
    try {
        await boardService.delete(req.params.boardId);

        res.sendStatus(200);
    }
    catch(err) {
        console.error(err.message);

        if(err instanceof EntityNotExistsError) {
            res.sendStatus(204);
        } else {
            res.sendStatus(500);
        }
    }
});

module.exports = router;
