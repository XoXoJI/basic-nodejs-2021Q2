const DBError = require("./dbError");

class EntityNotExistsError extends DBError {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message) {
        super(message);
        this.name = 'EntityNotExistsError';
    }
}

module.exports = EntityNotExistsError;
