import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742223410676 implements MigrationInterface {
    name = 'Migration1742223410676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "Rating"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "Review"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "rating" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "review" text`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:56:54.377Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:56:54.378Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:56:54.392Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-17 14:55:22.614'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-17 14:55:22.601'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-17 14:55:22.599'`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "review"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "Review" text`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD "Rating" integer NOT NULL`);
    }

}
