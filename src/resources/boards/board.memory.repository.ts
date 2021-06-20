import { getRepository } from "typeorm";
import Board from "../../entity/board";
import CRUDRepository from "../../lib/repository/crudRepository";

export default class BoardRepository extends CRUDRepository<Board> {
    constructor() {
        super(Board);
    }

    async get(id: string) {
        return await getRepository(this.entity).findOneOrFail({
            relations: ["columns"],
            where: { id },
        });
    }
}
