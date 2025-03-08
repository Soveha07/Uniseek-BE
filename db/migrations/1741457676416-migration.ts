import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741457676416 implements MigrationInterface {
    name = 'Migration1741457676416'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_status" AS ENUM('pending', 'ongoing', 'completed')`);
        await queryRunner.query(`CREATE TABLE "bookings" ("id" SERIAL NOT NULL, "day" character varying NOT NULL, "time" TIME NOT NULL, "booked_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."booking_status" NOT NULL DEFAULT 'pending', "student_id" uuid, "mentor_id" integer, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-08T18:14:56.027Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-08T18:14:56.115Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-08T18:14:56.116Z"'`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_802239bcb6f913e1b959ee587ba" FOREIGN KEY ("student_id") REFERENCES "students"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_5b43b6aad3aeabd7b009746eb1a" FOREIGN KEY ("mentor_id") REFERENCES "mentors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_5b43b6aad3aeabd7b009746eb1a"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_802239bcb6f913e1b959ee587ba"`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-07 04:34:52.834'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-07 04:34:53.222'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-07 04:34:52.789'`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TYPE "public"."booking_status"`);
    }

}
