import { Exclude, Expose, Transform } from 'class-transformer';
import { University } from '../../universities/entities/university.entity';
import { Major } from '../../majors/entities/major.entity';

export class MentorResponseDto {
  id: number;
  fullName: string;
  description: string;
  profileUrl: string;
  
  @Expose({ name: 'university' })
  @Transform(({ obj }) => obj.university?.name || null)
  universityName: string;

  @Expose({ name: 'major' })
  @Transform(({ obj }) => obj.major?.name || null)
  majorName: string;
  
  email: string;
  
  @Exclude()
  password: string;
  
  phoneNumber: string;
  telegramLink: string;

  // For frontend compatibility
  @Expose()
  get name(): string {
    return this.fullName;
  }

  @Expose()
  get imageUrl(): string {
    return this.profileUrl;
  }

  constructor(partial: Partial<MentorResponseDto>) {
    Object.assign(this, partial);
  }
}