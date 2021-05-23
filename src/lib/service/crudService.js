const { db } = require("../driver/dbDriver");
const CRUDRepository = require("../repository/crudRepository");

/**
 * Crud service class
 */
class CRUDService {
    /**
     * @constructor
     */
    constructor() {
        this.repository = new CRUDRepository(db);
    }

    /**
     * Get all entities
     * @returns {Promise<import("../model")[]>} entities
     */
    async getAll() {
        const models = await this.repository.getAll();

        return models;
    }

    /**
     * Get entity from id
     * @param {string} id - id entity
     * @returns {Promise<import("../model")>} entity
     */
    async get(id) {
        const model = await this.repository.get(id);

        return model;
    }

    /**
     * Make entity
     * @param {Promise<import("../model")>} data
     * @returns {Promise<import("../model")>} entity
     */
    async create(data) {
        const model = await this.repository.create(data);

        return model;
    }

    /**
     * Update entity
     * @param {Promise<import("../model")>} data
     * @returns {Promise<import("../model")>} entity
     */
    async update(data) {
        const model = await this.repository.update(data);

        return model;
    }

    /**
     * Delete entity
     * @param {string} id - id entity
     */
    async delete(id) {
        await this.repository.delete(id);
    }
};

module.exports = CRUDService;
