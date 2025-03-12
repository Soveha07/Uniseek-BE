export class MentorAvailabilityResponseDto {
    mentorId: number;
    availableDays: string[];
    availableTimes: { [day: string]: string[] };
  }