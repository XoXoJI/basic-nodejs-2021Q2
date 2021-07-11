import { getRepository } from "typeorm";
import Board from "../../entity/board";
import CRUDRepository from "../../lib/repository/crudRepository";

export default class BoardRepository extends CRUDRepository<Board> {
    constructor() {
        super(Board);
    }

    async getAll() {
        const boards = await getRepository(this.entity)
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.columns', 'column')
            .orderBy('column.order', 'ASC')
            .getMany();

        return boards;
    }

    async get(id: string) {
        const board = await getRepository(this.entity)
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.columns', 'column')
            .orderBy('column.order', 'ASC')
            .where({ id })
            .getOne();

        return board;
    }
}
