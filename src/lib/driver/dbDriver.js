const User = require("../../resources/users/user.model")
const Board = require('../../resources/boards/board.model');
const Task = require('../../resources/tasks/task.model');

/**
 * @typedef DB
 * @type {Object}
 * @property {User[]} user - таблица user
 * @property {Board[]} board - таблица досок
 * @property {Task[]} task - таблица тасок
 */

/**
 * @type {DB}
 */
const db = {
    user: [],
    board: [],
    task: []
}

module.exports = { db };
