import { Module } from '@nestjs/common';
import { CreditUsageService } from './credit-usage.service';
import { CreditUsageController } from './credit-usage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditUsageEntity } from './entities/credit-usage.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreditSettingService } from 'src/credit-setting/credit-setting.service';
import { UsersService } from 'src/users/users.service';
import { CreditSettingEntity } from 'src/credit-setting/entities/credit-setting.entity';
import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([CreditUsageEntity,UserEntity,CreditSettingEntity,SubscriptionPlanEntity]),LogRequestsModule,PaymentModule],
  controllers: [CreditUsageController],
  providers: [CreditUsageService,CreditSettingService,UsersService],
  exports: [CreditUsageService],
})
export class CreditUsageModule {}
