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
     * @param {Task} task
     */
    async create(task) {
        this._checkToUnique(task);

        task = new Task(task);
        this.table.push(task);

        return task;
    }

    /**
     * Функция обновления пользователя
     * @param {Task} task
     */
    async update(task) {
        this._checkToExists(task);

        const dataTask = this.table.find((dataTask) => dataTask.id === task.id);

        // TODO проверка на существование всех зависимостей
        dataTask.title = task.title;
        dataTask.order = task.order;
        dataTask.description = task.description;
        dataTask.userId = task.userId;
        dataTask.boardId = task.boardId;
        dataTask.columnId = task.columnId;

        return dataTask;
    }

    /**
     * Функция удаления пользователя
     * @param {string} id
     */
    async delete(id) {
        await super.delete(id);
    }
}
