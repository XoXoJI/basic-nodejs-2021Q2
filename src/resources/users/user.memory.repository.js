import User from "./user.model.js";
import CRUDRepository from "../../lib/repository/crudRepository.js";

export default class UserRepository extends CRUDRepository {
    /**
     * @constructor
     * @param {import("../../lib/driver/dbDriver").DB} db
     */
    constructor(db) {
        super(db);

        this.table = db.user;
        this.tableName = 'user';
    }

    /**
     * Create user
     * @param {Object} data
     * @returns {Promise<User>} user
     */
    async create(data) {
        await this.checkToUnique(data);

        const user = new User(data);
        this.table.push(user);

        return user;
    }

    /**
     * Update user
     * @param {Object} data
     * @returns {Promise<User>} user
     */
    async update(data) {
        await this.checkToExists(data);

        const user = this.table.find((row) => row.id === data.id);

        user.name = data.name;
        user.login = data.login;
        user.password = data.password;

        return user;
    }

    /**
     * Delete user
     * @param {string} id - id user
     * @returns {Promise<void>}
     */
    async delete(id) {
        await this._unlinkLinkedTasks(id);

        await super.delete(id);
    }

    /**
     * Delete linked tasks
     * @param {string} id - id user
     * @returns {Promise<void>}
     */
    async _unlinkLinkedTasks(id) {
        const linkedTasks = this.db.task.filter((task) => task.userId === id);

        linkedTasks.forEach((linkedTask) => {
            // В данному случае считаю абсолютное дурацкое ограничение eslinta
            const task = linkedTask;

            task.userId = null;
        });
    }
};
