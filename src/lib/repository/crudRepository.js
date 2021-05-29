import EntityNotExistsError from '../error/dbError/entityNotExistsError.js';
import IdNotUniqueError from '../error/dbError/idNotUniqueError.js';

/**
 * Crud operations repository class
 */
export default class CRUDRepository {
    /**
     * @constructor
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        if (!db) {
            throw new Error('undefined user data!');
        }

        this.db = db;
        this.table = [];
        this.tableName = 'tableName';
    }

    /**
     * Get all entities
     * @returns {Promise<import("../model")[]>} entities
     */
    async getAll() {
        // TODO: mock implementation. should be replaced during task development
        return this.table;
    }

    /**
     * Get entity from id
     * @param {string} id - id entity
     * @returns {Promise<import("../model")>} entity
     */
    async get(id) {
        return this.table.find((row) => row.id === id);
    }

    /**
     * redifine me
     * Make entity
     * @param {Object} body - request body
     * @returns {Promise<import("../model")>} entity
     */
    async create(body) {
        await this._checkToUnique(body);
        /**
         * @type {import("../model")}
         */
        const row = null;

        return row;
    }

    /**
     *  Check to unique
     * @param {Object} row
     * @returns {Promise<void>}
     */
    async _checkToUnique(row) {
        if (row.id) {
            const index = this.table.findIndex(
                (tableRow) => tableRow.id === row.id
            );

            if (index) {
                throw new IdNotUniqueError(
                    `${this.tableName} with id: ${row.id} exsits!`
                );
            }
        }
    }

    /**
     * redifine me
     * Update entity
     * @param {Object} body - request body
     * @returns {Promise<import("../model")>} entity
     */
    async update(body) {
        await this._checkToExists(body);
        /**
         * @type {import("../model")}
         */
        const row = null;

        return row;
    }

    /**
     * Check to exists entity
     * @param {Promise<import("../model")>} data
     * @returns {Promise<void>}
     */
    async _checkToExists(data) {
        const tableRow = this.table.find((row) => row.id === data.id);

        if (!tableRow) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${data.id} not exsits!`
            );
        }
    }

    /**
     * Delete entity
     * @param {string} id - id entity
     * @returns {Promise<void>}
     */
    async delete(id) {
        const index = this.table.findIndex((tableRow) => tableRow.id === id);

        if (!index === -1) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${id} not exsits!`
            );
        }

        this.table.splice(index, 1);
    }
}
