import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740678160934 implements MigrationInterface {
    name = 'Migration1740678160934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T17:42:43.926Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "display_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "provider" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T17:42:44.241Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "refresh_token" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "role" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "role" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "refresh_token" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 17:38:32.99'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "provider" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "display_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

}
