import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from './entities/task.entity';
import { UsersModule } from 'src/users/users.module';
import { BoardsModule } from 'src/boards/boards.module';
import { ColumnsModule } from 'src/columns/columns.module';

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
