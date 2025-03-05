import { Test, TestingModule } from '@nestjs/testing';
import { CareerFieldsService } from './career-fields.service';

describe('CareerFieldsService', () => {
  let service: CareerFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareerFieldsService],
    }).compile();

    service = module.get<CareerFieldsService>(CareerFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
