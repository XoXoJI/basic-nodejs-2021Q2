const EntityNotExistsError = require("../error/dbError/entityNotExistsError");
const IdNotUniqueError = require("../error/dbError/idNotUniqueError");

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

        return row;
    }

    _checkToUnique(row) {
        if(row.id) {
            const index = this.table.findIndex((tableRow) => tableRow.id === row.id);

            if(index) {
                throw new IdNotUniqueError(`${this.tableName} with id: ${row.id} exsits!`);
            }
        }
    }

    /**
     * redifine me
     * @param {*} row
     */
    async update(row) {
        this._checkToExists(row);

        return row;
    }

    _checkToExists(data) {
        const tableRow = this.table.find((row) => row.id === data.id);

        if (!tableRow) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${data.id} not exsits!`
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
