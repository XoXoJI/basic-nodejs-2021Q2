import { DeepPartial } from "typeorm";
import CRUDRepository from "../repository/crudRepository";


export default class CRUDService<T extends { id: string; }> {
    constructor(protected repository: CRUDRepository<T>) {}

    async getAll() {
        const models = await this.repository.getAll();

        return models;
    }

    async get(id: string) {
        const model = await this.repository.get(id);

        return model;
    }

    async create(data: DeepPartial<T>) {
        const model = await this.repository.create(data);

        return model;
    }

    async update(data: Partial<T>) {
        //@ts-ignore
        const model = await this.repository.update(data);

        return model;
    }

    async delete(id: string) {
        await this.repository.delete(id);
    }
}
