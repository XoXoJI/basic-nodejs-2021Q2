import Board from "../../entity/board.model";
import Task from "../../entity/task.model";
import User from "../../entity/user.model";

export type DB = {
    user: User[];
    board: Board[];
    task: Task[];
}


const db: DB = {
    user: [],
    board: [],
    task: []
}

export { db };
