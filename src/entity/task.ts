import { Entity, PrimaryGeneratedColumn, Column as dbColumn, ManyToOne } from 'typeorm';
import Board from './board';
import Column from './column';
import User from './user';

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
        cascade: true
    })
    board!: Board;

    @ManyToOne(() => Column, {
        cascade: true
    })
    column!: Column;
}
