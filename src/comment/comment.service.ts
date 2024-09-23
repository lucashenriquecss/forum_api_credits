import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadEntity } from 'src/threads/entities/thread.entity';
import { EntityManager, Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentEntity } from './entities/comment.entity';
import { Roles } from 'src/users/entities/user-roles.enum';
import { CreditUsageService } from 'src/credit-usage/credit-usage.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly creditUsageService: CreditUsageService,
    @InjectRepository(ThreadEntity)
    private readonly threadRepository: Repository<ThreadEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) { }
  async create(createCommentDto: CreateCommentDto) {
    return await this.commentRepository.manager.transaction(async (transactionalEntityManager: EntityManager) => {
      // Verifique se o usuário existe
      const user = await transactionalEntityManager.findOne(UserEntity, { where: { id: createCommentDto.author_id } });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }
      
      if (user.roles.includes(Roles.USER) && (typeof(user.credits) === 'string' && parseFloat(user.credits) === 0.00)) {
        throw new Error(`Seu saldo é de ${user.credits}, por favor renove seu plano`);
      }
      // Verifique se a thread existe
      const thread = await transactionalEntityManager.findOne(ThreadEntity, { where: { id: createCommentDto.thread_id } });
      if (!thread) {
        throw new Error("Thread não encontrada");
      }

      let parentComment: CommentEntity | null = null;
      if (createCommentDto.parent_id) {

        parentComment = await transactionalEntityManager.findOne(CommentEntity, { where: { id: createCommentDto.parent_id } });
        if (!parentComment) {
          throw new Error("Comentário pai não encontrado");
        }
      }
      // Crie o objeto do comentário
      const createdComment = this.commentRepository.create({
        content: createCommentDto.content,
        author: user,
        thread,
        parent: parentComment,
      });

      // Salve o comentário
      const savedComment = await transactionalEntityManager.save(CommentEntity, createdComment);
      
      thread.updated_at = new Date();
      await transactionalEntityManager.save(ThreadEntity, thread);
      if (user.roles.includes(Roles.USER)) {
        await this.creditUsageService.usageCredits({
          user,
          action_type: createCommentDto.action_types || [], 
          author_id: createCommentDto.author_id,
        }, transactionalEntityManager);
      }

      return "Comment created";
    });
  }

  async findAll(params) {
    const query = this.commentRepository.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'author') // Join com a entidade UserEntity (autor)
      .leftJoinAndSelect('comment.thread', 'thread') // Join com a entidade ThreadEntity (thread, se precisar dela)
      .leftJoinAndSelect('comment.parent', 'parent') // Join com o comentário pai, se houver
      .select([
        'comment.id', // Seleciona o ID do comentário
        'comment.content', // Seleciona o conteúdo do comentário
        'comment.created_at', // Seleciona a data de criação
        'comment.updated_at', // Seleciona a data de atualização
        'comment.parent', // Seleciona o comentário pai (se houver)
        'author.id', // Seleciona o ID do autor
        'author.username', // Seleciona o username do autor
        'thread.id', 
      ]);
  
    // Aplica os filtros recebidos nos parâmetros
    if (params.thread_id) {
      query.andWhere('comment.threadId = :threadId', { threadId: params.thread_id });
    }
  
    if (params.author_id) {
      query.andWhere('comment.authorId = :authorId', { authorId: params.author_id });
    }
  
    return await query.getMany();
  }

 

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    return await this.commentRepository.delete(id)
  }
}
