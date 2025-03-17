import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742223318882 implements MigrationInterface {
    name = 'Migration1742223318882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "Rating" integer NOT NULL, "Review" text, "booked_at" TIMESTAMP NOT NULL DEFAULT now(), "mentor_id" integer, "student_id" uuid, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:55:22.599Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:55:22.601Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-17T14:55:22.614Z"'`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_1ef2d22bb32231b7334fe27c19c" FOREIGN KEY ("mentor_id") REFERENCES "mentors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_6bbd6528770156568dfc86ca9ec" FOREIGN KEY ("student_id") REFERENCES "students"("uid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_6bbd6528770156568dfc86ca9ec"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_1ef2d22bb32231b7334fe27c19c"`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-13 03:56:08.512'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-13 03:56:08.5'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-13 03:56:08.499'`);
        await queryRunner.query(`DROP TABLE "ratings"`);
    }

}
