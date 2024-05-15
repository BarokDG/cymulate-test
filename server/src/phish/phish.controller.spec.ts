import { Test, TestingModule } from '@nestjs/testing';
import { PhishController } from './phish.controller';
import { PhishService } from './phish.service';

describe('PhishController', () => {
  let controller: PhishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhishController],
      providers: [PhishService],
    }).compile();

    controller = module.get<PhishController>(PhishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
