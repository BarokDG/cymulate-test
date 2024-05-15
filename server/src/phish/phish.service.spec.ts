import { Test, TestingModule } from '@nestjs/testing';
import { PhishService } from './phish.service';

describe('PhishService', () => {
  let service: PhishService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhishService],
    }).compile();

    service = module.get<PhishService>(PhishService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
