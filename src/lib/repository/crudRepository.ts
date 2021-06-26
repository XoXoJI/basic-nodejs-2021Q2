import { DeepPartial, EntityTarget, getRepository } from 'typeorm';


export default abstract class CRUDRepository<T extends { id: string }> {
    constructor(public entity: EntityTarget<T>) { }

    async getAll() {
        return await getRepository(this.entity).find();
    }

    async get(id: string) {
        return await getRepository(this.entity).findOne({
            where: { id },
        });
    }

    async create(data: DeepPartial<T>) {
        const model = await getRepository(this.entity).save(data);

        return model;
    }

    async update(data: T) {
        const instance = await getRepository(this.entity).findOneOrFail(
            data.id
        );

        for (let key in data) {
            instance[key] = data[key];
        }
        //@ts-ignore
        await getRepository(this.entity).save(instance);

        return instance;
    }

    async delete(id: string) {
        const result = await getRepository(this.entity).delete(id);
        return result;
    }
}
