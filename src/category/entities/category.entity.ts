


import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from 'src/users/entities/user.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;
    
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
    subcategories: SubcategoryEntity[];

    @OneToMany(() => ThreadEntity, (thread) => thread.category)
    threads: ThreadEntity[];

}