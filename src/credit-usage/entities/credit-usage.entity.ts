import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('credits_usages')
export class CreditUsageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json'}) 
  action: string[];

  @Column('decimal', {precision: 10, scale: 2 })
  credit_before: number;

  @Column('decimal', {precision: 10, scale: 2 })
  credit_now: number;

  @Column('decimal', {precision: 10, scale: 2 })
  credit_used: number;

  @ManyToOne(() => UserEntity, (user) => user.credit_usages)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
