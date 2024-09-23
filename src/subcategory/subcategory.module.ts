import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { LogRequestsModule } from 'src/log_requests/log_requests.module';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ThreadEntity } from 'src/threads/entities/thread.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubcategoryEntity,CategoryEntity,UserEntity,ThreadEntity]),LogRequestsModule],

  controllers: [SubcategoryController],
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
