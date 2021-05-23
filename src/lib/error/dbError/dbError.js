/**
 * Basic db error class
 */
class DBError extends Error {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message) {
        super(message);
        this.name = 'DBError';
    }
}

module.exports = DBError;
