const CRUDController = require('../../lib/controller/crudController');
const EntityNotExistsError = require('../../lib/error/dbError/entityNotExistsError');

class TaskController extends CRUDController {
    constructor(taskService, toResponse) {
        super(taskService, toResponse);
    }

    async getAll(idBoard, res) {
        const tasks = await this.service.getAll(idBoard);

        res.json(tasks.map(this.toResponse));
    }

    async get(idBoard, id, res) {
        const task = await this.service.get(idBoard, id);

        if (!task) {
            res.sendStatus(404);
        } else {
            res.json(this.toResponse(task));
        }
    }

    async delete(idBoard, id, res) {
        try {
            await this.service.delete(idBoard, id);

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
    }
}

module.exports = TaskController;
