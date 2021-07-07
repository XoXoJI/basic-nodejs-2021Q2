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
        const linksEntities = await this.getLinksEntities(idBoard, createTaskDto);
        const task = {
            ...createTaskDto,
            ...linksEntities
        }

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
        const linksEntities = await this.getLinksEntities(idBoard, updateTaskDto);
        const task = await this.findOne(idBoard, id);

        if(!task) {
            return null;
        }

        Object.assign(task, linksEntities);

        return await this.repositoryTask.save(task);
    }

    async remove(idBoard: string, id: string) {
        const task = await this.findOne(idBoard, id);

        return task ? await this.repositoryTask.delete(id) : null;
    }

    private async getLinksEntities(idBoard: string, taskDTO: UpdateTaskDto) {
        const { userId, columnId } = taskDTO
        const linksEntities = {}

        if (userId) {
            linksEntities['user'] = await this.userService.findOne(userId)
        }

        linksEntities['board'] = await this.boardService.findOne(idBoard);

        if (columnId) {
            linksEntities['column'] = await this.columnService.findOne(columnId);
        }

        return taskDTO
    }
}
