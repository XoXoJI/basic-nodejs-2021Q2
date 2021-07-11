import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    whiteListRouters: string[];

    constructor(
        private readonly jwtService: JwtService,
        configService: ConfigService
    ) {
        this.whiteListRouters = configService.get<string>('WHITE_LIST_ROUTERS')?.split(', ') || [];
    }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (this.whiteListRouters.indexOf(request.path || request.url) !== -1) {
            return true;
        }

        if (!request.headers.authorization) {
            throw new UnauthorizedException();
        }

        const [type, token] = request.headers.authorization.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException();
        }

        try {
            await this.jwtService.verifyAsync(token);
        } catch (err) {
            throw new UnauthorizedException();
        }


        return true;
    }
}
