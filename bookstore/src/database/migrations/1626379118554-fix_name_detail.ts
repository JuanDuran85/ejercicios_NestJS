import {MigrationInterface, QueryRunner} from "typeorm";

export class fixNameDetail1626379118554 implements MigrationInterface {
    name = 'fixNameDetail1626379118554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_details" DROP COLUMN "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_details" ADD "email" character varying`);
    }

}
