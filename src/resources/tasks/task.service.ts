import { getRepository } from "typeorm";
import Task from "../../entity/task";
import User from "../../entity/user";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";
import CRUDService from "../../lib/service/crudService";
import { taskDTO } from "./task.dto";
import TaskRepository from "./task.memory.repository";

export class TaskService extends CRUDService<Task, taskDTO> {
    constructor(protected repository: TaskRepository) {
        super(repository);
    }

    async getAllFromBoard(boardId: string) {
        const tasks = await this.repository.getAllFromBoard(boardId);

        return tasks;
    }

    async create(data: Partial<taskDTO>) {
        const task = new Task();

        for (let key in task) {
            //@ts-ignore
            task[key] = data[key];
        }

        if (data.userId) {
            task.user = await getRepository(User).findOneOrFail(data.userId);
        }

        const model = await this.repository.create(task);

        return model;
    }

    async update(data: Partial<taskDTO>) {
        const task = new Task();

        for (let key in task) {
            //@ts-ignore
            task[key] = data[key];
        }

        if (data.userId) {
            task.user = await getRepository(User).findOneOrFail(data.userId);
        }
        //@ts-ignore
        const model = await this.repository.update(task);

        return model;
    }

    async getFromBoard(boardId: string, id: string) {
        const tasks = await this.getAllFromBoard(boardId);

        return tasks.find((task) => task.id === id);
    }

    async deleteFromBoard(boardId: string, id: string) {
        const tasks = await this.getAllFromBoard(boardId);
        const turgetTask = tasks.find((task) => task.id === id);

        if (!turgetTask) {
            throw new EntityNotExistsError(`task with id: ${id} not exsits!`);
        }

        await super.delete(turgetTask.id);
    }
}

export const taskService = new TaskService(new TaskRepository());
