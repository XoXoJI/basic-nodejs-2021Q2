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
     * @param {Board} board
     */
    async create(board) {
        this._checkToUnique(board);

        board.columns = board.columns.map((column) => new Column(column));

        board = new Board(board);
        this.table.push(board);

        return board;
    }

    /**
     * Функция обновления доски
     * @param {Board} board
     */
    async update(board) {
        this._checkToExists(board);

        const dataBoard = this.table.find((row) => row.id === board.id);

        dataBoard.title = board.title;

        dataBoard.columns = board.columns.map((column) => new Column(column));

        return dataBoard;
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
