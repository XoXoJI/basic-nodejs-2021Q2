import User from "../../entity/user";
import CRUDRepository from "../../lib/repository/crudRepository";
import { getRepository } from "typeorm";

export default class UserRepository extends CRUDRepository<User> {
    constructor() {
        super();

        this.table = getRepository(User);
    }
}
