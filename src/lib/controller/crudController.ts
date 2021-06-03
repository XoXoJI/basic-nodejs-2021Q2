import { Response } from 'express';
import EntityNotExistsError from '../error/dbError/entityNotExistsError';
import Model from '../model.js';
import CRUDService from '../service/crudService';

export default class CRUDController {
    constructor(
        protected service: CRUDService,
        protected toResponse: (arg0: Model) => Partial<Model>
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
            res.sendStatus(404);
        } else {
            res.json(this.toResponse(model));
        }
    }

    async create(body: Partial<Model>, res: Response) {
        try {
            const model = await this.service.create(body);

            res.status(201).json(this.toResponse(model));
        } catch (err) {
            console.error(err.message);
            res.sendStatus(500);
        }
    }

    async update(id: string, body: Partial<Model>, res: Response) {
        try {
            const model = await this.service.update({
                id,
                ...body,
            });

            res.json(this.toResponse(model));
        } catch (err) {
            console.error(err.message);
            res.sendStatus(500);
        }
    }

    async delete(id: string, res: Response) {
        try {
            await this.service.delete(id);

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
