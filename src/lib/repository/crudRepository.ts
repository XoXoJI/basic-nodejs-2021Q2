import { DB } from '../driver/dbDriver.js';
import EntityNotExistsError from '../error/dbError/entityNotExistsError.js';
import IdNotUniqueError from '../error/dbError/idNotUniqueError.js';
import Model from '../model.js';


export default abstract class CRUDRepository {
    table: Model[];
    tableName: string;

    constructor(private db: DB) {
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


    abstract create(body: Object): Promise<Model>
    abstract update(body: Object): Promise<Model>


    protected async checkToUnique(model: Model) {
        if (model.id) {
            const index = this.table.findIndex(
                (tableRow) => tableRow.id === model.id
            );

            if (index) {
                throw new IdNotUniqueError(
                    `${this.tableName} with id: ${model.id} exsits!`
                );
            }
        }
    }


    protected async checkToExists(model: Model) {
        const tableRow = this.table.find((row) => row.id === model.id);

        if (!tableRow) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${model.id} not exsits!`
            );
        }
    }


    async delete(id: string) {
        const index = this.table.findIndex((tableRow) => tableRow.id === id);

        if (index !== -1) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${id} not exsits!`
            );
        }

        this.table.splice(index, 1);
    }
}
