import { UniversityCareerField } from "src/universities/entities/university-careerfield.entity";
import { UniversityMajor } from "src/universities/entities/university-major.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";


@Entity({ name: 'career_fields' })
export class CareerField {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'major_preference', type: 'varchar', nullable: false })
    name: string;

    @OneToMany(() => UniversityCareerField, (universityCareerfield) => universityCareerfield.careerField)
    universityCareerfields: UniversityCareerField[];
}

