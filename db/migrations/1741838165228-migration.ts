import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741838165228 implements MigrationInterface {
    name = 'Migration1741838165228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-13T03:56:08.499Z"'`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "FK_301405916beb426abc2712b1e9d"`);
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "UQ_301405916beb426abc2712b1e9d"`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-13T03:56:08.500Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-13T03:56:08.512Z"'`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "FK_301405916beb426abc2712b1e9d" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mentors" DROP CONSTRAINT "FK_301405916beb426abc2712b1e9d"`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-12 14:25:39.475'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-12 14:25:39.361'`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "UQ_301405916beb426abc2712b1e9d" UNIQUE ("major_id")`);
        await queryRunner.query(`ALTER TABLE "mentors" ADD CONSTRAINT "FK_301405916beb426abc2712b1e9d" FOREIGN KEY ("major_id") REFERENCES "majors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-12 14:25:39.474'`);
    }

}
