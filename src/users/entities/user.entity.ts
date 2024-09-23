

import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { Roles } from './user-roles.enum';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { CreditUsageEntity } from 'src/credit-usage/entities/credit-usage.entity';
import { LikeEntity } from 'src/likes/entities/like.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: [true] })
  active: boolean;

  @Column({ default: [false] })
  has_access: boolean;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  credits: number;

  @Column({ type: 'enum', enum: Roles, default: [Roles.USER] })
  roles: Roles[];

  @Column({ type: 'timestamp', nullable: true })
  subscription_expiration: Date;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => SubscriptionPlanEntity, { nullable: true })
  subscription_plan: SubscriptionPlanEntity;

  @Column({ type: 'varchar', length: 255, nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @OneToMany(() => ThreadEntity, (thread) => thread.author)
  threads: ThreadEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.author)
  comments: CommentEntity[];

  @OneToMany(() => CreditUsageEntity, (usage) => usage.user)
  credit_usages: CreditUsageEntity[];

  @OneToMany(() => PaymentEntity, user => user.user)
  payments: PaymentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[];

}