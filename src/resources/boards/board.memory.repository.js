const Board = require("./board.model");
const ColumnRepository = require("../columns/column.memory.repository");
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

        this.columnRepository = new ColumnRepository(db);
    }

    /**
     * Функция получения всех досок
     * @returns {Board[]}
     */
    async getAll() {
        return await super.getAll();
    }

    /**
     * Функция получения доски по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return await super.get(id);
    }

    /**
     * Функция создания доски
     * @param {Board} board
     */
    async create(board) {
        this._checkToUnique(board);

        board.columns = await this._createColumns(board.columns);

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

        await this._deleteLinkedColumns(dataBoard);
        dataBoard.columns = await this._createColumns(board.columns);

        return dataBoard;
    }

    /**
     * Функция удаления доски
     * @param {string} id
     */
    async delete(id) {
        const board = await super.get(id);

        await this._deleteLinkedColumns(board);

        await super.delete(id);
    }

    /**
     * Функция удаления связанных колонок
     * @param {Board} board
     */
    async _deleteLinkedColumns(board) {
        for(let column of board.columns) {
            await this.columnRepository.delete(column.id);
        }
    }

    /**
     * Функция создания колонок
     * @param {Column[]} columns
     * @returns {Column[]}
     */
    async _createColumns(columns) {
        /**
         * @type {Column[]}
         */
        const newColumns = [];

        for(let column of columns) {
            const columnRow = await this.columnRepository.create(column);

            newColumns.push(columnRow);
        }

        return newColumns;
    }
}
