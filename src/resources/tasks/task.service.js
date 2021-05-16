const { db } = require("../../lib/driver/dbDriver");
const TaskRepository = require("./task.memory.repository");
const CRUDService = require("../../lib/service/crudService");

class UserService extends CRUDService {
    constructor() {
        super();

        this.repository = new TaskRepository(db);
    }

    async getAll(idBoard) {
        const tasks = await this.repository.getAll(idBoard);

        return tasks;
    }

    async get(idBoard, id) {
        const tasks = await this.getAll(idBoard);

        return tasks.find((task) => task.id === id);
    }

    async delete(idBoard, id) {
        const tasks = await this.getAll(idBoard);
        const turgetTask = tasks.find((task) => task.id === id);

        await super.delete(turgetTask.id);
    }
};

module.exports = new UserService();
