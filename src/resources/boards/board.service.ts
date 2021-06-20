import { getRepository } from "typeorm";
import Board from "../../entity/board";
import Column from "../../entity/column";
import CRUDService from "../../lib/service/crudService";
import { boardDTO } from "./board.dto";
import BoardRepository from "./board.memory.repository";

export class BoardService extends CRUDService<Board, boardDTO> {
    constructor(protected repository: BoardRepository) {
        super(repository);
    }

    async create(data: Partial<boardDTO>) {
        const board = new Board();

        for (let key in data) {
            if (['columns'].indexOf(key) === -1) {
                //@ts-ignore
                board[key] = data[key];
            }
        }
        board.columns = [];

        if (data.columns) {
            for (let column of data.columns) {
                let entityColumn = await getRepository(Column).findOne(column);

                if(!entityColumn) {
                    entityColumn = await getRepository(Column).save(column);
                }

                board.columns.push(entityColumn);
            }
        }

        const model = await this.repository.create(board);

        return model;
    }

    async update(data: Partial<boardDTO>) {
        const board = new Board();

        for (let key in data) {
            if (['columns'].indexOf(key) === -1) {
                //@ts-ignore
                board[key] = data[key];
            }
        }
        board.columns = [];

        if (data.columns) {
            for (let column of data.columns) {
                let entityColumn = await getRepository(Column).findOne(column);

                if (!entityColumn) {
                    entityColumn = await getRepository(Column).save(column);
                }

                board.columns.push(entityColumn);
            }
        }

        const model = await this.repository.update(board);

        return model;
    }
}

export const boardService = new BoardService(new BoardRepository());
