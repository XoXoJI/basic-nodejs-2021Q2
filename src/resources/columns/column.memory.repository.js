const Column = require("./column.model");
const uuid = require('uuid');
const EntityNotExistsError = require("../../lib/error/dbError/entityNotExistsError");
const idNotUniqueError = require("../../lib/error/dbError/idNotUniqueError");

module.exports = class ColumnRepository {
    /**
     * Репозиторий досок
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        if(!db) {
            throw new Error("undefined column data!");
        }

        this.dataColumns = db.column;
    }

    async getAll() {
        return this.dataColumns;
    }

    /**
     * Функция получения колонки по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return this.dataColumns.find((dataColumn) => dataColumn.id === id);
    }

    /**
     * Функция создания колонки
     * @param {Column} column
     */
    async create(column) {
        if(column.id) {
            const index = this.dataColumns.findIndex(
              (dataColumn) => dataColumn.id === column.id
            );

            if(index) {
                throw new idNotUniqueError(`column with id: ${column.id} exsits!`);
            }
        }

        column = new Column(column);
        this.dataColumns.push(column);

        return column;
    }

    /**
     * Функция обновления колонки
     * @param {Column} column
     */
    async update(column) {
        const dataColumn = this.dataColumns.find(
          (dataColumn) => dataColumn.id === column.id
        );

        if(!dataColumn) {
            throw new EntityNotExistsError(`column with id: ${column.id} not exsits!`);
        }

        dataColumn.title = column.title;
        dataColumn.order = column.order;

        return dataColumn;
    }

    /**
     * Функция удаления колонки
     * @param {string} id
     */
    async delete(id) {
        const index = this.dataColumns.findIndex(
          (dataColumn) => dataColumn.id === id
        );

        if(!index) {
            throw new EntityNotExistsError(`column with id: ${id} not exsits!`);
        }

        this.dataColumns.splice(index, 1);
    }
}
