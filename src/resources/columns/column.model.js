const Model = require('../../lib/model');

class Column extends Model {
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

module.exports = Column;
