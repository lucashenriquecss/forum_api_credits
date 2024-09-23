import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { SubcategoryEntity } from 'src/subcategory/entities/subcategory.entity';
import { Repository, EntityManager } from 'typeorm';
import { ThreadEntity } from './entities/thread.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Roles } from 'src/users/entities/user-roles.enum';
import { CreditUsageService } from 'src/credit-usage/credit-usage.service';

@Injectable()
export class ThreadsService {
  constructor(
    private readonly creditUsageService: CreditUsageService,
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ThreadEntity)
    private readonly threadRepository: Repository<ThreadEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  

  ) { }

  async create(createThreadDto: CreateThreadDto) {
    return await this.threadRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
      // Verifique se o usuário existe
      const user = await transactionalEntityManager.findOne(UserEntity, { where: { id: createThreadDto.author_id } });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
     
    
      
      if (user.roles.includes(Roles.USER) && (typeof(user.credits) === 'string' && parseFloat(user.credits) === 0.00)) {
        throw new Error(`Seu saldo é de ${user.credits}, por favor renove seu plano`);
      }

      if (createThreadDto.subcategory_id && createThreadDto.category_id) {
        throw new Error("Não pode criar com duas categorias, crie em uma subcategoria ou em uma categoria");
      }
      if (!createThreadDto.subcategory_id && !createThreadDto.category_id) {
        throw new Error("Crie uma thread com uma categoria ou subcategoria");
      }

      // Encontre subcategoria e categoria
      let subcategory;
      let category;

      if (createThreadDto.subcategory_id) {
        subcategory = await transactionalEntityManager.findOne(SubcategoryEntity, { where: { id: createThreadDto.subcategory_id } });
      }

      if (createThreadDto.category_id) {
        category = await transactionalEntityManager.findOne(CategoryEntity, { where: { id: createThreadDto.category_id } });
      }

      // Crie o objeto da thread
      const createdThread = this.threadRepository.create({
        title: createThreadDto.title,
        content: createThreadDto.content,
        author: user,
        category,
        subcategory,
      });

      // Salve a nova thread
      const savedThread = await transactionalEntityManager.save(ThreadEntity, createdThread);

      if (user.roles.includes(Roles.USER)) {
        await this.creditUsageService.usageCredits({
          user,
          action_type: createThreadDto.action_types || [],
          author_id: createThreadDto.author_id,
        }, transactionalEntityManager);
      }

      return "Thread created";
    });
  }

  async findAll(params) {
    const queryBuilder = this.threadRepository.createQueryBuilder('thread')
    .leftJoinAndSelect('thread.category', 'category')
    .leftJoinAndSelect('thread.subcategory', 'subcategory')
    .leftJoin('thread.author', 'author')  // Join com autor, mas sem selecionar tudo
    .addSelect(['author.username', 'author.id', 'author.roles'])
    .leftJoinAndSelect('thread.comments', 'comments')
    .leftJoin('comments.author', 'commentAuthor')  
    .addSelect(['commentAuthor.username', 'commentAuthor.id', 'commentAuthor.roles'])
    .leftJoin('comments.parent', 'parentComment')
    .addSelect(['parentComment.id'])
    .addSelect(['parentComment.content'])
    .leftJoin('parentComment.author', 'parentCommentAuthor') // Faz o join com o comentário pai
    .addSelect(['parentCommentAuthor.username', 'parentCommentAuthor.id', 'parentCommentAuthor.roles'])

    ;
    
    if (params.title) {
      queryBuilder.andWhere('thread.title LIKE :title', { title: `%${params.title}%` });
    }
    if (params.category_id) {
      queryBuilder.andWhere('thread.categoryId = :categoryId', { categoryId: params.category_id });
    }
    if (params.subcategory_id) {
      queryBuilder.andWhere('thread.subcategoryId = :subcategoryId', { subcategoryId: params.subcategory_id });
    }
    if (params.author_id) {
      queryBuilder.andWhere('thread.authorId = :authorId', { authorId: params.author_id });
    }
    if (params.id) {
      queryBuilder.andWhere('thread.id = :id', { id: params.id });
    }
  
    return await queryBuilder.getMany();
  }
  


  async update(id: number, updateThreadDto: UpdateThreadDto) {
    return await this.threadRepository.update(id, updateThreadDto);
  }

  async remove(id: number) {
    return await this.threadRepository.delete(id);
  }
}
