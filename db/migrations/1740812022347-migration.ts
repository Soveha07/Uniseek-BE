import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740812022347 implements MigrationInterface {
    name = 'Migration1740812022347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "FK_7b5ec2aac7ba84f2f97fe7036c5"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "photoUrl"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "REL_7b5ec2aac7ba84f2f97fe7036c"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "universityId"`);
        await queryRunner.query(`ALTER TABLE "majors" ADD "photo_url" character varying`);
        await queryRunner.query(`ALTER TABLE "majors" ADD "university_id" integer`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "UQ_e7217383e1e98125ec4af22e76e" UNIQUE ("university_id")`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-01T06:53:45.456Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-01T06:53:45.788Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-01T06:53:46.070Z"'`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "FK_e7217383e1e98125ec4af22e76e" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "FK_e7217383e1e98125ec4af22e76e"`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 18:26:51.679'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 18:26:50.976'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-02-27 18:26:51.346'`);
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "UQ_e7217383e1e98125ec4af22e76e"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "university_id"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "photo_url"`);
        await queryRunner.query(`ALTER TABLE "majors" ADD "universityId" integer`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "REL_7b5ec2aac7ba84f2f97fe7036c" UNIQUE ("universityId")`);
        await queryRunner.query(`ALTER TABLE "majors" ADD "photoUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "FK_7b5ec2aac7ba84f2f97fe7036c5" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
