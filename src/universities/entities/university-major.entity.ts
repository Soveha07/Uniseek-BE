import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { University } from './university.entity';
import { Major } from 'src/majors/entities/major.entity';


@Entity('university_major')
export class UniversityMajor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => University, (university) => university.universityMajors)
  university: University;

  @ManyToOne(() => Major, (major) => major.universityMajors)
  major: Major;

  @Column({ type: 'text' })
  description: string;
}
