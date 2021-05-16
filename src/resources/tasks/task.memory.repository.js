const Task = require("./task.model");
const CRUDRepository = require("../../lib/repository/crudRepository");

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
        this._checkToUnique(data);

        const task = new Task(data);
        this.table.push(task);

        return task;
    }

    /**
     * Функция обновления пользователя
     * @param {Task} data
     */
    async update(data) {
        this._checkToExists(data);

        const task = this.table.find((row) => row.id === data.id);

        // TODO проверка на существование всех зависимостей
        task.title = data.title;
        task.order = data.order;
        task.description = data.description;
        task.userId = data.userId;
        task.boardId = data.boardId;
        task.columnId = data.columnId;

        return task;
    }

    /**
     * Функция удаления пользователя
     * @param {string} id
     */
    async delete(id) {
        await super.delete(id);
    }
}
