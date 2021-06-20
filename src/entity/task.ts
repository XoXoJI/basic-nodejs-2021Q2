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

    @dbColumn('integer')
    order!: number;

    @dbColumn('text')
    description!: string;

    @ManyToOne(() => User, {
        cascade: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    })
    user!: User;

    @ManyToOne(() => Board, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    board!: Board;

    @ManyToOne(() => Column, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    column!: Column;
}
