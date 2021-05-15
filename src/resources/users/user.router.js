const router = require('express').Router();
const CRUDController = require('../../lib/controller/crudController');
const User = require('./user.model');
const usersService = require('./user.service');

const crudController = new CRUDController(usersService, User.toResponse);

/**
 * Получение всех пользователей
 */
router.route('/').get(async (req, res) => {
    await crudController.getAll(res);
});

/**
 * Получение пользователя по id
 */
router.route('/:userId').get(async (req, res) => {
    await crudController.get(req.params.userId, res);
});

/**
 * Создание пользователя
 */
router.route('/').post(async (req, res) => {
    await crudController.create(req.body, res);
});

/**
 * Обновление данных пользователя
 */
router.route('/:userId').put(async (req, res) => {
    await crudController.update(req.params.userId, req.body, res);
});

/**
 * Удаление пользователя
 */
router.route('/:userId').delete(async (req, res) => {
    await crudController.delete(req.params.userId, res);
});

module.exports = router;
