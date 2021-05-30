import CRUDController from '../../lib/controller/crudController';
import EntityNotExistsError from '../../lib/error/dbError/entityNotExistsError.js';

export default class TaskController extends CRUDController {
    /**
     * Get all tasks
     * @param {string} idBoard - id board
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async getAll(idBoard, res) {
        const tasks = await this.service.getAll(idBoard);

        res.json(tasks.map(this.toResponse));
    }

    /**
     * Get task from id
     * @param {string} idBoard - id board
     * @param {string} id - id task
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async get(idBoard, id, res) {
        const task = await this.service.get(idBoard, id);

        if (!task) {
            res.sendStatus(404);
        } else {
            res.json(this.toResponse(task));
        }
    }

    /**
     * Delete task
     * @param {string} idBoard - id board
     * @param {string} id - id task
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async delete(idBoard, id, res) {
        try {
            await this.service.delete(idBoard, id);

            res.sendStatus(200);
        } catch (err) {
            console.error(err.message);

            if (err instanceof EntityNotExistsError) {
                res.sendStatus(204);
            } else {
                res.sendStatus(500);
            }
        }
    }
}
