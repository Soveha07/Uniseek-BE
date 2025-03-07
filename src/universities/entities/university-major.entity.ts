import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { University } from './university.entity';
import { Major } from 'src/majors/entities/major.entity';

@Entity('university_major')
export class UniversityMajor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'universityId' })  
  universityId: number;

  @Column({ name: 'majorId' })  
  majorId: number;

  @ManyToOne(() => University, (university) => university.universityMajors)
  @JoinColumn({ name: 'universityId' })  
  university: University;

  @ManyToOne(() => Major, (major) => major.universityMajors, { eager: true })
  @JoinColumn({ name: 'majorId' }) 
  major: Major;

  @Column({ type: 'text' })
  description: string;
}
