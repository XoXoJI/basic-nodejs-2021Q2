import { Column } from '../../columns/entities/column.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column as dbColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';


@Entity()
export class Board {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @dbColumn('text')
    title!: string;

    @ManyToMany(() => Column, {
        cascade: true
    })
    @JoinTable()
    columns!: Column[];
}
