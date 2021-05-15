const uuid = require('uuid').v4;

class Model {
    constructor({
        id = uuid()
    } = {}) {
        this.id = id;
    }

    static toResponse(model) {
        return model;
    }
}

module.exports = Model;
