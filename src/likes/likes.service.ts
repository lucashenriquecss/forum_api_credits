import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { LikeEntity } from './entities/like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(ThreadEntity)
    private readonly threadRepository: Repository<ThreadEntity>,
    @InjectRepository(LikeEntity)
    private readonly likeRepository: Repository<LikeEntity>


  ) { }

  async trendings()
  {
    const posts = await this.threadRepository
      .createQueryBuilder('threads')
      .leftJoin('threads.likes', 'like')  
      .groupBy('threads.id')              
      .addGroupBy('threads.title')        
      .select('threads.id', 'threadId')     
      .addSelect('threads.title', 'title') 
      .addSelect('COUNT(like.id)', 'likesCount') 
      .orderBy('likesCount', 'DESC')   
      .getRawMany();                 

    return posts;
  }

  async likePost(userId: number, threadId: number): Promise<LikeEntity> {
    const thread = await this.threadRepository.findOne({ where: { id: threadId } });
    if (!thread) {
      throw new Error('Post not found');
    }

    const like = await this.likeRepository.create({ user: { id: userId }, thread });
    return await this.likeRepository.save(like);
  }



  async likeComment(userId: number, commentId: number): Promise<LikeEntity> {
    const comment = await this.commentRepository.findOne({ where: { id: commentId } });
    if (!comment) {
      throw new Error('Comment not found');
    }

    const like = await this.likeRepository.create({ user: { id: userId }, comment });
    return await this.likeRepository.save(like);
  }

  async unlikePost(userId: number, threadId: number): Promise<void> {
    const like = await this.likeRepository.findOne({ where: { user: { id: userId }, thread: { id: threadId } } });
    if (!like) {
      throw new Error('Like not found');
    }
    await this.likeRepository.remove(like);
    return;
  }

  async unlikeComment(userId: number, commentId: number): Promise<void> {
    const like = await this.likeRepository.findOne({ where: { user: { id: userId }, comment: { id: commentId } } });
    if (!like) {
      throw new Error('Like not found');
    }
    await this.likeRepository.remove(like);
    return;
  }
}
