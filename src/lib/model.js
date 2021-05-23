const uuid = require('uuid').v4;

/**
 * Model class
 */
class Model {
    /**
     * @constructor
     * @param {Object} param0
     */
    constructor({
        id = uuid()
    } = {}) {
        this.id = id;
    }

    /**
     * return model to response
     * @param {Model} model
     * @returns
     */
    static toResponse(model) {
        return model;
    }
}

module.exports = Model;
