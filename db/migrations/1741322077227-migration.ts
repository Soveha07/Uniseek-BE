import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741322077227 implements MigrationInterface {
    name = 'Migration1741322077227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-07T04:34:52.789Z"'`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "FK_7a6ea3930394006888ba3c9a234"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "UQ_7a6ea3930394006888ba3c9a234"`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-07T04:34:52.834Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-07T04:34:53.222Z"'`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "FK_7a6ea3930394006888ba3c9a234" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "FK_7a6ea3930394006888ba3c9a234"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 11:02:50.779'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 11:02:50.453'`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "UQ_7a6ea3930394006888ba3c9a234" UNIQUE ("university_id")`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "FK_7a6ea3930394006888ba3c9a234" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 11:02:50.44'`);
    }

}
