import Board from "./board.model.js";
import Column from "../columns/column.model.js";
import CRUDRepository from "../../lib/repository/crudRepository.js";

export default class BoardRepository extends CRUDRepository {
    /**
     * @constructor
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.board;
        this.tableName = 'board';
    }

    /**
     * Create board
     * @param {Object} data
     * @returns {Promise<Board>} board
     */
    async create(data) {
        await this.checkToUnique(data);

        const workData = {};
        Object.assign(workData, data);

        workData.columns = data.columns.map((column) => new Column(column));

        const board = new Board(workData);
        this.table.push(board);

        return board;
    }

    /**
     * Update board
     * @param {Object} data
     * @returns {Promise<Board>} board
     */
    async update(data) {
        await this.checkToExists(data);

        const board = this.table.find((row) => row.id === data.id);

        board.title = data.title;

        board.columns = data.columns.map((column) => new Column(column));

        return board;
    }

    /**
     * Delete board
     * @param {string} id - id board
     * @returns {Promise<void>}
     */
    async delete(id) {
        await this._deleteLinkedTasks(id);

        await super.delete(id);
    }

    /**
     * Delete linked tasks
     * @param {string} id - id board
     * @returns {Promise<void>}
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
};
