import Task from "./task.model";
import CRUDRepository from"../../lib/repository/crudRepository";
import EntityNotExistsError from"../../lib/error/dbError/entityNotExistsError";
import DBError from "../../lib/error/dbError/dbError";
import { DB } from "../../lib/driver/dbDriver";

export default class TaskRepository extends CRUDRepository<Task> {
    constructor(db: DB) {
        super(db);

        this.table = db.task;
        this.tableName = 'task';
    }

    async getAllFromBoard(idBoard: string) {
        return this.table.filter((task) => task.boardId === idBoard);
    }

    async create(data: Partial<Task>) {
        const model = new Task(data);

        await this.checkToUnique(model);
        await this._checkLinkedEntities(model);

        this.table.push(model);

        return model;
    }

    async update(data: Partial<Task>) {
        const model = new Task(data);

        await this.checkToExists(model);
        await this._checkLinkedEntities(model);

        const task = this.table.find((row) => row.id === model.id);

        if (!task) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${model.id} not exsits!`
            );
        }

        task.title = model.title;
        task.order = model.order;
        task.description = model.description;
        task.userId = model.userId;
        task.boardId = model.boardId;
        task.columnId = model.columnId;

        return task;
    }

    async _checkLinkedEntities(model: Task) {
        if (model.boardId) {
            const entity = this.db.board.find(
                (row) => row.id === model.boardId
            );

            if (!entity) {
                throw new EntityNotExistsError(
                    `board with id: ${model.boardId} not exsits!`
                );
            }
        } else {
            throw new DBError('boardId is undefinded');
        }

        if (model.userId) {
            const entity = this.db.user.find((row) => row.id === model.userId);

            if (!entity) {
                throw new EntityNotExistsError(
                    `user with id: ${model.userId} not exsits!`
                );
            }
        }

        if (model.columnId) {
            const board = this.db.board.find((row) => row.id === model.boardId);

            if (!board) {
                throw new EntityNotExistsError(
                    `${this.tableName} with id: ${model.id} not exsits!`
                );
            }

            const column = board.columns.find(
                (taskColumn) => taskColumn.id === model.columnId
            );

            if (!column) {
                throw new EntityNotExistsError(
                    `column with id ${model.boardId} in task with id ${model.columnId} not exsits!`
                );
            }
        }
    }

    async delete(id: string) {
        await super.delete(id);
    }
}
