import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Mentor } from './mentor.entity';
import { MentorTimeslot } from './mentor-timeslots.entity';

@Entity('mentor_availability')
export class MentorAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'mentor_id' })
  mentorId: number;

  @Column({ name: 'day_of_week' })
  dayOfWeek: string;

  @ManyToOne(() => Mentor, mentor => mentor.availabilities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'mentor_id' })
  mentor: Mentor;

  @OneToMany(() => MentorTimeslot, timeslot => timeslot.availability, { cascade: true })
  timeslots: MentorTimeslot[];
}