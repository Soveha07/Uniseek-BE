import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';


@Entity('survey_response')
export class SurveyResponse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'study_track', type: 'varchar', length: 255 })
    studyTrack: string;

    @Column({ name: 'strongest_subjects', type: 'varchar', length: 255 })
    strongestSubjects: string;

    @Column({ name: 'extra_course', type: 'varchar', length: 255 })
    extraCourse: string;

    @Column({ name: 'future_career', type: 'varchar', length: 255 })
    futureCareer: string;

    @Column({ name: 'budget', type: 'varchar', length: 255 })
    budget: string;

    @Column({ name: 'scholarships', type: 'varchar', length: 255 })
    scholarships: string;

    @Column({ name: 'exchange_program', type: 'varchar', length: 255 })
    exchangeProgram: string;

    @Column({ name: 'facilities', type: 'varchar', length: 255 })
    facilities: string;

    @Column({ name: 'shift', type: 'varchar', length: 255 })
    shift: string;

    @Column({ name: 'class_size', type: 'varchar', length: 255 })
    classSize: string;

    @ManyToOne(() => Student, (student) => student.surveyResponses)
    @JoinColumn({ name: 'student_id' })
    student: Student;
}
