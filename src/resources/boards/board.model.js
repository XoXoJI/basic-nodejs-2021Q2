const Model = require('../../lib/model');

class Board extends Model {
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

module.exports = Board;
