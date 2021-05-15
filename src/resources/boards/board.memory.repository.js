const Board = require("./board.model");
const uuid = require('uuid');
const EntityNotExistsError = require("../../lib/error/dbError/entityNotExistsError");
const idNotUniqueError = require("../../lib/error/dbError/idNotUniqueError");
const ColumnRepository = require("../columns/column.memory.repository");
const Column = require("../columns/column.model");

module.exports = class BoardRepository {
    /**
     * Репозиторий досок
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        if(!db) {
            throw new Error("undefined board data!");
        }

        this.dataBoards = db.board;

        this.columnRepository = new ColumnRepository(db);
    }

    async getAll() {
        return this.dataBoards;
    }

    /**
     * Функция получения доски по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return this.dataBoards.find((dataBoard) => dataBoard.id === id);
    }

    /**
     * Функция создания доски
     * @param {Board} board
     */
    async create(board) {
        if(board.id) {
            const index = this.dataBoards.findIndex(
              (dataBoard) => dataBoard.id === board.id
            );

            if(index) {
                throw new idNotUniqueError(`board with id: ${board.id} exsits!`);
            }
        }

        board.columns = await this._createColumns(board.columns);

        board = new Board(board);
        this.dataBoards.push(board);

        return board;
    }

    /**
     * Функция обновления доски
     * @param {Board} board
     */
    async update(board) {
        const dataBoard = this.dataBoards.find(
          (dataBoard) => dataBoard.id === board.id
        );

        if(!dataBoard) {
            throw new EntityNotExistsError(`board with id: ${board.id} not exsits!`);
        }

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
        const index = this.dataBoards.findIndex(
          (dataBoard) => dataBoard.id === id
        );

        if(!index) {
            throw new EntityNotExistsError(`board with id: ${id} not exsits!`);
        }

        await this._deleteLinkedColumns(this.dataBoards[index]);

        this.dataBoards.splice(index, 1);
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
