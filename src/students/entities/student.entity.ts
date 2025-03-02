import { Role } from 'src/role.enum';
import { SurveyResponse } from 'src/survey-responses/entities/survey-response.entity';
import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'students' })
export class Student {
    @PrimaryGeneratedColumn('uuid')
    uid: string; // UID

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'display_name', nullable: true })
    displayName: string;

    @Column({ name: 'photo_url', nullable: true })
    photoURL: string | null;

    @Column({ name: 'provider', nullable: true })
    provider: string;

    @Column({ name: 'created_at', default: new Date() })
    createdAt: Date;

    //   @UpdateDateColumn()
    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date | null;

    @Column({ name: 'password', nullable: true })
    password: string;

    @Column({ name: 'phone_number', nullable: true })
    phoneNumber: string;

    @Column({ name: "refresh_token", nullable: true })
    refresh_token: string;

    @Column({ type: 'enum', enum: Role, default: Role.Student, name: "role", nullable: true })
    role: Role;

    @OneToMany(() => SurveyResponse, (surveyResponse) => surveyResponse.student)
    surveyResponses: SurveyResponse[];
}
