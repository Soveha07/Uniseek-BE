import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741257971615 implements MigrationInterface {
    name = 'Migration1741257971615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentor_availability" DROP CONSTRAINT "FK_b5e699dd8120c69f085cff7774b"`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" DROP CONSTRAINT "FK_07af28c29d175b03a99af78155f"`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" DROP COLUMN "mentorIdId"`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" DROP COLUMN "availabilityIdId"`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T10:46:14.845Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T10:46:14.858Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T10:46:15.190Z"'`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" ALTER COLUMN "mentor_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" ALTER COLUMN "availability_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" ADD CONSTRAINT "FK_35e504bebcd1975aea3063c3c0f" FOREIGN KEY ("mentor_id") REFERENCES "mentors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" ADD CONSTRAINT "FK_709d3e408902ad1b9cc3c5effef" FOREIGN KEY ("availability_id") REFERENCES "mentor_availability"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" DROP CONSTRAINT "FK_709d3e408902ad1b9cc3c5effef"`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" DROP CONSTRAINT "FK_35e504bebcd1975aea3063c3c0f"`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" ALTER COLUMN "availability_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" ALTER COLUMN "mentor_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 10:38:59.745'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 10:38:59.067'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-06 10:38:59.067'`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" ADD "availabilityIdId" integer`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" ADD "mentorIdId" integer`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" ADD CONSTRAINT "FK_07af28c29d175b03a99af78155f" FOREIGN KEY ("availabilityIdId") REFERENCES "mentor_availability"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" ADD CONSTRAINT "FK_b5e699dd8120c69f085cff7774b" FOREIGN KEY ("mentorIdId") REFERENCES "mentors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
