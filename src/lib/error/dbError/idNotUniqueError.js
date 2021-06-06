import DBError from './dbError.js';

export default class IdNotUniqueError extends DBError {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message) {
        super(message);
        this.name = 'IdNotUniqueError';
    }
}
