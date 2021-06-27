import {
    Entity,
    PrimaryGeneratedColumn,
    Column as dbColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import Column from './column';

@Entity()
export default class Board {
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
