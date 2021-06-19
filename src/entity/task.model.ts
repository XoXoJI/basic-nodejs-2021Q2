import { Entity, PrimaryGeneratedColumn, Column as dbColumn, ManyToOne } from 'typeorm';
import Board from './board.model';
import Column from './column.model';
import User from './user.model';

@Entity()
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @dbColumn('text')
    title!: string;

    @dbColumn('text')
    order!: string;

    @dbColumn('text')
    description!: string;

    @ManyToOne(() => User, {
        cascade: true,
        onDelete: 'SET NULL',
    })
    user!: User;

    @ManyToOne(() => Board, {
        cascade: true,
        onDelete: 'SET NULL',
    })
    board!: Board;

    @ManyToOne(() => Column, {
        cascade: true,
        onDelete: 'SET NULL',
    })
    column!: Column;
}
