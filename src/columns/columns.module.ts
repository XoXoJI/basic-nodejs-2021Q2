import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Column])],
  controllers: [],
  providers: [ColumnsService],
  exports: [ColumnsService]
})
export class ColumnsModule {}
