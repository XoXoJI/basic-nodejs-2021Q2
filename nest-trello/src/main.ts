import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { logger } from './logger';
import { DATE_FORMAT } from './config';

// Поскольку winston не может в синхронность приходится самому
process.on('uncaughtException', (err) => {
    const { message, stack } = err;
    const level = 'error';
    const timestamp = moment().format(DATE_FORMAT);

    writeFileSync(
        resolve('logs/error.log'),
        JSON.stringify({ level, timestamp, message, stack }),
        { flag: 'a' }
    );
    writeFileSync(resolve('logs/error.log'), '\n', { flag: 'a' });

    process.exit(1);
});

process.on('unhandledRejection', (reason, _promise) => {
    logger.error(reason);
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger(logger)
    });
    app.useGlobalPipes(new ValidationPipe());

    const configService = app.get(ConfigService);
    const port = configService.get("PORT");

    const jwtService = app.get(JwtService);
    app.useGlobalGuards(new AuthGuard(jwtService, configService));

    await app.listen(port);
}
bootstrap();
