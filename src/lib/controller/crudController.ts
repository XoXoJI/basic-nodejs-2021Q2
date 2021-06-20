import { Response } from 'express';
import CRUDService from '../service/crudService';
import {StatusCodes} from 'http-status-codes'
import { DeepPartial } from 'typeorm';

export default class CRUDController<T extends {id: string}> {
    constructor(
        protected service: CRUDService<T>,
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

    async create(body: DeepPartial<T>, res: Response) {
        const model = await this.service.create(body);

        res.status(StatusCodes.CREATED).json(this.toResponse(model));
    }

    async update(id: string, body: Partial<T>, res: Response) {
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
