import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { ColumnsService } from '../columns/columns.service';
import { Column } from '../columns/entities/column.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private repositoryBoard: Repository<Board>,
        private columnsService: ColumnsService
    ) {}

    async create(createBoardDto: CreateBoardDto) {
        const boardDTO = _.clone(createBoardDto);

        if (boardDTO.columns.length) {
            boardDTO.columns = await this.getColumnsEntities(boardDTO.columns);
        }

        return await this.repositoryBoard.save(boardDTO);
    }

    async findAll() {
        return await this.repositoryBoard.createQueryBuilder('board')
            .leftJoinAndSelect('board.columns', 'column')
            .orderBy('column.order', 'ASC')
            .getMany();
    }

    async findOne(id: string) {
        return await this.repositoryBoard.createQueryBuilder('board')
            .leftJoinAndSelect('board.columns', 'column')
            .orderBy('column.order', 'ASC')
            .where({ id })
            .getOne();
    }

    async update(id: string, updateBoardDto: UpdateBoardDto) {
        const boardDTO = _.clone(updateBoardDto);

        if (boardDTO.columns?.length) {
            boardDTO.columns = await this.getColumnsEntities(boardDTO.columns);
        }

        const board = await this.findOne(id);

        if(!board) {
            return null;
        }

        Object.assign(board, boardDTO);

        return await this.repositoryBoard.save(board);
    }

    async remove(id: string) {
        return await this.repositoryBoard.delete(id);
    }

    private async getColumnsEntities(columnsDTO: Column[]) {
        const columns = [] as Column[];

        for (const columnDTO of columnsDTO) {
            const column = await this.columnsService.createOrUpdate(columnDTO);

            columns.push(column);
        }

        return columns;
    }
}
