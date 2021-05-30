import { db } from "../../lib/driver/dbDriver";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";
import CRUDService from "../../lib/service/crudService";
import TaskRepository from "./task.memory.repository";

export class TaskService extends CRUDService {
    constructor(protected repository: TaskRepository) {
        super(repository);
    }

    async getAllFromBoard(idBoard: string) {
        const tasks = await this.repository.getAllFromBoard(idBoard);

        return tasks;
    }


    async getFromBoard(idBoard: string, id: string) {
        const tasks = await this.getAllFromBoard(idBoard);

        return tasks.find((task) => task.id === id);
    }


    async deleteFromBoard(idBoard: string, id: string) {
        const tasks = await this.getAllFromBoard(idBoard);
        const turgetTask = tasks.find((task) => task.id === id);

        if(!turgetTask) {
            throw new EntityNotExistsError(
                `task with id: ${id} not exsits!`
            );
        }

        await super.delete(turgetTask.id);
    }
};

export const taskService = new TaskService(new TaskRepository(db));
