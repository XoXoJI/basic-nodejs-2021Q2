import Model from '../../lib/model';

export default class Column extends Model {
    /**
     * @constructor
     * @param {Object} param0
     */
    constructor({ id, title = 'title', order = 1 } = {}) {
        super({ id });

        this.title = title;
        this.order = order;
    }
}
