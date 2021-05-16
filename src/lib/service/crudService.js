const { db } = require("../driver/dbDriver");
const CRUDRepository = require("../repository/crudRepository");

class CRUDService {
    constructor() {
        this.repository = new CRUDRepository(db);
    }

    async getAll() {
        const models = await this.repository.getAll();

        return models;
    }

     /**
     * Функция получения строки по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        const model = await this.repository.get(id);

        return model;
    }

    /**
     * Функция создания строки
     * @param {import("../model")} data
     */
    async create(data) {
        const model = await this.repository.create(data);

        return model;
    }

    /**
     * Функция обновления строки
     * @param {import("../model")} data
     */
    async update(data) {
        const model = await this.repository.update(data);

        return model;
    }

    /**
     * Функция удаления строки
     * @param {string} id
     */
    async delete(id) {
        // TODO сделать обработку остальных сущностей
        await this.repository.delete(id);
    }
};

module.exports = CRUDService;
