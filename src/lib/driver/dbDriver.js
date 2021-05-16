const User = require("../../resources/users/user.model")
const Board = require('../../resources/boards/board.model');
const Column = require('../../resources/columns/column.model');
const Task = require('../../resources/tasks/task.model');

/**
 * @typedef DB
 * @type {Object}
 * @property {User[]} user - таблица user
 * @property {Board[]} board - таблица досок
 * @property {Column[]} column - таблица колонок
 * @property {Task[]} task - таблица тасок
 */

/**
 * @type {DB}
 */
const db = {
    user: [],
    board: [],
    column: [],
    task: []
}

module.exports = { db };
