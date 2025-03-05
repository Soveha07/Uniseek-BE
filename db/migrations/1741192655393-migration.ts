import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741192655393 implements MigrationInterface {
    name = 'Migration1741192655393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "career_fields" ("id" SERIAL NOT NULL, "major_preference" character varying NOT NULL, CONSTRAINT "PK_587bd148137c21591d09f9758a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "university_careerfield" ("id" SERIAL NOT NULL, "universityId" integer, "careerFieldId" integer, CONSTRAINT "PK_09d715260861de1fdb4c31668cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-05T16:37:38.459Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-05T16:37:38.460Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-05T16:37:38.801Z"'`);
        await queryRunner.query(`ALTER TABLE "university_careerfield" ADD CONSTRAINT "FK_c969b3d62acc7ee3bfdc7c47ac8" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_careerfield" ADD CONSTRAINT "FK_6b73294e4bd4d54c866f701325a" FOREIGN KEY ("careerFieldId") REFERENCES "career_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_careerfield" DROP CONSTRAINT "FK_6b73294e4bd4d54c866f701325a"`);
        await queryRunner.query(`ALTER TABLE "university_careerfield" DROP CONSTRAINT "FK_c969b3d62acc7ee3bfdc7c47ac8"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 18:06:24.624'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 18:06:24.269'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-02 18:06:24.269'`);
        await queryRunner.query(`DROP TABLE "university_careerfield"`);
        await queryRunner.query(`DROP TABLE "career_fields"`);
    }

}
