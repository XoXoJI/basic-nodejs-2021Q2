import Model from '../../lib/model.js';

export default class Task extends Model {
    /**
     * @constructor
     * @param {Object} param0
     */
    constructor({
        id,
        title = 'title',
        order = 'order',
        description = 'description',
        userId = 'userId',
        boardId = 'boardId',
        columnId = 'columnId',
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
