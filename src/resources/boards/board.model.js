import Model from '../../lib/model';

export default class Board extends Model {
    /**
     * @constructor
     * @param {Object} param0
     */
    constructor({
        id,
        title = 'title',
        columns = [],
    } = {}) {
        super({ id });

        this.title = title;
        this.columns = columns;
    }
}
