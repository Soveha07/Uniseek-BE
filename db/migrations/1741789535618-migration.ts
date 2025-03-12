import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1741789535618 implements MigrationInterface {
    name = 'Migration1741789535618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-12T14:25:39.361Z"'`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-12T14:25:39.474Z"'`);
        await queryRunner.query(`ALTER TYPE "public"."booking_status" RENAME TO "booking_status_old"`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status" AS ENUM('pending', 'ongoing', 'completed', 'cancelled', 'declined')`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "public"."booking_status" USING "status"::"text"::"public"."booking_status"`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."booking_status_old"`);
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '"2025-03-12T14:25:39.475Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "universities" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:33:34.293'`);
        await queryRunner.query(`CREATE TYPE "public"."booking_status_old" AS ENUM('pending', 'ongoing', 'completed')`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "status" TYPE "public"."booking_status_old" USING "status"::"text"::"public"."booking_status_old"`);
        await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."booking_status"`);
        await queryRunner.query(`ALTER TYPE "public"."booking_status_old" RENAME TO "booking_status"`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:33:34.297'`);
        await queryRunner.query(`ALTER TABLE "majors" ALTER COLUMN "created_at" SET DEFAULT '2025-03-09 14:33:34.279'`);
    }

}
