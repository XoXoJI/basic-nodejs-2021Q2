import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

const adminLogin = 'admin'

export class addAdmin1624791856058 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(adminLogin, salt);

        queryRunner.query(
            `
                insert into public.user(name, login, password)\
                values($1, $1, $2)
            `,
            [adminLogin, password]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
                delete from public.user
                where login = $1
            `,
            [adminLogin]
        );
    }
}
