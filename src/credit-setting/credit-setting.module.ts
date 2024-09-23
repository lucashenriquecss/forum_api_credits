import { Module } from '@nestjs/common';
import { CreditSettingService } from './credit-setting.service';
import { CreditSettingController } from './credit-setting.controller';
import { CreditSettingEntity } from './entities/credit-setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';

@Module({
  imports: [TypeOrmModule.forFeature([CreditSettingEntity]),LogRequestsModule],
  controllers: [CreditSettingController],
  providers: [CreditSettingService],
  exports: [CreditSettingService],
})
export class CreditSettingModule {}
