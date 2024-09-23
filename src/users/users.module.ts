import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { LogRequestEntity } from 'src/log_requests/entities/log_request.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { CreditUsageEntity } from 'src/credit-usage/entities/credit-usage.entity';
import { PaymentService } from 'src/payment/payment.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SubscriptionPlanEntity,PaymentEntity,ThreadEntity,CommentEntity,CreditUsageEntity]),LogRequestsModule,HttpModule],
  controllers: [UsersController],
  providers: [UsersService,PaymentService],
  exports: [UsersService],
})
export class UsersModule { }
