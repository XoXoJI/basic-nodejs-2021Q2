/**
 * Basic db error class
 */
export default class DBError extends Error {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message) {
        super(message);
        this.name = 'DBError';
    }
}
