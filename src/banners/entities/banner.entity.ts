import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('banners')
export class BannerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  url: string; 

  @Column({ type: 'text' })
  redirectUrl: string; 

  @Column({ type: 'text', nullable: true })
  description: string; 

  @Column({ type: 'boolean', default: true })
  active: boolean; 
  
  @Column({ type: 'varchar', length: 50 })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
