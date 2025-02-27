import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740680626459 implements MigrationInterface {
    name = 'Migration1740680626459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "majors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "photoUrl" character varying, "universityId" integer, CONSTRAINT "REL_7b5ec2aac7ba84f2f97fe7036c" UNIQUE ("universityId"), CONSTRAINT "PK_9d82cf80fe0593040e50ccb297e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T18:23:49.855Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-02-27T18:23:50.182Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "FK_7b5ec2aac7ba84f2f97fe7036c5" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "FK_7b5ec2aac7ba84f2f97fe7036c5"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 17:42:44.241'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 17:42:43.926'`);
        await queryRunner.query(`DROP TABLE "majors"`);
    }

}
