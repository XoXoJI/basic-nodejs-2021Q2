import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { ColumnsService } from 'src/columns/columns.service';
import { ColumnsModule } from 'src/columns/columns.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Board]),
        ColumnsModule
    ],
    controllers: [BoardsController],
    providers: [BoardsService]
})
export class BoardsModule {}
