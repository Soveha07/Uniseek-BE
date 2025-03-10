import { University } from '../../universities/entities/university.entity';
import { Major } from '../../majors/entities/major.entity';

export class ShowMentorDto {
  id: number;
  fullName: string;
  description?: string;
  profileUrl?: string;
  email?: string;
  phoneNumber?: string;
  telegramLink?: string;
  university?: University;
  major?: Major;

  constructor(mentor: { 
    id: number; 
    fullName: string; 
    description?: string; 
    profileUrl?: string; 
    email?: string; 
    phoneNumber?: string; 
    telegramLink?: string; 
    university?: University; 
    major?: Major;
  }) {
    this.id = mentor.id;
    this.fullName = mentor.fullName;
    this.description = mentor.description;
    this.profileUrl = mentor.profileUrl;
    this.email = mentor.email;
    this.phoneNumber = mentor.phoneNumber;
    this.telegramLink = mentor.telegramLink;
    this.university = mentor.university;
    this.major = mentor.major;
  }
}
