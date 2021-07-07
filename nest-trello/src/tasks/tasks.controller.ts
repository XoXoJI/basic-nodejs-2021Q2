import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller(':idBoard/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(
        @Param('idBoard') idBoard: string,
        @Body() createTaskDto: CreateTaskDto
    ) {
        return await this.tasksService.create(idBoard, createTaskDto);
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
            return new NotFoundException('task not found');
        }

        return task;
    }

    @Patch(':id')
    async update(
        @Param('idBoard') idBoard: string,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        const task = await this.tasksService.update(idBoard, id, updateTaskDto);

        if (!task) {
            return new NotFoundException('task not found');
        }

        return task;
    }

    @Delete(':id')
    async remove(
        @Param('idBoard') idBoard: string,
        @Param('id') id: string
    ) {
        return await this.tasksService.remove(idBoard, id);
    }
}
