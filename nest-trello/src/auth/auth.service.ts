import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private usersService: UsersService
    ) {}

    async getToken(loginDTO: LoginDTO) {
        const user = await this.usersService.findForAuth(loginDTO.login);

        if(!user) {
            return null;
        }

        if (await compare(loginDTO.password, user.password)) {
            const token = await this.jwtService.signAsync(
                {
                    userId: user.id,
                    login: user.login
                },
                { expiresIn: '1d' }
            );

            return token;
        }

        return null;
    }
}
