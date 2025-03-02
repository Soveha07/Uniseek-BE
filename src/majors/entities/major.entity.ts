import { UniversityMajor } from "src/universities/entities/university-major.entity";
import { University } from "src/universities/entities/university.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'majors' })
export class Major {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    name: string;

    @Column({ name: 'photo_url', type: 'varchar', nullable: true })
    photoUrl: string;

    @Column({ name: 'created_at', default: new Date() })
    createdAt: Date;

    @OneToMany(() => UniversityMajor, (universityMajor) => universityMajor.major)
    universityMajors: UniversityMajor[];
}
