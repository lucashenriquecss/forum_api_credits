import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity,SubcategoryEntity,ThreadEntity,UserEntity]),LogRequestsModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
