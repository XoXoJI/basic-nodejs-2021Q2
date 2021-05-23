const Model = require('../../lib/model');

class Task extends Model {
    constructor({
        id,
        title = "title",
        order = "order",
        description = "description",
        userId = "userId",
        boardId = "boardId",
        columnId = "columnId"
    } = {}) {
        super({ id });

        this.title = title;
        this.order = order;
        this.description = description;
        this.userId = userId;
        this.boardId = boardId;
        this.columnId = columnId;
    }
}

module.exports = Task;
