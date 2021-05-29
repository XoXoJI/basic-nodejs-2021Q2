import { db } from "../../lib/driver/dbDriver.js";
import TaskRepository from "./task.memory.repository.js";
import CRUDService from "../../lib/service/crudService.js";

class TaskService extends CRUDService {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.repository = new TaskRepository(db);
    }

    /**
     * Get all tasks
     * @param {string} idBoard - id board
     * @returns {Promise<import("../model")[]>} tasks
     */
    async getAll(idBoard) {
        const tasks = await this.repository.getAll(idBoard);

        return tasks;
    }

    /**
     * Get task from id
     * @param {string} idBoard - id board
     * @param {string} id - id task
     * @returns {Promise<import("../model")>} task
     */
    async get(idBoard, id) {
        const tasks = await this.getAll(idBoard);

        return tasks.find((task) => task.id === id);
    }

    /**
     * Delete task
     * @param {string} idBoard - id board
     * @param {string} id - id task
     * @returns {Promise<void>}
     */
    async delete(idBoard, id) {
        const tasks = await this.getAll(idBoard);
        const turgetTask = tasks.find((task) => task.id === id);

        await super.delete(turgetTask.id);
    }
};

export const taskService = new TaskService();
