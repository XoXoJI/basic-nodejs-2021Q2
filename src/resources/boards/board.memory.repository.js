const Board = require("./board.model");
const uuid = require('uuid');
const EntityNotExistsError = require("../../lib/error/dbError/entityNotExistsError");
const idNotUniqueError = require("../../lib/error/dbError/idNotUniqueError");

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
        dataBoard.columns = board.columns;

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

        this.dataBoards.splice(index, 1);
    }
}
