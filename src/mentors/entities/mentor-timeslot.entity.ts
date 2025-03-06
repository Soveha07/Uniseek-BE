import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MentorAvailability } from './mentor-availabilty.entity';

@Entity('mentor_timeslots')
export class MentorTimeslot {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MentorAvailability, (availability) => availability.timeslots, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'availability_id' })
    availability: MentorAvailability;

    @Column({ type: 'time', name: 'available_time' })
    availableTime: string;
}
