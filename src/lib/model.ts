import { v4 as uuidv4 } from 'uuid';

export default class Model {
    id: string;

    constructor({ id = uuidv4() } = {}) {
        this.id = id;
    }

    static toResponse(model: Model): Object {
        return model;
    }
}
