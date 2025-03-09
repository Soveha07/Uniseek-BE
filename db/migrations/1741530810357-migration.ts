import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741530810357 implements MigrationInterface {
    name = 'Migration1741530810357'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:33:34.279Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:33:34.293Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-09T14:33:34.297Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:18:18.004'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:18:18.005'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:18:17.967'`);
    }

}
