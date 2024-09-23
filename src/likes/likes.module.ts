import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity,CommentEntity,ThreadEntity,UserEntity]),LogRequestsModule],
  controllers: [LikesController],
  providers: [LikesService],
  exports: [LikesService],  
})
export class LikesModule {}
