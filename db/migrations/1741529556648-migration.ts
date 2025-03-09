import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741529556648 implements MigrationInterface {
    name = 'Migration1741529556648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_response" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '"2025-03-09T14:12:39.836Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:12:39.744Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:12:39.836Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:12:39.837Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-08 18:14:56.116'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-08 18:14:56.115'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-08 18:14:56.027'`);
        await queryRunner.query(`ALTER TABLE "survey_response" DROP COLUMN "created_at"`);
    }

}
