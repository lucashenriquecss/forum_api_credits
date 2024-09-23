import { LikeEntity } from 'src/likes/entities/like.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany, RelationCount } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  author: UserEntity;

  @ManyToOne(() => ThreadEntity, (thread) => thread.comments)
  thread: ThreadEntity;
  
  @ManyToOne(() => CommentEntity, (comment) => comment.replies)
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  replies: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.comment)
  likes: LikeEntity[];

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}
