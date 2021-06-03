import { Response } from 'express';
import CRUDController from '../../lib/controller/crudController';
import EntityNotExistsError from '../../lib/error/dbError/entityNotExistsError';
import Model from '../../lib/model';
import { TaskService } from './task.service';

export default class TaskController extends CRUDController {
    constructor(
        protected service: TaskService,
        protected toResponse: (arg0: Model) => Partial<Model>
    ) {
        super(service, toResponse);
    }

    async getAllFromBoard(idBoard: string, res: Response) {
        const tasks = await this.service.getAllFromBoard(idBoard);

        res.json(tasks.map(this.toResponse));
    }


    async getFromBoard(idBoard: string, id: string, res: Response) {
        const task = await this.service.getFromBoard(idBoard, id);

        if (!task) {
            res.sendStatus(404);
        } else {
            res.json(this.toResponse(task));
        }
    }


    async deleteFromBoard(idBoard: string, id: string, res: Response) {
        try {
            await this.service.deleteFromBoard(idBoard, id);

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