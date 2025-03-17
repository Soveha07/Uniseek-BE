import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import { Mentor } from 'src/mentors/entities/mentor.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Mentor)
    private readonly mentorRepository: Repository<Mentor>,
  ) { }

  async addRating(dto: CreateRatingDto): Promise<Rating> {
    const { mentorId, studentId, rating, review } = dto;

    try {
      // Fetch the actual Student and Mentor entities
      const student = await this.studentRepository.findOne({ where: { uid: studentId } });
      const mentor = await this.mentorRepository.findOne({ where: { id: mentorId } });

      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found`);
      }
      if (!mentor) {
        throw new NotFoundException(`Mentor with ID ${mentorId} not found`);
      }

      const newRating = this.ratingRepository.create({
        student, // Assign the full entity
        mentor,
        rating,
        review,
        createdAt: new Date(), // Current timestamp
      });

      return this.ratingRepository.save(newRating);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRatingsByMentor(mentorId: number) {
    const ratings = await this.ratingRepository.find({
      where: { mentor: { id: mentorId } },
      relations: ['student'],
      order: { createdAt: 'DESC' },
    });


    const totalRatings = ratings.length;
    const avgRating = totalRatings
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

    return {
      mentorId,
      avgRating: parseFloat(avgRating.toFixed(2)),
      totalRatings,
      ratings,
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} rating`;
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  remove(id: number) {
    return `This action removes a #${id} rating`;
  }
}
