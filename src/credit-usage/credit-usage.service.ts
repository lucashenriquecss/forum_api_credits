import { Injectable } from '@nestjs/common';
import { CreateCreditUsageDto } from './dto/create-credit-usage.dto';
import { UpdateCreditUsageDto } from './dto/update-credit-usage.dto';
import { CreditSettingService } from 'src/credit-setting/credit-setting.service';
import { UsersService } from 'src/users/users.service';
import { CreditUsageEntity } from './entities/credit-usage.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class CreditUsageService {
  constructor(
    private readonly creditSettingService: CreditSettingService,
    private readonly userService: UsersService,
    @InjectRepository(CreditUsageEntity)
    private readonly creditUsageRepository: Repository<CreditUsageEntity>,
  ) { }

  async usageCredits(obj,transactionalEntityManager: EntityManager): Promise<CreditUsageEntity> {
    return await transactionalEntityManager.transaction(async (transactionalEntityManager: EntityManager) => {
      
      const createCreditUsageDto: CreateCreditUsageDto = {
        action: obj.action_type,
        credit_before: parseFloat(obj.user.credits),
        userId: obj.author_id,
      };

      const discountCredit = await this.creditSettingService.getCredits([...obj.action_type]);

      createCreditUsageDto.credit_used = discountCredit;

      if (discountCredit >parseFloat(obj.user.credits)) {
        throw new Error(`Você não tem saldo suficientes para estas ações. Saldo : ${parseFloat(obj.user.credits)} Custo:${discountCredit}`)
     }

      const newValueCredit = parseFloat(obj.user.credits) - discountCredit;

     
      createCreditUsageDto.credit_now = newValueCredit >= 0.00 ? newValueCredit : 0.00;

      // Atualize os créditos do usuário na transação
      await transactionalEntityManager.update(UserEntity, obj.author_id, { credits: newValueCredit });

      // Crie a entrada de uso de crédito na transação
      const creditUsage = this.creditUsageRepository.create({ ...createCreditUsageDto, user: obj.user });
      await transactionalEntityManager.save(CreditUsageEntity, creditUsage);

      return creditUsage;
    });
  }

  async findOne(params) {
    const query = this.creditUsageRepository.createQueryBuilder('creditUsage')
      .leftJoinAndSelect('creditUsage.user', 'user') 
      .select([
        'creditUsage.id',
        'creditUsage.action',
        'creditUsage.credit_before',
        'creditUsage.credit_now',
        'creditUsage.credit_used',
        'creditUsage.created_at',
        'creditUsage.updated_at',
        'user.id', 
        'user.username', 
      ]);
  
    if (params.id) {
      query.andWhere('creditUsage.id = :id', { id: params.id });
    }
  
    if (params.user_id) {
      query.andWhere('user.id = :user_id', { user_id: params.user_id });
    }
  
    return await query.getMany(); 
  }
}
