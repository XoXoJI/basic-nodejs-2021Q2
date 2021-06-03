import { DB } from '../driver/dbDriver';
import EntityNotExistsError from '../error/dbError/entityNotExistsError';
import IdNotUniqueError from '../error/dbError/idNotUniqueError';
import Model from '../model.js';


export default abstract class CRUDRepository<T extends Model> {
    table: T[];

    tableName: string;

    constructor(protected db: DB) {
        this.table = [];
        this.tableName = 'tableName';
    }

    async getAll() {
        // TODO: mock implementation. should be replaced during task development
        return this.table;
    }

    async get(id: string) {
        return this.table.find((row) => row.id === id);
    }

    abstract create(body: Partial<T>): Promise<T>;

    abstract update(body: Partial<T>): Promise<T>;

    protected async checkToUnique(model: T) {
        if (model.id) {
            const index = this.table.findIndex(
                (tableRow) => tableRow.id === model.id
            );

            if (index !== -1) {
                throw new IdNotUniqueError(
                    `${this.tableName} with id: ${model.id} exsits!`
                );
            }
        }
    }

    protected async checkToExists(model: T) {
        const tableRow = this.table.find((row) => row.id === model.id);

        if (!tableRow) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${model.id} not exsits!`
            );
        }
    }

    async delete(id: string) {
        const index = this.table.findIndex((tableRow) => tableRow.id === id);

        if (index === -1) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${id} not exsits!`
            );
        }

        this.table.splice(index, 1);
    }
}
