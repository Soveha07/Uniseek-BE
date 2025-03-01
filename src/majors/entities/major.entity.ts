import { University } from "src/universities/entities/university.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'majors' })
export class Major {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'description', type: 'varchar', nullable: true })
    description: string;

    @Column({ name: 'photo_url', type: 'varchar', nullable: true })
    photoUrl: string;

    @Column({ name: 'created_at', default: new Date() })
    createdAt: Date;

    @OneToOne(() => University)
    @JoinColumn({ name: 'university_id' })
    university: University;
}
