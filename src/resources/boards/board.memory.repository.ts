import Board from "../../entity/board";
import CRUDRepository from "../../lib/repository/crudRepository";

export default class BoardRepository extends CRUDRepository<Board> {
    constructor() {
        super(Board);
    }
}
