const router = require('express').Router();
const EntityNotExistsError = require('../../lib/error/dbError/entityNotExistsError');
const User = require('./user.model');
const usersService = require('./user.service');

/**
 * Получение всех пользователей
 */
router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
});

/**
 * Получение пользователя по id
 */
router.route('/:userId').get(async (req, res) => {
    const user = await usersService.get(req.params.userId);

    if (!user) {
        res.sendStatus(404);
    } else {
        res.json(User.toResponse(user));
    }
});

/**
 * Создание пользователя
 */
router.route('/').post(async (req, res) => {
    try {
        const user = await usersService.create(req.body);

        res.status(201).json(User.toResponse(user));
    }
    catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

/**
 * Обновление данных пользователя
 */
router.route('/:userId').put(async (req, res) => {
    try {
        const user = await usersService.update(
            Object.assign(
                { id: req.params.userId },
                req.body
            )
        );

        res.json(User.toResponse(user));
    }
    catch(err) {
        console.error(err.message);
        res.sendStatus(500);
    }
});

/**
 * Удаление пользователя
 */
router.route('/:userId').delete(async (req, res) => {
    try {
        await usersService.delete(req.params.userId);

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
