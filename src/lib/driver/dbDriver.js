/**
 * @typedef DB
 * @type {Object}
 * @property {import("../../resources/users/user.model")[]} user - таблица user
 * @property {import("../../resources/boards/board.model")[]} board - таблица досок
 * @property {import("../../resources/tasks/task.model")[]} task - таблица тасок
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
