import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740677909455 implements MigrationInterface {
    name = 'Migration1740677909455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "PK_24d43f64df69133f41df81e046c"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "uid" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "PK_24d43f64df69133f41df81e046c" PRIMARY KEY ("uid")`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T17:38:32.990Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 17:12:34.197'`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "PK_24d43f64df69133f41df81e046c"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "uid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "PK_24d43f64df69133f41df81e046c" PRIMARY KEY ("uid")`);
    }

}
