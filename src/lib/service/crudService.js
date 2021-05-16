const { db } = require("../driver/dbDriver");
const CRUDRepository = require("../repository/crudRepository");

class CRUDService {
    constructor() {
        this.repository = new CRUDRepository(db);
    }

    async getAll() {
        return await this.repository.getAll();
    }

     /**
     * Функция получения строки по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return await this.repository.get(id);
    }

    /**
     * Функция создания строки
     * @param {import("../model")} model
     */
    async create(model) {
        return await this.repository.create(model);
    }

    /**
     * Функция обновления строки
     * @param {import("../model")} model
     */
    async update(model) {
        return await this.repository.update(model);
    }

    /**
     * Функция удаления строки
     * @param {string} id
     */
    async delete(id) {
        // TODO сделать обработку остальных сущностей
        return await this.repository.delete(id);
    }
};

module.exports = CRUDService;
