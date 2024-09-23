import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreditUsageService } from 'src/credit-usage/credit-usage.service';
import { CreditSettingService } from 'src/credit-setting/credit-setting.service';
import { UsersService } from 'src/users/users.service';
import { CreditUsageEntity } from 'src/credit-usage/entities/credit-usage.entity';
import { CreditSettingEntity } from 'src/credit-setting/entities/credit-setting.entity';
import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity,ThreadEntity,UserEntity,CreditUsageEntity,CreditSettingEntity,SubscriptionPlanEntity]),LogRequestsModule,PaymentModule],
  controllers: [CommentController],
  providers: [CommentService,CreditUsageService,CreditSettingService,UsersService],
  exports: [CommentService],
 
})
export class CommentModule {}
