import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { GlobalJwtModule } from './global-jwt/global-jwt.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST'),
                port: 5433, //configService.get<number>('POSTGRES_PORT'),
                database: configService.get<string>('POSTGRES_DB'),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                synchronize: false,
                migrationsRun: true,
                autoLoadEntities: true,
                migrations: [join(__dirname, 'migration/**/*.{ts,js}')],
                cli: {
                    migrationsDir: join(__dirname, 'migration'),
                },
                logging: true
            }),
            inject: [ConfigService]
        }),
        UsersModule,
        BoardsModule,
        ColumnsModule,
        TasksModule,
        AuthModule,
        GlobalJwtModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
