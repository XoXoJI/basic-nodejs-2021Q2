import Task from "./task.model.js";
import CRUDRepository from"../../lib/repository/crudRepository.js";
import EntityNotExistsError from"../../lib/error/dbError/entityNotExistsError.js";
import DBError from"../../lib/error/dbError/dbError.js";

export default class TaskRepository extends CRUDRepository {
    /**
     * @constructor
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.task;
        this.tableName = 'task';
    }

    /**
     * Get all tasks
     * @param {string} idBoard - id board
     * @returns {Promise<Task[]>} tasks
     */
    async getAll(idBoard) {
        return this.table.filter((task) => task.boardId === idBoard);
    }

    /**
     * Create task
     * @param {Object} data
     * @returns {Promise<Task>} task
     */
    async create(data) {
        await this._checkToUnique(data);
        await this._checkLinkedEntities(data);

        const task = new Task(data);
        this.table.push(task);

        return task;
    }

    /**
     * Update task
     * @param {Object} data
     * @returns {Promise<Task>} task
     */
    async update(data) {
        await this._checkToExists(data);
        await this._checkLinkedEntities(data);

        const task = this.table.find((row) => row.id === data.id);

        task.title = data.title;
        task.order = data.order;
        task.description = data.description;
        task.userId = data.userId;
        task.boardId = data.boardId;
        task.columnId = data.columnId;

        return task;
    }

    /**
     * Check linked entities
     * @param {Task} data
     * @returns {Promise<void>}
     */
    async _checkLinkedEntities(data) {
        if (data.boardId) {
            await this._checkLinkedEntity('board', data.boardId);
        } else {
            throw new DBError('boardId is undefinded');
        }

        if (data.userId) {
            await this._checkLinkedEntity('user', data.userId);
        }

        if (data.columnId) {
            const board = this.db.task.find((row) => row.id === data.boardId);
            const column = board.columns.find(
                (taskColumn) => taskColumn.id === data.columnId
            );

            if (!column) {
                throw new EntityNotExistsError(
                    `column with id ${data.boardId} in task with id ${data.columnId} not exsits!`
                );
            }
        }
    }

    /**
     * Check linked entities
     * @param {string} tableName - table name
     * @param {string} id - id table
     * @returns {Promise<void>}
     */
    async _checkLinkedEntity(tableName, id) {
        const entity = this.db[tableName].find((row) => row.id === id);

        if (!entity) {
            throw new EntityNotExistsError(
                `${tableName} with id: ${id} not exsits!`
            );
        }
    }

    /**
     * Delete task
     * @param {string} id - id task
     * @returns {Promise<void>}
     */
    async delete(id) {
        await super.delete(id);
    }
};
