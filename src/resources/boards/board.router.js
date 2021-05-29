import { Router } from 'express';
import CRUDController from '../../lib/controller/crudController.js';
import Board from './board.model.js';
import { boardService } from './board.service.js';

const router = Router();
const crudController = new CRUDController(boardService, Board.toResponse);

/**
 * Get all boards
 */
router.route('/').get(async (req, res) => {
    await crudController.getAll(res);
});

/**
 * Get board from id
 */
router.route('/:boardId').get(async (req, res) => {
    await crudController.get(req.params.boardId, res);
});

/**
 * Maker board
 */
router.route('/').post(async (req, res) => {
    await crudController.create(req.body, res);
});

/**
 * Update board
 */
router.route('/:boardId').put(async (req, res) => {
    await crudController.update(req.params.boardId, req.body, res);
});

/**
 * Delete board
 */
router.route('/:boardId').delete(async (req, res) => {
    await crudController.delete(req.params.boardId, res);
});

export default router;
