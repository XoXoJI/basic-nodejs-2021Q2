import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Column)
        private columnRepository: Repository<Column>
    ) {}

    async createOrUpdate(columnDTO: Column) {
        let column = await this.columnRepository.findOne(columnDTO);

        if (!column) {
            column = await this.columnRepository.save(columnDTO);
        }


        return column;
    }
}
