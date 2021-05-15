const DBError = require("./dbError");

class EntityNotExistsError extends DBError {
    constructor(message) {
        super(message);
        this.name = 'EntityNotExistsError';
    }
}

module.exports = EntityNotExistsError;
