const Model = require('../../lib/model');

class User extends Model {
    /**
     * @constructor
     * @param {Object} param0
     */
    constructor({
        id,
        name = 'USER',
        login = 'user',
        password = 'P@55w0rd',
    } = {}) {
        super({ id });

        this.name = name;
        this.login = login;
        this.password = password;
    }

    /**
     * return model to response
     * @param {User} model
     * @returns {Object}
     */
    static toResponse(user) {
        const { id, name, login } = user;
        return { id, name, login };
    }
}

module.exports = User;
