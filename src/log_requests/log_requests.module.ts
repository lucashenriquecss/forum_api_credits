import { Module } from '@nestjs/common';
import { LogRequestsService } from './log_requests.service';
import { LogRequestsController } from './log_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequestEntity } from './entities/log_request.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogRequestEntity,UserEntity])],
  providers: [LogRequestsService],
  exports: [LogRequestsService],
})
export class LogRequestsModule {}
