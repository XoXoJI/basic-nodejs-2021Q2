import { DeepPartial, EntityTarget, getRepository } from 'typeorm';


export default abstract class CRUDRepository<T extends { id: string }> {
    constructor(public entity: EntityTarget<T>) {}

    async getAll() {
        return await getRepository(this.entity).find();
    }

    async get(id: string) {
        return await getRepository(this.entity).findOneOrFail({
            where: { id },
        });
    }

    async create(data: DeepPartial<T>) {
        const model = await getRepository(this.entity).save(data);

        return model;
    }

    async update(data: T) {
        //@ts-ignore
        await getRepository(this.entity).update(data.id, data);
        const board = await this.get(data.id);

        return board;
    }

    async delete(id: string) {
        return await getRepository(this.entity).delete(id);
    }
}
