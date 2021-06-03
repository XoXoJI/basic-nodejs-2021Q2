import Board from "./board.model";
import CRUDRepository from "../../lib/repository/crudRepository";
import { DB } from "../../lib/driver/dbDriver";
import EntityNotExistsError from "../../lib/error/dbError/entityNotExistsError";

export default class BoardRepository extends CRUDRepository<Board> {
    constructor(db: DB) {
        super(db);

        this.table = db.board;
        this.tableName = 'board';
    }

    async create(data: Partial<Board>) {
        const model = new Board(data);

        await this.checkToUnique(model);

        this.table.push(model);

        return model;
    }

    async update(data: Partial<Board>) {
        const model = new Board(data);
        const board = this.table.find((row) => row.id === model.id);

        if (!board) {
            throw new EntityNotExistsError(
                `${this.tableName} with id: ${model.id} not exsits!`
            );
        }

        board.title = model.title;
        board.columns = model.columns.map((column) => column);

        return board;
    }

    async delete(id: string) {
        await this._deleteLinkedTasks(id);

        await super.delete(id);
    }

    async _deleteLinkedTasks(id: string) {
        const linkedTasks = this.db.task.filter((task) => task.boardId === id);

        linkedTasks.forEach((linkedTask) => {
            const index = this.db.task.findIndex(
                (task) => task.id === linkedTask.id
            );

            this.db.task.splice(index, 1);
        });
    }
}
