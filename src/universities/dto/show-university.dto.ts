import { UniversityType } from "../enums/university.enums";

export class ShowUniversityDto {
  id: number;
  name: string;
  location: string;
  description: string;
  total_enrollment: number;
  min_price: number;
  max_price: number;
  university_type: string;
  class_size: string;
  scholarship: boolean;
  exchange: boolean;
  facility: string;
  shift: string;
  photo_url: string;
}