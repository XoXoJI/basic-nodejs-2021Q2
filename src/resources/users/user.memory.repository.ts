import User from "./user.model.js";
import CRUDRepository from "../../lib/repository/crudRepository";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";
import { DB } from "../../lib/driver/dbDriver";

export default class UserRepository extends CRUDRepository<User> {
    constructor(db: DB) {
        super(db);

        this.table = db.user;
        this.tableName = 'user';
    }


    async create(data: Object) {
        const model = new User(data);

        await this.checkToUnique(model);

        this.table.push(model);

        return model;
    }


    async update(data: Object) {
        const model = new User(data);

        await this.checkToExists(model);

        const user = this.table.find((row) => row.id === model.id);

        if(!user) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${model.id} not exsits!`
            );
        }

        user.name = model.name;
        user.login = model.login;
        user.password = model.password;

        return user;
    }


    async delete(id: string) {
        await this._unlinkLinkedTasks(id);

        await super.delete(id);
    }


    async _unlinkLinkedTasks(id: string) {
        const linkedTasks = this.db.task.filter((task) => task.userId === id);

        linkedTasks.forEach((linkedTask) => {
            // В данному случае считаю абсолютное дурацкое ограничение eslinta
            const task = linkedTask;

            task.userId = null;
        });
    }
};
