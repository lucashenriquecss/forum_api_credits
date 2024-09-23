import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubcategoryEntity } from './entities/subcategory.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(SubcategoryEntity)
    private readonly subcategoryRepository: Repository<SubcategoryEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) { }
  async create(createSubcategoryDto: CreateSubcategoryDto) {
    const existCategory = await this.categoryRepository.findOne({where:{id: createSubcategoryDto.category_id}})
   
    const createdCategory: CreateSubcategoryDto = {
      name: createSubcategoryDto.name,
      description: createSubcategoryDto.description,
      categoryId: createSubcategoryDto.categoryId || createSubcategoryDto.category_id,
    };

    let category = await this.subcategoryRepository.create({...createdCategory,category:existCategory});
    return await this.subcategoryRepository.save(category);
  }

  async findAll(params) {
    const queryBuilder = this.subcategoryRepository.createQueryBuilder('subcategory')
    .leftJoinAndSelect('subcategory.threads', 'threads') // Join com threads
    .leftJoin('threads.author', 'threadAuthor')           // Join com autor dos threads
    .addSelect(['threadAuthor.username'])
    .addSelect(['threadAuthor.id'])                 // Seleciona apenas o nome do autor dos threads
    .leftJoinAndSelect('threads.comments', 'comments')    // Join com comments
    .leftJoin('comments.author', 'commentAuthor')         // Join com autor dos comentários
    .addSelect(['commentAuthor.username'])
    .addSelect(['commentAuthor.id'])                 // Seleciona apenas o nome do autor dos comentários
    .leftJoin('subcategory.category', 'category')         // Join com a categoria
    .addSelect(['category.id', 'category.name']);         // Seleciona o ID e o nome da categoria
  
  // Aplicando filtros com base nos parâmetros fornecidos
  if (params.id) {
    queryBuilder.andWhere('subcategory.id = :id', { id: params.id });
  }
  if (params.name) {
    queryBuilder.andWhere('subcategory.name LIKE :name', { name: `%${params.name}%` });
  }
  if (params.thread_title) {
    queryBuilder.andWhere('threads.title LIKE :title', { title: `%${params.thread_title}%` });
  }
  if (params.author_id) {
    queryBuilder.andWhere('threadAuthor.id = :authorId', { authorId: params.author_id });
  }
  if (params.category_id) {
    queryBuilder.andWhere('category.id = :categoryId', { categoryId: params.category_id });
  }
  
  return await queryBuilder.getMany();
  }

  async findOne(id: number,params) {
    const where= {};
    if (id) where['id'] = id
    if (params.name) where['name'] = params.name
    return await this.subcategoryRepository.findOne({where,relations:['threads','threads.comments', 'threads.comments.author']})
  }

  async update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return await this.subcategoryRepository.update(id,updateSubcategoryDto);
  }

  async remove(id: number) {
    return await this.subcategoryRepository.delete(id);
  }
}
