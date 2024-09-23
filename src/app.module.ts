import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data_source';
import { SubscriptionPlanModule } from './subscription-plan/subscription-plan.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ThreadsModule } from './threads/threads.module';
import { CommentModule } from './comment/comment.module';
import { LogRequestsModule } from './log_requests/log_requests.module';
import { CreditUsageModule } from './credit-usage/credit-usage.module';
import { PaymentModule } from './payment/payment.module';
import { CreditSettingModule } from './credit-setting/credit-setting.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BannersModule } from './banners/banners.module';
import { TicketsModule } from './tickets/tickets.module';
import { TicketCommentsModule } from './ticket-comments/ticket-comments.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    SubscriptionPlanModule,
    CategoryModule,
    SubcategoryModule,
    ThreadsModule,
    CommentModule,
    LogRequestsModule,
    CreditUsageModule,
    PaymentModule,
    CreditSettingModule,
    BannersModule,
    TicketsModule,
    TicketCommentsModule,
    LikesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
