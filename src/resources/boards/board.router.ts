import { Router } from 'express';
import CRUDController from '../../lib/controller/crudController';
import CRUDService from '../../lib/service/crudService';
import BoardRepository from './board.memory.repository';
import Board from '../../entity/board';

const router = Router();
const boardService = new CRUDService(new BoardRepository());
const crudController = new CRUDController(
    boardService,
    ((board: Board) => board) as <T>(arg0: T) => Partial<T>
);


router.route('/').get(async (_req, res) => {
    await crudController.getAll(res);
});


router.route('/:boardId').get(async (req, res) => {
    await crudController.get(req.params.boardId, res);
});


router.route('/').post(async (req, res) => {
    await crudController.create(req.body, res);
});


router.route('/:boardId').put(async (req, res) => {
    await crudController.update(req.params.boardId, req.body, res);
});


router.route('/:boardId').delete(async (req, res) => {
    await crudController.delete(req.params.boardId, res);
});

export default router;
