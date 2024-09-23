import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { UserEntity } from 'src/users/entities/user.entity';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity,UserEntity]),LogRequestsModule,HttpModule],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
