import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    name!: string;

    @Column({
        type: 'text',
        unique: true
    })
    login!: string;

    @Column('text')
    password!: string;
}

export default User;
