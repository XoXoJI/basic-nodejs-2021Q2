import Task from "../../entity/task";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";
import CRUDService from "../../lib/service/crudService";
import TaskRepository from "./task.memory.repository";

export class TaskService extends CRUDService<Task> {
    constructor(protected repository: TaskRepository) {
        super(repository);
    }

    async getAllFromBoard(boardId: string) {
        const tasks = await this.repository.getAllFromBoard(boardId);

        return tasks;
    }


    async getFromBoard(boardId: string, id: string) {
        const tasks = await this.getAllFromBoard(boardId);

        return tasks.find((task) => task.id === id);
    }


    async deleteFromBoard(boardId: string, id: string) {
        const tasks = await this.getAllFromBoard(boardId);
        const turgetTask = tasks.find((task) => task.id === id);

        if(!turgetTask) {
            throw new EntityNotExistsError(
                `task with id: ${id} not exsits!`
            );
        }

        await super.delete(turgetTask.id);
    }
}

export const taskService = new TaskService(new TaskRepository());
