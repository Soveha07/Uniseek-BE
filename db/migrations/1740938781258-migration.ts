import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740938781258 implements MigrationInterface {
    name = 'Migration1740938781258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_response" DROP CONSTRAINT "FK_3d0a2d7425073910990da681fe8"`);
        await queryRunner.query(`ALTER TABLE "survey_response" DROP COLUMN "studentUid"`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T18:06:24.269Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T18:06:24.269Z"'`);
        await queryRunner.query(`ALTER TABLE "survey_response" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "survey_response" ADD "student_id" uuid`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T18:06:24.624Z"'`);
        await queryRunner.query(`ALTER TABLE "survey_response" ADD CONSTRAINT "FK_299c89a1987a75f19a94d16df0e" FOREIGN KEY ("student_id") REFERENCES "students"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_response" DROP CONSTRAINT "FK_299c89a1987a75f19a94d16df0e"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 17:59:08.665'`);
        await queryRunner.query(`ALTER TABLE "survey_response" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "survey_response" ADD "student_id" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 17:59:08.286'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 17:59:08.296'`);
        await queryRunner.query(`ALTER TABLE "survey_response" ADD "studentUid" uuid`);
        await queryRunner.query(`ALTER TABLE "survey_response" ADD CONSTRAINT "FK_3d0a2d7425073910990da681fe8" FOREIGN KEY ("studentUid") REFERENCES "students"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
