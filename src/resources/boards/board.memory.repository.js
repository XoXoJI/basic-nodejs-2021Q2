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

        const dataBoard = this.table.find(
          (dataBoard) => dataBoard.id === board.id
        );

        dataBoard.title = board.title;

        dataBoard.columns = board.columns.map((column) => new Column(column));

        return dataBoard;
    }

    /**
     * Функция удаления доски
     * @param {string} id
     */
    async delete(id) {
        const board = await super.get(id);

        await super.delete(id);
    }
}
