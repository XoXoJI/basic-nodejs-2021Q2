const Column = require("./column.model");
const CRUDRepository = require("../../lib/repository/crudRepository");

module.exports = class ColumnRepository extends CRUDRepository {
    /**
     * Репозиторий досок
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.column;
        this.tableName = 'column';
    }

    /**
     * Функция получения всех колонок
     * @returns {Column[]}
     */
    async getAll() {
        return await super.getAll();
    }

    /**
     * Функция получения колонки по id
     * @param {string} id
     * @returns {Column}
     */
    async get(id) {
        return await super.get(id);
    }

    /**
     * Функция создания колонки
     * @param {Column} column
     */
    async create(column) {
        this._checkToUnique(column);

        column = new Column(column);
        this.table.push(column);

        return column;
    }

    /**
     * Функция обновления колонки
     * @param {Column} column
     */
    async update(column) {
        this._checkToExists(column);

        const dataColumn = this.table.find(
          (dataColumn) => dataColumn.id === column.id
        );

        dataColumn.title = column.title;
        dataColumn.order = column.order;

        return dataColumn;
    }

    /**
     * Функция удаления колонки
     * @param {string} id
     */
    async delete(id) {
        await super.delete(id);
    }
}
