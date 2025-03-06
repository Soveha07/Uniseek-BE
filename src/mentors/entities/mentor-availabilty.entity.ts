import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Mentor } from './mentor.entity';
import { MentorTimeslot } from './mentor-timeslot.entity';
import { DayOfWeek } from '../enum/day-of-week.enum';

@Entity('mentor_availability')
export class MentorAvailability {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Mentor, (mentor) => mentor.availabilities, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mentor_id' })
    mentor: Mentor;

    @Column({ type: 'enum', enum: DayOfWeek, name: 'day_of_week' })
    dayOfWeek: DayOfWeek;

    @OneToMany(() => MentorTimeslot, (timeslot) => timeslot.availability)
    timeslots: MentorTimeslot[];
}
