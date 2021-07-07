import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Column)
        private repositoryColumn: Repository<Column>
    ) {}

    async createOrUpdate(columnDTO: Column) {
        let column = await this.repositoryColumn.findOne(columnDTO.id);

        if (column) {
            Object.assign(column, columnDTO);
        }

        return await this.repositoryColumn.save(column);
    }

    async findOne(id: string) {
        return await this.repositoryColumn.findOne(id);
    }
}
