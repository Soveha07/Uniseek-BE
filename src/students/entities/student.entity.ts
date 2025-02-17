import { Role } from 'src/role.enum';
import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student {
    @PrimaryColumn()
    uid: string; // UID

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @Column({ name: 'photo_url', nullable: true })
    photoURL: string | null;

    @Column({ name: 'provider' })
    provider: string;

    @Column({ name: 'created_at', default: new Date() })
    createdAt: Date;

    //   @UpdateDateColumn()
    @Column({ name: 'updated_at', nullable: true })
    updatedAt: Date | null;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'phone_number' })
    phoneNumber: string;

    @Column({ name: "refresh_token" })
    refresh_token: string;

    @Column({ type: 'enum', enum: Role, default: Role.Student, name: "role" })
    role: Role;
}
