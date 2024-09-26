import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1727371990297 implements MigrationInterface {
    name = 'Init1727371990297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "start_working_time" character varying(255) NOT NULL, "end_working_time" numeric NOT NULL, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "supplies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "price" numeric NOT NULL, "supplier_id" uuid NOT NULL, CONSTRAINT "PK_49c0dc272c9fcf2723bdfd48be1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "supplies" ADD CONSTRAINT "FK_ed74e03343f5e8bbf84ea0002cb" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplies" DROP CONSTRAINT "FK_ed74e03343f5e8bbf84ea0002cb"`);
        await queryRunner.query(`DROP TABLE "supplies"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}
