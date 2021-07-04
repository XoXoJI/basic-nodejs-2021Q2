import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { BoardsService } from 'src/boards/boards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Task from './entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private repositoryTask: Repository<Task>,
        private userService: UsersService,
        private boardService: BoardsService,
        private columnService: ColumnsService
    ) {}

    async create(idBoard: string, createTaskDto: CreateTaskDto) {
        const task = await this.getTaskEntities(idBoard, createTaskDto);

        return await this.repositoryTask.save(task);
    }

    async findAll(boardId: string) {
        return await this.repositoryTask.createQueryBuilder('task')
            .leftJoinAndSelect("task.board", "board")
            .where('task.boardId = :boardId', { boardId })
            .getMany();
    }

    async findOne(boardId: string, id: string) {
        return await this.repositoryTask.createQueryBuilder('task')
            .leftJoinAndSelect("task.board", "board")
            .where('task.boardId = :boardId', { boardId })
            .andWhere('task.id = :id', { id })
            .getOne();
    }

    async update(idBoard: string, id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.getTaskEntities(idBoard, updateTaskDto);

        return await this.repositoryTask.save(task);
    }

    async remove(idBoard: string, id: string) {
        const task = await this.findOne(idBoard, id);

        return task ? await this.repositoryTask.delete(id) : null;
    }

    private async getTaskEntities(idBoard, taskDTO: UpdateTaskDto) {
        const { userId, columnId, ...task } = taskDTO

        if (userId) {
            (task as Task).user = await this.userService.findOne(userId)
        }

        (task as Task).board = await this.boardService.findOne(idBoard);

        if (columnId) {
            (task as Task).column = await this.columnService.findOne(columnId);
        }

        return task as Task
    }
}
