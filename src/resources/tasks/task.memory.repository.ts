import { getRepository } from "typeorm";
import Task from "../../entity/task";
import CRUDRepository from"../../lib/repository/crudRepository";

export default class TaskRepository extends CRUDRepository<Task> {
    constructor() {
        super();

        this.table = getRepository(Task);
    }
}
