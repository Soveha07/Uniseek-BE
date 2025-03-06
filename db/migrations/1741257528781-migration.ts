import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741257528781 implements MigrationInterface {
    name = 'Migration1741257528781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mentor_timeslots" ("id" SERIAL NOT NULL, "availability_id" integer NOT NULL, "available_time" TIME NOT NULL, "availabilityIdId" integer, CONSTRAINT "PK_f55d1b2fb4a922392a6ac5af2fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."mentor_availability_day_of_week_enum" AS ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')`);
        await queryRunner.query(`CREATE TABLE "mentor_availability" ("id" SERIAL NOT NULL, "mentor_id" integer NOT NULL, "day_of_week" "public"."mentor_availability_day_of_week_enum" NOT NULL, "mentorIdId" integer, CONSTRAINT "PK_bbe3ae22ff86f32256b3de2bd4e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "mentors" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "description" character varying, "profile_url" character varying, "university_id" integer NOT NULL, "major_id" integer NOT NULL, CONSTRAINT "PK_67a614446eab992e4d0580afebf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T10:38:59.067Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T10:38:59.067Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-06T10:38:59.745Z"'`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" ADD CONSTRAINT "FK_07af28c29d175b03a99af78155f" FOREIGN KEY ("availabilityIdId") REFERENCES "mentor_availability"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "mentor_availability" ADD CONSTRAINT "FK_b5e699dd8120c69f085cff7774b" FOREIGN KEY ("mentorIdId") REFERENCES "mentors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentor_availability" DROP CONSTRAINT "FK_b5e699dd8120c69f085cff7774b"`);
        await queryRunner.query(`ALTER TABLE "mentor_timeslots" DROP CONSTRAINT "FK_07af28c29d175b03a99af78155f"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-05 16:37:38.801'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-05 16:37:38.46'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-05 16:37:38.459'`);
        await queryRunner.query(`DROP TABLE "mentors"`);
        await queryRunner.query(`DROP TABLE "mentor_availability"`);
        await queryRunner.query(`DROP TYPE "public"."mentor_availability_day_of_week_enum"`);
        await queryRunner.query(`DROP TABLE "mentor_timeslots"`);
    }

}
