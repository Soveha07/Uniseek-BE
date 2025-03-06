import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741258967089 implements MigrationInterface {
    name = 'Migration1741258967089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentors" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD "password" character varying`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD "telegram_link" character varying`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T11:02:50.440Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T11:02:50.453Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T11:02:50.779Z"'`);
        await queryRunner.query(`ALTER TABLE "mentors" ALTER COLUMN "university_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "UQ_7a6ea3930394006888ba3c9a234" UNIQUE ("university_id")`);
        await queryRunner.query(`ALTER TABLE "mentors" ALTER COLUMN "major_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "UQ_301405916beb426abc2712b1e9d" UNIQUE ("major_id")`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "FK_7a6ea3930394006888ba3c9a234" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "FK_301405916beb426abc2712b1e9d" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "FK_301405916beb426abc2712b1e9d"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "FK_7a6ea3930394006888ba3c9a234"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "UQ_301405916beb426abc2712b1e9d"`);
        await queryRunner.query(`ALTER TABLE "mentors" ALTER COLUMN "major_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "UQ_7a6ea3930394006888ba3c9a234"`);
        await queryRunner.query(`ALTER TABLE "mentors" ALTER COLUMN "university_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 10:46:15.19'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 10:46:14.858'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 10:46:14.845'`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP COLUMN "telegram_link"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP COLUMN "email"`);
    }

}
