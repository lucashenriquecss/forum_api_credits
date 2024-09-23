import { Injectable } from '@nestjs/common';
import { CreateCreditSettingDto } from './dto/create-credit-setting.dto';
import { UpdateCreditSettingDto } from './dto/update-credit-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditSettingEntity } from './entities/credit-setting.entity';
import { In } from "typeorm"

@Injectable()
export class CreditSettingService {
  constructor(
    @InjectRepository(CreditSettingEntity)
    private readonly creditSettingRepository: Repository<CreditSettingEntity>,

  ) { }

  async create(createCreditSettingDto: CreateCreditSettingDto) {

    const newSetting: CreateCreditSettingDto = {
      action_type: createCreditSettingDto.action_type,
      credits_required: createCreditSettingDto.credits_required,
    };

    let createSetting = this.creditSettingRepository.create(newSetting);
    return await this.creditSettingRepository.save(createSetting);


  }

  async getCredits(actions: string[]): Promise<number> {
    const result = await this.creditSettingRepository
    .createQueryBuilder('credit_settings')
    .select('SUM(credit_settings.credits_required)', 'total')
    .where('credit_settings.action_type IN (:...actionType)', { actionType: actions })
    .getRawOne();

    return parseFloat(result.total) || 0;
  }

  async findOne(id: number, params) {
    const where = {};

    if (id) where['id'] = id
    if (params.action_type) where['action_type'] = params.action_type

    return await this.creditSettingRepository.findOne({ where });
  }

  async update(id: number, updateCreditSettingDto: UpdateCreditSettingDto) {
    return await this.creditSettingRepository.update(id, updateCreditSettingDto);
  }


}
