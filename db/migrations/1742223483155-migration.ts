import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742223483155 implements MigrationInterface {
    name = 'Migration1742223483155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" RENAME COLUMN "booked_at" TO "created_at"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:58:06.857Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:58:06.858Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:58:06.871Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-17 14:56:54.392'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-17 14:56:54.378'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-17 14:56:54.377'`);
        await queryRunner.query(`ALTER TABLE "ratings" RENAME COLUMN "created_at" TO "booked_at"`);
    }

}
