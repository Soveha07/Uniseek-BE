import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740938344574 implements MigrationInterface {
    name = 'Migration1740938344574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "survey_response" ("id" SERIAL NOT NULL, "study_track" character varying(255) NOT NULL, "strongest_subjects" character varying(255) NOT NULL, "extra_course" character varying(255) NOT NULL, "future_career" character varying(255) NOT NULL, "budget" character varying(255) NOT NULL, "scholarships" character varying(255) NOT NULL, "exchange_program" character varying(255) NOT NULL, "facilities" character varying(255) NOT NULL, "shift" character varying(255) NOT NULL, "class_size" character varying(255) NOT NULL, "student_id" character varying(255) NOT NULL, "studentUid" uuid, CONSTRAINT "PK_d9326eb52bf8b23d56a39ce419a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T17:59:08.286Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T17:59:08.296Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T17:59:08.665Z"'`);
        await queryRunner.query(`ALTER TABLE "survey_response" ADD CONSTRAINT "FK_3d0a2d7425073910990da681fe8" FOREIGN KEY ("studentUid") REFERENCES "students"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_response" DROP CONSTRAINT "FK_3d0a2d7425073910990da681fe8"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 16:49:38.048'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 16:49:37.686'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 16:49:37.687'`);
        await queryRunner.query(`DROP TABLE "survey_response"`);
    }

}
