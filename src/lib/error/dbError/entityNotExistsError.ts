import DBError from "./dbError.js";

export default class EntityNotExistsError extends DBError {
    /**
     * @constructor
     * @param {string} message - error message
     */
    constructor(message: string) {
        super(message);
        this.name = 'EntityNotExistsError';
    }
}
