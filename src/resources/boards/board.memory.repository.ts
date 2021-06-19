import Board from "../../entity/board";
import CRUDRepository from "../../lib/repository/crudRepository";
import { getRepository } from "typeorm";

export default class BoardRepository extends CRUDRepository<Board> {
    constructor() {
        super();

        this.table = getRepository(Board);
    }
}
