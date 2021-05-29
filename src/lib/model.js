import { v4 as uuidv4 } from 'uuid';

/**
 * Model class
 */
export default class Model {
    /**
     * @constructor
     * @param {Object} param0
     */
    constructor({ id = uuidv4() } = {}) {
        this.id = id;
    }

    /**
     * return model to response
     * @param {Model} model
     * @returns {Object}
     */
    static toResponse(model) {
        return model;
    }
}
