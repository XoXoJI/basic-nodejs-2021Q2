import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('login')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() loginDTO: LoginDTO) {
        const token = await this.authService.getToken(loginDTO);

        if(!token) {
            throw new ForbiddenException();
        }

        return {token};
    }
}
