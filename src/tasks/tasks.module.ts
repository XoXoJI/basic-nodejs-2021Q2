import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './entities/task.entity';
import { UsersModule } from '../users/users.module';
import { BoardsModule } from '../boards/boards.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        UsersModule,
        BoardsModule,
        ColumnsModule
    ],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}
