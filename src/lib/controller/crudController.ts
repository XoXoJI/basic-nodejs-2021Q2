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
        try {
            const models = await this.service.getAll();

            res.json(models.map(this.toResponse));
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }

    async get(id: string, res: Response) {
        try {
            const model = await this.service.get(id);

            if (!model) {
                res.sendStatus(StatusCodes.NOT_FOUND);
            } else {
                res.json(this.toResponse(model));
            }
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }

    async create(body: DeepPartial<T>, res: Response) {
        try {
            const model = await this.service.create(body);

            res.status(StatusCodes.CREATED).json(this.toResponse(model));
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }

    async update(id: string, body: Partial<T>, res: Response) {
        try {
            const model = await this.service.update({
                id,
                ...body,
            });

            res.json(this.toResponse(model));
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }

    async delete(id: string, res: Response) {
        try {
            await this.service.delete(id);

            res.sendStatus(StatusCodes.NO_CONTENT);
        } catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
        }
    }
}
