import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSurveyResponseDto {
    @IsString() @IsNotEmpty()
    studyTrack: string;

    @IsString() @IsNotEmpty()
    strongestSubjects: string;

    @IsString() @IsNotEmpty()
    extraCourse: string;

    @IsString() @IsNotEmpty()
    futureCareer: string;

    @IsString() @IsNotEmpty()
    budget: string;

    @IsString() @IsNotEmpty()
    scholarships: string;

    @IsString() @IsNotEmpty()
    exchangeProgram: string;

    @IsString() @IsNotEmpty()
    facilities: string;

    @IsString() @IsNotEmpty()
    shift: string;

    @IsString() @IsNotEmpty()
    classSize: string;

    @IsNotEmpty()
    studentId: string;
}
