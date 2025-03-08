import { Mentor } from 'src/mentors/entities/mentor.entity';
import { Student } from 'src/students/entities/student.entity';
import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, JoinColumn, CreateDateColumn
} from 'typeorm';


export enum BookingStatus {
    PENDING = 'pending',
    ONGOING = 'ongoing',
    COMPLETED = 'completed',
}

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => Mentor, (mentor) => mentor.bookings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mentor_id' })
    mentor: Mentor;

    @Column({ name: 'day' })
    day: string;

    @Column({ name: 'time', type: 'time' })
    time: string;

    @CreateDateColumn({ name: 'booked_at', type: 'timestamp' })
    bookedAt: Date;

    @Column({
        name: 'status',
        type: 'enum',
        enum: BookingStatus,
        enumName: 'booking_status',
        default: BookingStatus.PENDING
    })
    status: BookingStatus;
}
