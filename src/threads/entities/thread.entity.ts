import { CategoryEntity } from 'src/category/entities/category.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('threads')
export class ThreadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.threads)
  author: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.threads)
  category: CategoryEntity;

  @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.threads, { nullable: true })
  subcategory: SubcategoryEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.thread)
  comments: CommentEntity[];
  
  @OneToMany(() => LikeEntity, (like) => like.thread)
  likes: LikeEntity[];

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}