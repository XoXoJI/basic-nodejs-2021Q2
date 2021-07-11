import { loginDTO } from "./login.dto";
import UserRepository from "../users/user.repository";
import _ from "lodash";
import { compare } from "bcrypt";
import { LoginRepository } from "./login.memory.repository";
import * as jwt from "jsonwebtoken";

export class LoginService {
    private userRepository: UserRepository;
    private loginRepository: LoginRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.loginRepository = new LoginRepository();
    }

    async getToken(data: loginDTO) {
        const user = await this.userRepository.find(data.login);

        if (!user) {
            throw new Error('user undefined');
        }

        if( await compare(data.password, user.password)) {
            let tokenData = this.loginRepository.get(user.id);

            if (!tokenData) {
                const token = jwt.sign({ userId: user.id, login: user.login}, process.env['JWT_SECRET_KEY'] || '', { expiresIn: '1d' });

                tokenData = this.loginRepository.create(user.id, token);
            }

            try {
                jwt.verify(tokenData.token, process.env['JWT_SECRET_KEY'] || '');
            } catch (err) {
                const token = jwt.sign({ userId: user.id, login: user.login }, process.env['JWT_SECRET_KEY'] || '', { expiresIn: '1d' });

                tokenData = this.loginRepository.update(user.id, token);
            }

            return tokenData.token;
        } else {
            throw new Error('user undefined');
        }
    }
}
