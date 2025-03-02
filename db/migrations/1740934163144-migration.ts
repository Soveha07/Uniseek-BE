import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740934163144 implements MigrationInterface {
    name = 'Migration1740934163144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "FK_e7217383e1e98125ec4af22e76e"`);
        await queryRunner.query(`CREATE TABLE "university_major" ("id" SERIAL NOT NULL, "description" text NOT NULL, "universityId" integer, "majorId" integer, CONSTRAINT "PK_f6e69ad3a2db0b5e25575d28ea9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP CONSTRAINT "UQ_e7217383e1e98125ec4af22e76e"`);
        await queryRunner.query(`ALTER TABLE "majors" DROP COLUMN "university_id"`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T16:49:37.686Z"'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T16:49:37.687Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-02T16:49:38.048Z"'`);
        await queryRunner.query(`ALTER TABLE "university_major" ADD CONSTRAINT "FK_9839750c23d2b461f519696818b" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "university_major" ADD CONSTRAINT "FK_3a80fab935ec0ea13ee95183a21" FOREIGN KEY ("majorId") REFERENCES "majors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "university_major" DROP CONSTRAINT "FK_3a80fab935ec0ea13ee95183a21"`);
        await queryRunner.query(`ALTER TABLE "university_major" DROP CONSTRAINT "FK_9839750c23d2b461f519696818b"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-01 16:21:03.421'`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-01 16:21:03.086'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-01 16:21:03.734'`);
        await queryRunner.query(`ALTER TABLE "majors" ADD "university_id" integer`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "UQ_e7217383e1e98125ec4af22e76e" UNIQUE ("university_id")`);
        await queryRunner.query(`ALTER TABLE "majors" ADD "description" character varying`);
        await queryRunner.query(`DROP TABLE "university_major"`);
        await queryRunner.query(`ALTER TABLE "majors" ADD CONSTRAINT "FK_e7217383e1e98125ec4af22e76e" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
