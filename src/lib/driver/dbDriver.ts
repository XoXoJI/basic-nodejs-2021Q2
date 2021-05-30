import Board from "../../resources/boards/board.model";
import Task from "../../resources/tasks/task.model";
import User from "../../resources/users/user.model";

type DB = {
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
