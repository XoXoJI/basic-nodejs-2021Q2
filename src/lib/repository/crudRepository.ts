import { DeepPartial, Repository } from 'typeorm';


export default abstract class CRUDRepository<T extends { id: string }> {
    table!: Repository<T>;

    async getAll() {
        return await this.table.find();
    }

    async get(id: string) {
        return await this.table.findOneOrFail({
            where: { id },
        });
    }

    async create(data: DeepPartial<T>) {
        const model = this.table.create(data);
        await this.table.save(data);

        return model;
    }

    async update(data: T) {
        //@ts-ignore
        await this.table.update(data.id, data);
        const board = await this.get(data.id);

        return board;
    }

    async delete(id: string) {
        return await this.table.delete(id);
    }
}
