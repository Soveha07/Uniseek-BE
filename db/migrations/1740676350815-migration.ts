import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740676350815 implements MigrationInterface {
    name = 'Migration1740676350815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."universities_university_type_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TYPE "public"."universities_class_size_enum" AS ENUM('small', 'flexible')`);
        await queryRunner.query(`CREATE TYPE "public"."universities_scholarship_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TYPE "public"."universities_exchange_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TYPE "public"."universities_facility_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TYPE "public"."universities_shift_enum" AS ENUM('one_shift', 'full_time', 'flexible')`);
        await queryRunner.query(`CREATE TABLE "universities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying, "description" character varying, "total_enrollment" integer, "min_price" numeric, "max_price" numeric, "university_type" "public"."universities_university_type_enum", "class_size" "public"."universities_class_size_enum", "scholarship" "public"."universities_scholarship_enum", "exchange" "public"."universities_exchange_enum", "facility" "public"."universities_facility_enum", "shift" "public"."universities_shift_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8da52f2cee6b407559fdbabf59e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."students_role_enum" AS ENUM('student', 'mentor', 'admin')`);
        await queryRunner.query(`CREATE TABLE "students" ("uid" character varying NOT NULL, "email" character varying NOT NULL, "display_name" character varying NOT NULL, "photo_url" character varying, "provider" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT '"2025-02-27T17:12:34.197Z"', "updated_at" TIMESTAMP, "password" character varying NOT NULL, "phone_number" character varying NOT NULL, "refresh_token" character varying NOT NULL, "role" "public"."students_role_enum" NOT NULL DEFAULT 'student', CONSTRAINT "PK_24d43f64df69133f41df81e046c" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TYPE "public"."students_role_enum"`);
        await queryRunner.query(`DROP TABLE "universities"`);
        await queryRunner.query(`DROP TYPE "public"."universities_shift_enum"`);
        await queryRunner.query(`DROP TYPE "public"."universities_facility_enum"`);
        await queryRunner.query(`DROP TYPE "public"."universities_exchange_enum"`);
        await queryRunner.query(`DROP TYPE "public"."universities_scholarship_enum"`);
        await queryRunner.query(`DROP TYPE "public"."universities_class_size_enum"`);
        await queryRunner.query(`DROP TYPE "public"."universities_university_type_enum"`);
    }

}
