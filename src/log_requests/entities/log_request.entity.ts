import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('log_requets')
export class LogRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column()
  status_code: number;

  @Column({ type: 'text', nullable: true })
  request_body: string;

  @Column({ type: 'text', nullable: true })
  response_body: string;

  @Column()
  duration: number;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

}