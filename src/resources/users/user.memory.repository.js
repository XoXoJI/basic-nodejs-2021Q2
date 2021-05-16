const User = require("./user.model");
const CRUDRepository = require("../../lib/repository/crudRepository");

module.exports = class UserRepository extends CRUDRepository {
    /**
     * Репозиторий пользователей
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.user;
        this.tableName = "user";
    }

    /**
     * Функция создания пользователя
     * @param {User} data
     */
    async create(data) {
        await this._checkToUnique(data);

        const user = new User(data);
        this.table.push(user);

        return user;
    }

    /**
     * Функция обновления пользователя
     * @param {User} data
     */
    async update(data) {
        await this._checkToExists(data);

        const user = this.table.find((row) => row.id === data.id);

        user.name = data.name;
        user.login = data.login;
        user.password = data.password;

        return user;
    }

    /**
     * Функция удаления пользователя
     * @param {string} id
     */
    async delete(id) {
        await this._unlinkLinkedTasks(id);

        await super.delete(id);
    }

    /**
     * Функция удаления связанных тасок
     * @param {string} id
     */
    async _unlinkLinkedTasks(id) {
        const linkedTasks = this.db.task.filter((task) => task.userId === id);

        linkedTasks.forEach((linkedTask) => {
            // В данному случае считаю абсолютное дурацкое ограничение eslinta
            const task = linkedTask;

            task.userId = null;
        });
    }
}
