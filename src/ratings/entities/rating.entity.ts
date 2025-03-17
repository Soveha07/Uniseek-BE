import { Mentor } from 'src/mentors/entities/mentor.entity';
import { Student } from 'src/students/entities/student.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ratings')
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Mentor, (mentor) => mentor.ratings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'mentor_id' })
    mentor: Mentor;

    @ManyToOne(() => Student, (student) => student.ratings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @Column({ name: 'rating', type: 'int' })
    rating: number;

    @Column({ name: 'review', type: 'text', nullable: true })
    review: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt: Date;
}