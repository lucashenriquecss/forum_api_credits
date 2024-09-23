import { CategoryEntity } from 'src/category/entities/category.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('subcategories')
export class SubcategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
  category: CategoryEntity;

  @OneToMany(() => ThreadEntity, (thread) => thread.subcategory)
  threads: ThreadEntity[];
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}