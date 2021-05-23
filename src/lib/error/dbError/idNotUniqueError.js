const DBError = require('./dbError');

class IdNotUniqueError extends DBError {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message) {
        super(message);
        this.name = 'IdNotUniqueError';
    }
}

module.exports = IdNotUniqueError;
