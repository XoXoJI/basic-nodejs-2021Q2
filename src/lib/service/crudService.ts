import Model from "../model";
import CRUDRepository from "../repository/crudRepository";


export default class CRUDService {
    constructor(protected repository: CRUDRepository<Model>) {
    }


    async getAll() {
        const models = await this.repository.getAll();

        return models;
    }


    async get(id: string) {
        const model = await this.repository.get(id);

        return model;
    }


    async create(data: Object) {
        const model = await this.repository.create(data);

        return model;
    }


    async update(data: Object) {
        const model = await this.repository.update(data);

        return model;
    }


    async delete(id: string) {
        await this.repository.delete(id);
    }
}
