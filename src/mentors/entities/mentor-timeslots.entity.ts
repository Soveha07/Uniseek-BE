import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MentorAvailability } from './mentor-availability.entity';

@Entity('mentor_timeslots')
export class MentorTimeslot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'availability_id' })
  availabilityId: number;

  @Column({ name: 'available_time' })
  availableTime: string;

  @ManyToOne(() => MentorAvailability, availability => availability.timeslots, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'availability_id' })
  availability: MentorAvailability;
}