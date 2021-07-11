import {
    Entity,
    PrimaryGeneratedColumn,
    Column as dbColumn,
} from 'typeorm';

@Entity()
export class Column {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @dbColumn('text')
    title!: string;

    @dbColumn('integer')
    order!: number;
}
