import { UniversityType } from "../enums/university.enums";

export class ShowUniversityDto {
    id: number;
    name: string;
    location: string;
    description: string;
    minPrice: number;
    maxPrice: number;
    type: UniversityType;
}   