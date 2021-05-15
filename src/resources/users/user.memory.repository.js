const User = require("./user.model");
const uuid = require('uuid');
const EntityNotExistsError = require("../../lib/error/dbError/entityNotExistsError");
const idNotUniqueError = require("../../lib/error/dbError/idNotUniqueError");
const db = require("../../lib/driver/dbDriver");

module.exports = class UserRepository {
    /**
     * Репозиторий пользователей
     * @param {db} db
     */
    constructor(db) {
        if(!db) {
            throw new Error("undefined user data!");
        }

        this.dataUsers = db.user;
    }

    async getAll() {
        // TODO: mock implementation. should be replaced during task development
        return this.dataUsers;
    }

    /**
     * Функция получения пользователя по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return this.dataUsers.find((dataUser) => dataUser.id === id);
    }

    /**
     * Функция создания пользователя
     * @param {User} user
     */
    async create(user) {
        if(user.id) {
            const index = this.dataUsers.findIndex((dataUser) => dataUser.id === user.id);

            if(index) {
                throw new idNotUniqueError(`user with id: ${user.id} exsits!`);
            }
        }

        user = new User(user);
        this.dataUsers.push(user);

        return user;
    }

    /**
     * Функция обновления пользователя
     * @param {User} user
     */
    async update(user) {
        const dataUser = this.dataUsers.find((dataUser) => dataUser.id === user.id);

        if(!dataUser) {
            throw new EntityNotExistsError(`user with id: ${user.id} not exsits!`);
        }

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
        const index = this.dataUsers.findIndex((dataUser) => dataUser.id === id);

        if(!index) {
            throw new EntityNotExistsError(`user with id: ${id} not exsits!`);
        }

        this.dataUsers.splice(index, 1);
    }
}
