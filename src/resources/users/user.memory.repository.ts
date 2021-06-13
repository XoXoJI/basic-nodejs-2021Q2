import User from "./user.model";
import CRUDRepository from "../../lib/repository/crudRepository";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";
import { DB } from "../../lib/driver/dbDriver";

export default class UserRepository extends CRUDRepository<User> {
    constructor(db: DB) {
        super(db);

        this.table = db.user;
        this.tableName = 'user';
    }

    async create(data: Partial<User>) {
        const model = new User(data);

        await this.checkToUnique(model);

        this.table.push(model);

        return model;
    }

    async update(data: User) {
        await this.checkToExists(data);

        const user = this.table.find((row) => row.id === data.id);

        if (!user) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${data.id} not exsits!`
            );
        }

        user.name = data.name;
        user.login = data.login;
        user.password = data.password;

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
}
