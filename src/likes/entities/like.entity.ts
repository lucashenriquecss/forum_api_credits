import { CommentEntity } from 'src/comment/entities/comment.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity('likes')
export class LikeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.likes, { eager: true })
    user: UserEntity;

    @ManyToOne(() => ThreadEntity, (thread) => thread.likes, { nullable: true })
    thread: ThreadEntity;

    @ManyToOne(() => CommentEntity, (comment) => comment.likes, { nullable: true })
    comment: CommentEntity;
   
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
