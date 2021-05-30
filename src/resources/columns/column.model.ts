import Model from '../../lib/model';

export default class Column extends Model {
    title: string;

    order: number;

    constructor({ id = undefined, title = 'title', order = 1 } = {}) {
        super({ id });

        this.title = title;
        this.order = order;
    }
}
