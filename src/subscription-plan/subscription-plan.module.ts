import { Module } from '@nestjs/common';
import { SubscriptionPlanService } from './subscription-plan.service';
import { SubscriptionPlanController } from './subscription-plan.controller';
import { SubscriptionPlanEntity } from './entities/subscription-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlanEntity,UserEntity]),LogRequestsModule],
  controllers: [SubscriptionPlanController],
  providers: [SubscriptionPlanService],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
