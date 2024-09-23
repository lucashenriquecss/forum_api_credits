

import { SubscriptionPlanEntity } from 'src/subscription-plan/entities/subscription-plan.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RolesSettings } from './setting-role-enum';

@Entity('credit_settings')
export class CreditSettingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RolesSettings ,unique: true })
  action_type: RolesSettings[];

  @Column('decimal', { precision: 10, scale: 2 })
  credits_required: number;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

}