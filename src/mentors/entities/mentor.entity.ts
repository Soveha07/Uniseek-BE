import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { MentorAvailability } from './mentor-availabilty.entity';
import { University } from 'src/universities/entities/university.entity';
import { Major } from 'src/majors/entities/major.entity';


@Entity('mentors')
export class Mentor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', name: 'full_name' })
    fullName: string;

    @Column({ type: 'varchar', nullable: true, name: 'description' })
    description: string;

    @Column({ type: 'varchar', nullable: true, name: 'profile_url' })
    profileUrl: string;

    @Column({ type: 'varchar', nullable: true, name: 'email' })
    email: string;

    @Column({ type: 'varchar', nullable: true, name: 'password' })
    password: string;

    @Column({ type: 'varchar', nullable: true, name: 'phone_number' })
    phoneNumber: string;

    @Column({ type: 'varchar', nullable: true, name: 'telegram_link' })
    telegramLink: string;

    @OneToOne(() => University)
    @JoinColumn({ name: 'university_id' })
    university: University

    @OneToOne(() => Major)
    @JoinColumn({ name: 'major_id' })
    major: Major

    @OneToMany(() => MentorAvailability, (availability) => availability.mentor)
    availabilities: MentorAvailability[];
}
