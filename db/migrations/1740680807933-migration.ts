import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740680807933 implements MigrationInterface {
    name = 'Migration1740680807933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" ADD "created_at" TIMESTAMP NOT NULL DEFAULT '"2025-02-27T18:26:51.679Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T18:26:50.976Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T18:26:51.346Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 18:23:50.182'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 18:23:49.855'`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "created_at"`);
    }

}
