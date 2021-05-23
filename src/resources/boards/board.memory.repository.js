const Board = require("./board.model");
const Column = require("../columns/column.model");
const CRUDRepository = require("../../lib/repository/crudRepository");

module.exports = class BoardRepository extends CRUDRepository {
    /**
     * Репозиторий досок
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.board;
        this.tableName = 'board';
    }

    /**
     * Функция создания доски
     * @param {Board} data
     */
    async create(data) {
        await this._checkToUnique(data);

        const workData = {};
        Object.assign(workData, data);

        workData.columns = data.columns.map((column) => new Column(column));

        const board = new Board(workData);
        this.table.push(board);

        return board;
    }

    /**
     * Функция обновления доски
     * @param {Board} data
     */
    async update(data) {
        await this._checkToExists(data);

        const board = this.table.find((row) => row.id === data.id);

        board.title = data.title;

        board.columns = data.columns.map((column) => new Column(column));

        return board;
    }

    /**
     * Функция удаления доски
     * @param {string} id
     */
    async delete(id) {
        await this._deleteLinkedTasks(id);

        await super.delete(id);
    }

    /**
     * Функция удаления связанных тасок
     * @param {string} id
     */
    async _deleteLinkedTasks(id) {
        const linkedTasks = this.db.task.filter((task) => task.boardId === id);

        linkedTasks.forEach((linkedTask) => {
            const index = this.db.task.findIndex(
              (task) => task.id === linkedTask.id
            );

            this.db.task.splice(index, 1);
        });
    }
}
