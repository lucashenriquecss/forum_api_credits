import { Test, TestingModule } from '@nestjs/testing';
import { CreditUsageController } from './credit-usage.controller';
import { CreditUsageService } from './credit-usage.service';

describe('CreditUsageController', () => {
  let controller: CreditUsageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditUsageController],
      providers: [CreditUsageService],
    }).compile();

    controller = module.get<CreditUsageController>(CreditUsageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
