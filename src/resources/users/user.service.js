const { db } = require("../../lib/driver/dbDriver");
const UserRepository = require("./user.memory.repository");
const User = require("./user.model");

class UserService {
    constructor() {
        this.userRepository = new UserRepository(db);
    }

    async getAll() {
        return await this.userRepository.getAll();
    }

     /**
     * Функция получения пользователя по id
     * @param {string} id
     * @returns
     */
    async get(id) {
        return await this.userRepository.get(id);
    }

    /**
     * Функция создания пользователя
     * @param {User} user
     */
    async create(user) {
        return await this.userRepository.create(user);
    }

    /**
     * Функция обновления пользователя
     * @param {User} user
     */
    async update(user) {
        return await this.userRepository.update(user);
    }

    /**
     * Функция удаления пользователя
     * @param {string} id
     */
    async delete(id) {
        //TODO сделать обработку остальных сущностей
        return await this.userRepository.delete(id);
    }
};

module.exports = new UserService();
