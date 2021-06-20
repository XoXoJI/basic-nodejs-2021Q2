import { DeepPartial } from "typeorm";
import CRUDRepository from "../repository/crudRepository";


export default class CRUDService<T extends { id: string; }, U> {
    constructor(protected repository: CRUDRepository<T>) {}

    async getAll() {
        const models = await this.repository.getAll();

        return models;
    }

    async get(id: string) {
        const model = await this.repository.get(id);

        return model;
    }

    async create(data: Partial<U>) {
        const model = await this.repository.create(data as DeepPartial<T>);

        return model;
    }

    async update(data: Partial<U>) {
        //@ts-ignore
        const model = await this.repository.update(data);

        return model;
    }

    async delete(id: string) {
        return await this.repository.delete(id);
    }
}
