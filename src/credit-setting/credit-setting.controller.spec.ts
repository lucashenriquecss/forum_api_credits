import { Test, TestingModule } from '@nestjs/testing';
import { CreditSettingController } from './credit-setting.controller';
import { CreditSettingService } from './credit-setting.service';

describe('CreditSettingController', () => {
  let controller: CreditSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditSettingController],
      providers: [CreditSettingService],
    }).compile();

    controller = module.get<CreditSettingController>(CreditSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
