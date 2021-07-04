import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1624122759767 implements MigrationInterface {
    name = 'createTables1624122759767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "order" bigint NOT NULL, CONSTRAINT "PK_cee3c7ee3135537fb8f5df4422b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "login" text NOT NULL, "password" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "order" text NOT NULL, "description" text NOT NULL, "userId" uuid, "boardId" uuid, "columnId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board_columns_column" ("boardId" uuid NOT NULL, "columnId" uuid NOT NULL, CONSTRAINT "PK_f7603f04dd611bd970fa9cbe498" PRIMARY KEY ("boardId", "columnId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2848f61d692b7f8ae6d9e01e40" ON "board_columns_column" ("boardId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a83217589f9e6f6233695e644d" ON "board_columns_column" ("columnId") `);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board_columns_column" ADD CONSTRAINT "FK_2848f61d692b7f8ae6d9e01e407" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "board_columns_column" ADD CONSTRAINT "FK_a83217589f9e6f6233695e644d2" FOREIGN KEY ("columnId") REFERENCES "column"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_columns_column" DROP CONSTRAINT "FK_a83217589f9e6f6233695e644d2"`);
        await queryRunner.query(`ALTER TABLE "board_columns_column" DROP CONSTRAINT "FK_2848f61d692b7f8ae6d9e01e407"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f56fe6f2d8ab0b970f764bd601b"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_d88edac9d7990145ff6831a7bb3"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`DROP INDEX "IDX_a83217589f9e6f6233695e644d"`);
        await queryRunner.query(`DROP INDEX "IDX_2848f61d692b7f8ae6d9e01e40"`);
        await queryRunner.query(`DROP TABLE "board_columns_column"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "column"`);
    }

}
