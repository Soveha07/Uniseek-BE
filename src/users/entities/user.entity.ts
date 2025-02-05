import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn()
    uid: string; // Firebase UID

    @Column({ name: 'email' })
    email: string;

    @Column({ name: 'display_name' })
    displayName: string;

    @Column({ name: 'photo_url' })
    photoURL: string;

    @Column({ name: 'provider' })
    provider: string;

    //   @CreateDateColumn()
    @Column({ name: 'created_at' })
    createdAt: Date;

    //   @UpdateDateColumn()
    @Column({ name: 'updated_at' })
    updatedAt: Date;
}
