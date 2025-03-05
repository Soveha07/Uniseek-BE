import { Test, TestingModule } from '@nestjs/testing';
import { CareerFieldsController } from './career-fields.controller';
import { CareerFieldsService } from './career-fields.service';

describe('CareerFieldsController', () => {
  let controller: CareerFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerFieldsController],
      providers: [CareerFieldsService],
    }).compile();

    controller = module.get<CareerFieldsController>(CareerFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
