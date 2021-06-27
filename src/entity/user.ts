import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        type: 'text',
        nullable: false
    })
    name!: string;

    @Column({
        type: 'text',
        unique: true,
        nullable: false
    })
    login!: string;

    @Column({
        type: 'text',
        nullable: false
    })
    password!: string;
}

export default User;
