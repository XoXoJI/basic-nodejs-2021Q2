import { Router } from 'express';
import CRUDController from '../../lib/controller/crudController';
import User from '../../entity/user';
import { userService } from './user.service';

const router = Router();
const crudController = new CRUDController<User>(
    userService,
    ((user: User) => {
        const {id, name, login} = user;

        return { id, name, login };
    }) as <T>(arg0: T) => Partial<T>
);


router.route('/').get(async (_req, res) => {
    await crudController.getAll(res);
});


router.route('/:userId').get(async (req, res) => {
    await crudController.get(req.params.userId, res);
});


router.route('/').post(async (req, res) => {
    await crudController.create(req.body, res);
});


router.route('/:userId').put(async (req, res) => {
    await crudController.update(req.params.userId, req.body, res);
});


router.route('/:userId').delete(async (req, res) => {
    await crudController.delete(req.params.userId, res);
});

export default router;
