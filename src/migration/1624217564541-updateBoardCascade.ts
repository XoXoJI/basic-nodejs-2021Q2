import {MigrationInterface, QueryRunner} from "typeorm";

export class updateBoardCascade1624217564541 implements MigrationInterface {
    name = 'updateBoardCascade1624217564541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "column" ADD "order" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "order" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "order" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "column" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "column" ADD "order" bigint NOT NULL`);
    }

}
