import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('boards/:idBoard/tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(
        @Param('idBoard') idBoard: string,
        @Body() createTaskDto: CreateTaskDto
    ) {
        const task = await this.tasksService.create(idBoard, createTaskDto);
        return task;
    }

    @Get()
    async findAll(@Param('idBoard') idBoard: string) {
        return await this.tasksService.findAll(idBoard);
    }

    @Get(':id')
    async findOne(
        @Param('idBoard') idBoard: string,
        @Param('id') id: string
    ) {
        const task = await this.tasksService.findOne(idBoard, id);

        if (!task) {
            throw new NotFoundException('task not found');
        }

        return task;
    }

    @Put(':id')
    async update(
        @Param('idBoard') idBoard: string,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        const task = await this.tasksService.update(idBoard, id, updateTaskDto);

        if (!task) {
            throw new NotFoundException('task not found');
        }

        return task;
    }

    @Delete(':id')
    async remove(
        @Param('idBoard') idBoard: string,
        @Param('id') id: string
    ) {
        const result = await this.tasksService.remove(idBoard, id);

        if (!result?.affected) {
            throw new NotFoundException('task not found');
        }

        return;
    }
}
