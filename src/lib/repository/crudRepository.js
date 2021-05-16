const EntityNotExistsError = require("../error/dbError/entityNotExistsError");
const idNotUniqueError = require("../error/dbError/idNotUniqueError");

class CRUDRepository {
    /**
     * Репозиторий таблицы
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        if(!db) {
            throw new Error("undefined user data!");
        }

        this.db = db;
        this.table = [];
        this.tableName = 'tableName';
    }

    async getAll() {
        // TODO: mock implementation. should be replaced during task development
        return this.table;
    }

    async get(id) {
        return this.table.find((row) => row.id === id);
    }

    /**
     * redifine me
     * @param {*} row
     */
    async create(row) {
        this._checkToUnique(row);

        return;
    }

    _checkToUnique(row) {
        if(row.id) {
            const index = this.table.findIndex((tableRow) => tableRow.id === row.id);

            if(index) {
                throw new idNotUniqueError(`${this.tableName} with id: ${row.id} exsits!`);
            }
        }
    }

    /**
     * redifine me
     * @param {*} row
     */
    async update(row) {
        this._checkToExists(row);

        return;
    }

    _checkToExists(row) {
        const tableRow = this.table.find((tableRow) => tableRow.id === row.id);

        if (!tableRow) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${row.id} not exsits!`
            );
        }
    }

    /**
     * Функция удаления строки
     * @param {string} id
     */
    async delete(id) {
        const index = this.table.findIndex((tableRow) => tableRow.id === id);

        if(!index === -1) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${id} not exsits!`
            );
        }

        this.table.splice(index, 1);
    }
}

module.exports = CRUDRepository;
