const CRUDService = require("../service/crudService");
const EntityNotExistsError = require('../error/dbError/entityNotExistsError');

class CRUDController {
    /**
     *
     * @param {CRUDService} crudService
     * @param {Function} toResponse
     */
    constructor(crudService, toResponse) {
        this.service = crudService;
        this.toResponse = toResponse;
    }

    /**
     * Получение всех сущностей
     */
    async getAll(res) {
        const users = await this.service.getAll();

        res.json(users.map(this.toResponse));
    };

    /**
     * Получение сущности по id
     */
    async get(id, res) {
        const user = await this.service.get(id);

        if (!user) {
            res.sendStatus(404);
        } else {
            res.json(this.toResponse(user));
        }
    };

    /**
     * Создание сущности
     */
    async create(body, res) {
        try {
            const user = await this.service.create(body);

            res.status(201).json(this.toResponse(user));
        }
        catch(err) {
            console.error(err.message);
            res.sendStatus(500);
        }
    };

    /**
     * Обновление данных сущности
     */
    async update(id, body, res) {
        try {
            const user = await this.service.update(
                {
                    id,
                    ...body
                }
            );

            res.json(this.toResponse(user));
        }
        catch(err) {
            console.error(err.message);
            res.sendStatus(500);
        }
    }

    /**
     * Удаление сущности
     */
    async delete(id, res) {
        try {
            await this.service.delete(id);

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
    };
}

module.exports = CRUDController;
