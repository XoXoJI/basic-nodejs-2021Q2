import DBError from './dbError';

export default class IdNotUniqueError extends DBError {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message: string) {
        super(message);
        this.name = 'IdNotUniqueError';
    }
}
