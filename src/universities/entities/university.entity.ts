import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UniversityType, ClassSize, Gradation, Shift } from '../enums/university.enums';
import { UniversityMajor } from './university-major.entity';
import { UniversityCareerField } from './university-careerfield.entity';
import { Mentor } from 'src/mentors/entities/mentor.entity';


@Entity('universities')
export class University {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    location?: string;

    @Column({ type: 'varchar', nullable: true })
    description?: string;

    @Column({ name: 'total_enrollment', type: 'int', nullable: true })
    totalEnrollment?: number;

    @Column({ name: 'min_price', type: 'numeric', nullable: true })
    minPrice?: number;

    @Column({ name: 'max_price', type: 'numeric', nullable: true })
    maxPrice?: number;

    @Column({ name: 'university_type', type: 'enum', enum: UniversityType, nullable: true })
    universityType?: UniversityType;

    @Column({ name: 'class_size', type: 'enum', enum: ClassSize, nullable: true })
    classSize?: ClassSize;

    @Column({ type: 'enum', enum: Gradation, nullable: true })
    scholarship?: Gradation;

    @Column({ type: 'enum', enum: Gradation, nullable: true })
    exchange?: Gradation;

    @Column({ type: 'enum', enum: Gradation, nullable: true })
    facility?: Gradation;

    @Column({ type: 'enum', enum: Shift, nullable: true })
    shift?: Shift;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: new Date() })
    createdAt: Date;

    @Column({ name: "photo_url", nullable: true })
    photoUrl?: string;

    @OneToMany(() => UniversityMajor, (universityMajor) => universityMajor.university)
    universityMajors: UniversityMajor[];

    @OneToMany(() => UniversityCareerField, (universityCareerfield) => universityCareerfield.university)
    universityCareerfields: UniversityCareerField[];

    @OneToMany(() => Mentor, (mentor) => mentor.university)
    mentors: Mentor[];
}
