import { Response } from 'express';
import CRUDController from '../../lib/controller/crudController';
import { TaskService } from './task.service';
import {StatusCodes} from 'http-status-codes'

export default class TaskController extends CRUDController {
    constructor(
        protected service: TaskService,
        protected toResponse:  <T>(arg0: T) => Partial<T>
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
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            res.json(this.toResponse(task));
        }
    }


    async deleteFromBoard(idBoard: string, id: string, res: Response) {
        await this.service.deleteFromBoard(idBoard, id);

        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
