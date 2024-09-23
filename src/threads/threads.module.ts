import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThreadEntity } from './entities/thread.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreditSettingEntity } from 'src/credit-setting/entities/credit-setting.entity';
import { CreditUsageEntity } from 'src/credit-usage/entities/credit-usage.entity';
import { CreditSettingService } from 'src/credit-setting/credit-setting.service';
import { UsersService } from 'src/users/users.service';
import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { CreditUsageService } from 'src/credit-usage/credit-usage.service';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  imports: [TypeOrmModule.forFeature([ThreadEntity,CategoryEntity,SubcategoryEntity,CommentEntity,UserEntity,CreditUsageEntity,CreditSettingEntity,SubscriptionPlanEntity]),LogRequestsModule,PaymentModule],

  controllers: [ThreadsController],
  providers: [ThreadsService,CreditUsageService,CreditSettingService,UsersService],
  exports: [ThreadsService],
 
})
export class ThreadsModule {}
