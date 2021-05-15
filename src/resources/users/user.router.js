const router = require('express').Router();
const EntityNotExistsError = require('../../lib/error/dbError/entityNotExistsError');
const User = require('./user.model');
const usersService = require('./user.service');


router.route('/').get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
});


router.route('/:userId').get(async (req, res) => {
    const user = await usersService.get(req.params.userId);

    res.json(User.toResponse(user));
});


router.route('/').post(async (req, res) => {
    try {
        const user = await usersService.create(req.body);

        res.status(201).json(User.toResponse(user));
    }
    catch(err) {
        console.error(err.message);
        res.sendStatus(404);
    }
});


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
        res.sendStatus(404);
    }
});


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
            res.sendStatus(404);
        }
    }
});

module.exports = router;
