import Model from '../../lib/model';

export default class Task extends Model {
    title: string;
    order: string;
    description: string;
    userId: string | null;
    boardId: string;
    columnId: string;

    constructor({
        id = undefined,
        title = 'title',
        order = 'order',
        description = 'description',
        userId = '',
        boardId = '',
        columnId = '',
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
