import { Board } from '../../boards/entities/board.entity';
import { Column } from '../../columns/entities/column.entity';
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column as dbColumn, ManyToOne } from 'typeorm';
import { Expose, Transform } from 'class-transformer';

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
    @Expose({ name: 'userId', toPlainOnly: true })
    @Transform(({ value }) => value ? value.id : null, {toPlainOnly: true})
    user!: User | null;

    @ManyToOne(() => Board, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @Expose({ name: 'boardId', toPlainOnly: true })
    @Transform(({ value }) => value ? value.id : null, { toPlainOnly: true })
    board!: Board;

    @ManyToOne(() => Column, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @Expose({ name: 'columnId', toPlainOnly: true })
    @Transform(({ value }) => value ? value.id : null, { toPlainOnly: true })
    column!: Column | null;
}
