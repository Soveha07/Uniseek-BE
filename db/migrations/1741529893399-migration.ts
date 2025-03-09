import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741529893399 implements MigrationInterface {
    name = 'Migration1741529893399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:18:17.967Z"'`);
        await queryRunner.query(`ALTER TABLE "survey_response" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:18:18.004Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:18:18.005Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:12:39.837'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:12:39.836'`);
        await queryRunner.query(`ALTER TABLE "survey_response" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:12:39.836'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:12:39.744'`);
    }

}
