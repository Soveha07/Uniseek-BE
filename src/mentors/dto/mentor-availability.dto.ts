// src/dtos/mentor-availability.dto.ts
export class MentorAvailabilityResponseDto {
    mentorId: number;
    availableDays: string[];
    availableTimes: { [day: string]: string[] };
  }