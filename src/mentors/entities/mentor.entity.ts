import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { University } from '../../universities/entities/university.entity';
import { Major } from '../../majors/entities/major.entity';

@Entity('mentors')
export class Mentor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ name: 'profile_url', type: 'varchar', nullable: true })
  profileUrl: string;

  @Column({ name: 'university_id', nullable: true })
  universityId: number;

  @Column({ name: 'major_id', nullable: true })
  majorId: number;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true, select: false }) 
  password: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ name: 'telegram_link', type: 'varchar', nullable: true })
  telegramLink: string;

  @ManyToOne(() => University)
  @JoinColumn({ name: 'university_id' })
  university: University;

  @ManyToOne(() => Major)
  @JoinColumn({ name: 'major_id' })
  major: Major;
}
