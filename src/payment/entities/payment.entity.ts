

import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';
import { UserEntity } from 'src/users/entities/user.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusPayment, TypePayment } from './status-payment-enum';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'enum', enum: StatusPayment,default:StatusPayment.PENDING})
  status: StatusPayment[];

  @Column({ type: 'enum', enum: TypePayment })
  type: TypePayment[];

  @Column({nullable:true,unique:true})
  url_payment: string;

  @Column({ unique:true})
  payment_id: string;

  @Column({ nullable: true })
  payment_date: Date;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, { nullable: true })
  user: UserEntity;
}