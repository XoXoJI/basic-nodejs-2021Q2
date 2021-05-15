const { db } = require("../../lib/driver/dbDriver");
const BoardRepository = require("./board.memory.repository");
const Board = require("./board.model");

class BoardService {
    constructor() {
        this.userRepository = new BoardRepository(db);
    }

    async getAll() {
        return await this.userRepository.getAll();
    }

     /**
     * Функция получения доски по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return await this.userRepository.get(id);
    }

    /**
     * Функция создания доски
     * @param {Board} board
     */
    async create(board) {
        return await this.userRepository.create(board);
    }

    /**
     * Функция обновления доски
     * @param {Board} board
     */
    async update(board) {
        return await this.userRepository.update(board);
    }

    /**
     * Функция удаления доски
     * @param {string} id
     */
    async delete(id) {
        //TODO сделать обработку остальных сущностей
        return await this.userRepository.delete(id);
    }
};

module.exports = new BoardService();
