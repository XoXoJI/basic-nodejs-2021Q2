import { getRepository } from "typeorm";
import User from "../../entity/user";
import CRUDRepository from "../../lib/repository/crudRepository";

export default class UserRepository extends CRUDRepository<User> {
    constructor() {
        super(User);
    }

    async find(login: string) {
        return await getRepository(User).findOne({
            where: { login },
        });
    }
}
