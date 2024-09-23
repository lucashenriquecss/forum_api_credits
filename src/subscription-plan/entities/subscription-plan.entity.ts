


import { UserEntity } from 'src/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { PlanFeatures } from './plan-enum';

@Entity('subscription_plans')
export class SubscriptionPlanEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'json', nullable: true })
    description: string[];

    @Column('decimal', { precision: 10, scale: 2 })
    monthly_cost: number;

    @Column('decimal', { precision: 10, scale: 2 })
    credits: number;

    @Column('int')
    duration: number;
    
    @Column('simple-array')
    features: PlanFeatures[];

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;


    @OneToMany(() => UserEntity, user => user.subscription_plan)
    users: UserEntity[];
}
