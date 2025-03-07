import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UniversityType, ClassSize, Gradation, Shift } from '../enums/university.enums';
import { UniversityMajor } from './university-major.entity';

@Entity('universities')
export class University {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column('text')
    description: string;

    @Column({ nullable: true })
    total_enrollment: number;

    @Column('decimal', { precision: 10, scale: 2 })
    min_price: number;

    @Column('decimal', { precision: 10, scale: 2 })
    max_price: number;

    @Column()
    university_type: string;

    @Column({ nullable: true })
    class_size: string;

    @Column({ default: false })
    scholarship: boolean;

    @Column({ default: false })
    exchange: boolean;

    @Column('text', { nullable: true })
    facility: string;

    @Column({ nullable: true })
    shift: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: new Date() })
    createdAt: Date;

    @Column({ nullable: true })
    photo_url: string;

    @OneToMany(() => UniversityMajor, (universityMajor) => universityMajor.university)
    universityMajors: UniversityMajor[];
}
