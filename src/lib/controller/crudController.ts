import { Response } from 'express';
import Model from '../model';
import CRUDService from '../service/crudService';
import {StatusCodes} from 'http-status-codes'

export default class CRUDController {
    constructor(
        protected service: CRUDService,
        protected toResponse: <T>(arg0: T) => Partial<T>
    ) {
        this.service = service;
        this.toResponse = toResponse;
    }

    async getAll(res: Response) {
        const models = await this.service.getAll();

        res.json(models.map(this.toResponse));
    }

    async get(id: string, res: Response) {
        const model = await this.service.get(id);

        if (!model) {
            res.sendStatus(StatusCodes.NOT_FOUND);
        } else {
            res.json(this.toResponse(model));
        }
    }

    async create(body: Partial<Model>, res: Response) {
        const model = await this.service.create(body);

        res.status(StatusCodes.CREATED).json(this.toResponse(model));
    }

    async update(id: string, body: Partial<Model>, res: Response) {
        const model = await this.service.update({
            id,
            ...body,
        });

        res.json(this.toResponse(model));
    }

    async delete(id: string, res: Response) {
        await this.service.delete(id);

        res.sendStatus(StatusCodes.NO_CONTENT);
    }
}
