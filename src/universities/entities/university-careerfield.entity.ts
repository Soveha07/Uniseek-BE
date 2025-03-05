import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { University } from './university.entity';
import { Major } from 'src/majors/entities/major.entity';
import { CareerField } from 'src/career-fields/entities/career-field.entity';


@Entity('university_careerfield')
export class UniversityCareerField {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => University, (university) => university.universityCareerfields)
    university: University;

    @ManyToOne(() => CareerField, (careerField) => careerField.universityCareerfields)
    careerField: CareerField;
}
