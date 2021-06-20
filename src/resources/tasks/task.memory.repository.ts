import { getRepository } from "typeorm";
import Task from "../../entity/task";
import CRUDRepository from"../../lib/repository/crudRepository";

export default class TaskRepository extends CRUDRepository<Task> {
    constructor() {
        super(Task);
    }

    async getAllFromBoard(boardId: string) {
        const tasks = await getRepository(this.entity)
            .createQueryBuilder('task')
            .where('task.boardId = :boardId', { boardId })
            .getMany();

        return tasks;
    }
}
