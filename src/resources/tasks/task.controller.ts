import { Response } from 'express';
import CRUDController from '../../lib/controller/crudController';
import { TaskService } from './task.service';
import {StatusCodes} from 'http-status-codes'
import Task from '../../entity/task';

export default class TaskController extends CRUDController<Task> {
    constructor(
        protected service: TaskService,
        protected toResponse:  <T>(arg0: T) => Partial<T>
    ) {
        super(service, toResponse);
    }

    async getAllFromBoard(idBoard: string, res: Response) {
        try{
            const tasks = await this.service.getAllFromBoard(idBoard);

            res.json(tasks.map(this.toResponse));
        }
        catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }


    async getFromBoard(idBoard: string, id: string, res: Response) {
        try {
            const task = await this.service.getFromBoard(idBoard, id);

            if (!task) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            } else {
                res.json(this.toResponse(task));
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }


    async deleteFromBoard(idBoard: string, id: string, res: Response) {
        try {
            await this.service.deleteFromBoard(idBoard, id);

            res.sendStatus(StatusCodes.NO_CONTENT);
        }
        catch(err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }
}
