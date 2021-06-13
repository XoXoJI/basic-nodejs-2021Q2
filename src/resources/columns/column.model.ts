import Model from '../../lib/model';

export default class Column extends Model {
    title: string;

    order: number;

    constructor({ title = 'title', order = 1 } = {}) {
        super();

        this.title = title;
        this.order = order;
    }
}
