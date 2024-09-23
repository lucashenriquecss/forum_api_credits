import { Test, TestingModule } from '@nestjs/testing';
import { CreditUsageService } from './credit-usage.service';

describe('CreditUsageService', () => {
  let service: CreditUsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditUsageService],
    }).compile();

    service = module.get<CreditUsageService>(CreditUsageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
