import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {


    const createdCategory: CreateCategoryDto = {
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    };

    let category = await this.categoryRepository.create(createdCategory);


    return await this.categoryRepository.save(category);
  }

  async findAll(params) {
    const where = {};
    if (params.id) where['id'] = params.id;
    if (params.name) where['name'] = params.name;

    const queryBuilder = this.categoryRepository.createQueryBuilder('category')
      .leftJoinAndSelect('category.subcategories', 'subcategory')          // Join com subcategorias
      .leftJoinAndSelect('subcategory.threads', 'thread')                  // Join com threads nas subcategorias
      .leftJoinAndSelect('thread.comments', 'comment')                     // Join com comentários dos threads
      .leftJoin('thread.author', 'threadAuthor')                           // Join com autor dos threads
      .addSelect(['threadAuthor.id', 'threadAuthor.username'])             // Seleciona id e nome do autor dos threads
      .leftJoin('comment.author', 'commentAuthor')                         // Join com autor dos comentários
      .addSelect(['commentAuthor.id', 'commentAuthor.username'])           // Seleciona id e nome do autor dos comentários
      .leftJoinAndSelect('category.threads', 'categoryThread')              // Join com threads diretamente na categoria
      .leftJoinAndSelect('categoryThread.comments', 'categoryComment')     // Join com comentários dos threads diretamente na categoria
      .leftJoin('categoryThread.author', 'categoryThreadAuthor')           // Join com autor dos threads diretamente na categoria
      .addSelect(['categoryThreadAuthor.id', 'categoryThreadAuthor.username']) // Seleciona id e nome do autor dos threads diretamente na categoria
      .leftJoin('categoryComment.author', 'categoryCommentAuthor')         // Join com autor dos comentários diretamente na categoria
      .addSelect(['categoryCommentAuthor.id', 'categoryCommentAuthor.username']); // Seleciona id e nome do autor dos comentários diretamente na categoria

    // Aplicando filtros com base nos parâmetros fornecidos
    if (params.id) {
      queryBuilder.andWhere('category.id = :id', { id: params.id });
    }
    if (params.name) {
      queryBuilder.andWhere('category.name LIKE :name', { name: `%${params.name}%` });
    }

    return await queryBuilder.getMany();
  }

  async findOne(id: number, params) {
    const where = {};
    if (id) where['id'] = id
    if (params.name) where['name'] = params.name

    return await this.categoryRepository.findOne({ where, relations: ['subcategories', 'subcategories.threads', 'subcategories.threads.comments', 'threads', 'threads.comments', 'threads.comments.author'] });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto)
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id)
  }
}
