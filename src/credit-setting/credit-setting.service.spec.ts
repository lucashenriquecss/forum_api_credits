import { Test, TestingModule } from '@nestjs/testing';
import { CreditSettingService } from './credit-setting.service';

describe('CreditSettingService', () => {
  let service: CreditSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditSettingService],
    }).compile();

    service = module.get<CreditSettingService>(CreditSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
