const User = require("../../resources/users/user.model")

/**
 * @typedef DB
 * @type {Object}
 * @property {User[]} user - таблица user
 */

/**
 * @type {DB}
 */
const db = {
    user: []
}

module.exports = db;
