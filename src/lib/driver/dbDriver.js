const User = require("../../resources/users/user.model")
const Board = require('../../resources/boards/board.model');

/**
 * @typedef DB
 * @type {Object}
 * @property {User[]} user - таблица user
 * @property {Board[]} board - таблица досок
 */

/**
 * @type {DB}
 */
const db = {
    user: [],
    board: []
}

module.exports = { db };
