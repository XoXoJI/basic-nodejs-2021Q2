const Task = require("./task.model");
const CRUDRepository = require("../../lib/repository/crudRepository");
const EntityNotExistsError = require("../../lib/error/dbError/entityNotExistsError");
const DBError = require("../../lib/error/dbError/dbError");

module.exports = class TaskRepository extends CRUDRepository {
    /**
     * Репозиторий пользователей
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.task;
        this.tableName = "task";
    }

    async getAll(idBoard) {
        return this.table.filter((task) => task.boardId === idBoard);
    }

    /**
     * Функция создания пользователя
     * @param {Task} data
     */
    async create(data) {
        await this._checkToUnique(data);
        await this._checkLinkedEntities(data);

        const task = new Task(data);
        this.table.push(task);

        return task;
    }

    /**
     * Функция обновления пользователя
     * @param {Task} data
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
     * Функция проверки существования связанных сущностей
     * @param {Task} data
     */
    async _checkLinkedEntities(data) {
        if(data.boardId) {
            await this._checkLinkedEntity('board', data.boardId);
        }
        else {
            throw new DBError('boardId is undefinded');
        }

        if(data.userId) {
            await this._checkLinkedEntity('user', data.userId);
        }

        if(data.columnId) {
            const board = this.db.board.find((row) => row.id === data.boardId);
            const column = board.columns.find(
                (boardColumn) => boardColumn.id === data.columnId
            );

            if(!column) {
                throw new EntityNotExistsError(
                  `column with id ${data.boardId} in board with id ${data.columnId} not exsits!`
                );
            }
        }
    }

    async _checkLinkedEntity(tableName, id) {
        const entity = this.db[tableName].find((row) => row.id === id);

            if(!entity) {
                throw new EntityNotExistsError(
                  `${tableName} with id: ${id} not exsits!`
                );
            }
    }

    /**
     * Функция удаления пользователя
     * @param {string} id
     */
    async delete(id) {
        await super.delete(id);
    }
}
