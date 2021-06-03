import { v4 as uuidv4 } from 'uuid';

export default class Model {
    id: string;

    constructor() {
        this.id = uuidv4();
    }

    static toResponse(model: Model): Partial<Model> {
        return model;
    }
}
