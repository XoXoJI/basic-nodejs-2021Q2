const EntityNotExistsError = require('../error/dbError/entityNotExistsError');

class CRUDController {
    /**
     * @param {import("../service/crudService")} crudService
     * @param {Function} toResponse
     */
    constructor(crudService, toResponse) {
        this.service = crudService;
        this.toResponse = toResponse;
    }

    /**
     * Get all entities
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async getAll(res) {
        const models = await this.service.getAll();

        res.json(models.map(this.toResponse));
    }

    /**
     * Get entity from id
     * @param {string} id - id entity
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async get(id, res) {
        const model = await this.service.get(id);

        if (!model) {
            res.sendStatus(404);
        } else {
            res.json(this.toResponse(model));
        }
    }

    /**
     * Make entity
     * @param {Object} body - request body
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async create(body, res) {
        try {
            const model = await this.service.create(body);

            res.status(201).json(this.toResponse(model));
        } catch (err) {
            console.error(err.message);
            res.sendStatus(500);
        }
    }

    /**
     * Update entity
     * @param {string} id - id entity
     * @param {Object} body - request body
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async update(id, body, res) {
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

    /**
     * Delete entity
     * @param {string} id - id entity
     * @param {import('express').Response} res - express response Object
     * @returns {Promise<void>}
     */
    async delete(id, res) {
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

module.exports = CRUDController;
