import UserRepository from "./user.memory.repository";
import CRUDService from "../../lib/service/crudService";
import User from "../../entity/user";
import { userDTO } from "./user.dto";
import * as bcrypt from "bcrypt";
import * as _ from "lodash";


class UserService extends CRUDService<User, userDTO> {
    constructor() {
        super(new UserRepository())
    }

    private async hashPassword(password: string | undefined) {
        const salt = await bcrypt.genSalt();

        if (!password) {
            throw new Error('password is undefined');
        }

        const hashPassword = await bcrypt.hash(password, salt);

        return hashPassword;
    }

    async create(data: Partial<userDTO>) {
        const newData = _.clone(data);

        newData.password = await this.hashPassword(newData.password);

        const model = await super.create(newData);

        return model;
    }

    async update(data: Partial<userDTO>) {
        const newData = _.clone(data);

        newData.password = await this.hashPassword(newData.password);

        const model = await super.update(newData);

        return model;
    }
}


export const userService = new UserService();
