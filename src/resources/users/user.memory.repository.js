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
     * @param {User} user
     */
    async create(user) {
        this._checkToUnique(user);

        user = new User(user);
        this.table.push(user);

        return user;
    }

    /**
     * Функция обновления пользователя
     * @param {User} user
     */
    async update(user) {
        this._checkToExists(user);

        const dataUser = this.table.find((dataUser) => dataUser.id === user.id);

        dataUser.name = user.name;
        dataUser.login = user.login;
        dataUser.password = user.password;

        return dataUser;
    }

    /**
     * Функция удаления пользователя
     * @param {string} id
     */
    async delete(id) {
        await super.delete(id);
    }
}
