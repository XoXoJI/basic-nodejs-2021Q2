import { db } from "../../lib/driver/dbDriver";
import UserRepository from "./user.memory.repository.js";
import CRUDService from "../../lib/service/crudService";

class UserService extends CRUDService {
    constructor() {
        super();

        this.repository = new UserRepository(db);
    }
};

export const userService = new UserService();
